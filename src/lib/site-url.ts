export function getSiteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value = configured?.trim() || "http://localhost:3000";
  return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
}
