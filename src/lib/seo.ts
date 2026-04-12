import { useEffect } from "react";

export type CanonicalSurface = "marketing" | "app";

const SEO_BASES: Record<CanonicalSurface, string> = {
  marketing: "https://sacredpathforcouples.com",
  app: "https://app.sacredpathforcouples.com",
};

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  surface?: CanonicalSurface;
  noIndex?: boolean;
  disabled?: boolean;
};

const ensureMeta = (key: "name" | "property", value: string) => {
  let node = document.head.querySelector(`meta[${key}="${value}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(key, value);
    document.head.appendChild(node);
  }
  return node;
};

const ensureCanonical = () => {
  let node = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!node) {
    node = document.createElement("link");
    node.rel = "canonical";
    document.head.appendChild(node);
  }
  return node;
};

export const buildCanonicalUrl = (path: string, surface: CanonicalSurface = "marketing") =>
  new URL(path, SEO_BASES[surface]).toString();

export const useSeoMetadata = ({
  title,
  description,
  path,
  surface = "marketing",
  noIndex = false,
  disabled = false,
}: SeoOptions) => {
  useEffect(() => {
    if (disabled) return;

    const canonicalUrl = buildCanonicalUrl(path, surface);
    const fullTitle = `${title} | Sacred Path for Couples`;

    document.title = fullTitle;

    ensureMeta("name", "description").content = description;
    ensureMeta("name", "robots").content = noIndex ? "noindex,nofollow" : "index,follow";

    ensureMeta("property", "og:type").content = "website";
    ensureMeta("property", "og:title").content = fullTitle;
    ensureMeta("property", "og:description").content = description;
    ensureMeta("property", "og:url").content = canonicalUrl;

    ensureMeta("name", "twitter:card").content = "summary_large_image";
    ensureMeta("name", "twitter:title").content = fullTitle;
    ensureMeta("name", "twitter:description").content = description;

    ensureCanonical().href = canonicalUrl;
  }, [description, noIndex, path, surface, title]);
};
