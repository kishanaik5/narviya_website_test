/**
 * Narvia Design — single source of truth for brand & contact info.
 *
 * Every component that shows the brand name, tagline, contact details,
 * logo, or site URL should import from here instead of hardcoding
 * strings. Update this file and it reflects everywhere.
 *
 * TODO before launch: replace every placeholder value below with the
 * real, client-confirmed detail. Nothing here is fabricated — where a
 * real value wasn't available, it's marked "Add ..." on purpose.
 */

export const siteConfig = {
  // ---- Brand ----
  brandName: "Narvia",
  brandShort: "NARVIA",
  tagline: "Interior & Exterior Design, in Wood and Glass",
  logoText: "NARVIA", // used by the temp text-based logo until a real logo exists
  domain: "narviadesign.com",
  siteUrl: "https://narviadesign.com",

  // ---- Contact ----
  email: "hello@narviadesign.com",
  phone: "Add phone number",
  whatsapp: "Add WhatsApp number",
  address: "Add studio address",
  city: "Bengaluru, Karnataka",
  hours: {
    weekdays: "Mon – Sat: 10:00 AM – 7:00 PM",
    sunday: "Sunday: By appointment only",
  },

  // ---- Social ----
  social: {
    instagram: "Add Instagram handle/link",
    facebook: "Add Facebook page link",
    pinterest: "Add Pinterest link",
    linkedin: "Add LinkedIn page link",
  },

  // ---- Assets ----
  // Swap this for the real logo file path once one exists, e.g. "/images/logo.svg"
  logoImage: null as string | null,

  // ---- Meta / SEO ----
  metaTitle: "Narvia Design | Interior & Exterior Spaces in Wood & Glass",
  metaDescription:
    "Narvia Design is an end-to-end interior and exterior design studio, building spaces in wood and glass on an affordable budget and timeline.",
} as const;

export type SiteConfig = typeof siteConfig;
