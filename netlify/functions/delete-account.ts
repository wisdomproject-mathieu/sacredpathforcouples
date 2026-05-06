import { createClient } from "@supabase/supabase-js";

import { buildCorsHeaders } from "./_shared/cors";

type FunctionResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const json = (statusCode: number, body: unknown, requestOrigin?: string): FunctionResponse => ({
  statusCode,
  headers: {
    ...buildCorsHeaders(requestOrigin),
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const extractBearerToken = (authorizationHeader?: string) => {
  if (!authorizationHeader) return null;
  const [type, token] = authorizationHeader.split(" ");
  if (!type || !token) return null;
  if (type.toLowerCase() !== "bearer") return null;
  return token.trim();
};

export const config = {
  path: "/api/delete-account",
};

export const handler = async (event: {
  httpMethod?: string;
  headers?: Record<string, string | undefined>;
}): Promise<FunctionResponse> => {
  const requestOrigin = event.headers?.origin || event.headers?.Origin;

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: buildCorsHeaders(requestOrigin),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, requestOrigin);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return json(500, { error: "Missing server env vars for account deletion." }, requestOrigin);
  }

  const token = extractBearerToken(event.headers?.authorization || event.headers?.Authorization);
  if (!token) {
    return json(401, { error: "Missing bearer token." }, requestOrigin);
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const authResult = await supabaseAdmin.auth.getUser(token);
  const authenticatedUser = authResult.data.user;
  if (!authenticatedUser) {
    return json(401, { error: "Invalid session token." }, requestOrigin);
  }

  const deletionResult = await supabaseAdmin.auth.admin.deleteUser(authenticatedUser.id);
  if (deletionResult.error) {
    return json(500, { error: deletionResult.error.message }, requestOrigin);
  }

  return json(200, { ok: true }, requestOrigin);
};
