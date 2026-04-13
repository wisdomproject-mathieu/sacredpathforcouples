export type BillingPlan = "monthly" | "yearly" | "founding";

const billingApiFallbackOriginByHostname: Record<string, string> = {
  "sacredpathforcouples.com": "https://main--sacrespathforcouples.netlify.app",
  "www.sacredpathforcouples.com": "https://main--sacrespathforcouples.netlify.app",
};

const normalizeOrigin = (value?: string | null) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
};

const getPlanLinkEnvMap = (): Record<BillingPlan, string | undefined> => ({
  monthly: import.meta.env.VITE_STRIPE_PAYMENT_LINK_MONTHLY,
  yearly: import.meta.env.VITE_STRIPE_PAYMENT_LINK_YEARLY,
  founding: import.meta.env.VITE_STRIPE_PAYMENT_LINK_FOUNDING,
});

const getApiOrigins = () => {
  const origins: Array<string | null> = [null];
  const configuredOrigin = normalizeOrigin(import.meta.env.VITE_BILLING_API_ORIGIN);
  if (configuredOrigin) {
    origins.push(configuredOrigin);
  }

  if (typeof window !== "undefined") {
    const hostFallback = billingApiFallbackOriginByHostname[window.location.hostname];
    if (hostFallback) {
      origins.push(hostFallback);
    }
  }

  const seen = new Set<string>();
  return origins.filter((origin) => {
    const key = origin ?? "__same_origin__";
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const buildApiUrl = (origin: string | null, path: string) => (origin ? `${origin}${path}` : path);

const readResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  const text = await response.text();
  const trimmed = text.trim();
  if (contentType.includes("application/json")) {
    try {
      return { contentType, text, json: JSON.parse(trimmed || "{}") as Record<string, unknown> };
    } catch {
      return { contentType, text, json: null };
    }
  }

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return { contentType, text, json: JSON.parse(trimmed) as Record<string, unknown> };
    } catch {
      return { contentType, text, json: null };
    }
  }

  return { contentType, text, json: null };
};

const isLikelyHtmlResponse = (contentType: string, text: string) =>
  contentType.includes("text/html") || text.trimStart().startsWith("<!DOCTYPE html") || text.trimStart().startsWith("<html");

const shouldRetryWithFallback = (response: Response, contentType: string, text: string) => {
  if (isLikelyHtmlResponse(contentType, text)) return true;
  if (response.status === 404 || response.status === 405) return true;
  if (response.status >= 500) return true;
  if (response.ok && !contentType.includes("application/json")) return true;
  return false;
};

const extractErrorMessage = (
  payload: { text: string; json: Record<string, unknown> | null },
  defaultMessage: string,
) => {
  const jsonError = payload.json?.error;
  if (typeof jsonError === "string" && jsonError.trim().length) return jsonError.trim();
  const jsonMessage = payload.json?.message;
  if (typeof jsonMessage === "string" && jsonMessage.trim().length) return jsonMessage.trim();
  if (payload.text.trim().length) return payload.text.trim();
  return defaultMessage;
};

const postBillingApi = async (
  path: string,
  body: Record<string, unknown>,
  accessToken: string,
  defaultErrorMessage: string,
) => {
  let latestError: Error | null = null;
  const origins = getApiOrigins();

  for (let index = 0; index < origins.length; index += 1) {
    const origin = origins[index];
    const isLastOrigin = index === origins.length - 1;
    const endpoint = buildApiUrl(origin, path);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const payload = await readResponseBody(response);
      if (response.ok && payload.json) {
        return payload.json;
      }

      const message = extractErrorMessage(payload, defaultErrorMessage);
      latestError = new Error(message);

      if (!isLastOrigin && shouldRetryWithFallback(response, payload.contentType, payload.text)) {
        continue;
      }

      throw latestError;
    } catch (error) {
      latestError = error instanceof Error ? error : new Error(defaultErrorMessage);
      if (!isLastOrigin) {
        continue;
      }
      throw latestError;
    }
  }

  throw latestError ?? new Error(defaultErrorMessage);
};

export const getDirectPaymentLink = (plan: BillingPlan) => {
  const planLinkEnvMap = getPlanLinkEnvMap();
  const value = planLinkEnvMap[plan];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

type CreateCheckoutSessionInput = {
  plan: BillingPlan;
  userId: string;
  accessToken: string;
  email?: string;
};

type CreateCustomerPortalSessionInput = {
  userId: string;
  accessToken: string;
  email?: string;
};

export const createCheckoutSession = async ({ plan, userId, accessToken, email }: CreateCheckoutSessionInput) => {
  const direct = getDirectPaymentLink(plan);
  if (direct) return direct;

  const payload = await postBillingApi(
    "/api/create-checkout-session",
    {
      plan,
      userId,
      email,
    },
    accessToken,
    "Failed to create checkout session.",
  );
  const checkoutUrl = payload.url;
  if (typeof checkoutUrl !== "string" || !checkoutUrl.trim().length) {
    throw new Error("Checkout URL missing in response.");
  }

  return checkoutUrl;
};

export const createCustomerPortalSession = async ({ userId, accessToken, email }: CreateCustomerPortalSessionInput) => {
  const payload = await postBillingApi(
    "/api/create-customer-portal-session",
    {
      userId,
      email,
    },
    accessToken,
    "Failed to create billing portal session.",
  );
  const portalUrl = payload.url;
  if (typeof portalUrl !== "string" || !portalUrl.trim().length) {
    throw new Error("Customer portal URL missing in response.");
  }

  return portalUrl;
};
