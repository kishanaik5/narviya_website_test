/**
 * Narvia — single source of truth for brand & contact info.
 */

export const siteConfig = {
  // ---- Brand ----
  brandName: "Narvia",
  brandShort: "NARVIA",
  tagline: "Where Vision Meets Space, Built Beautifully",
  logoText: "NARVIA",
  domain: "narviadesign.com",
  siteUrl: "https://narviadesign.com",

  // ---- Contact ----
  email: "hello@narviadesign.com",
  phone: "+91 93538 75064",
  whatsapp: "+91 93538 75064",
  address: "",
  city: "Bengaluru, Karnataka",
  hours: {
    weekdays: "Mon – Sat: 9:30 AM – 7:30 PM",
    sunday: "Sunday: By Appointment",
  },

  // ---- Social ----
  social: {
    instagram: "https://instagram.com/narviadesigns",
    facebook: "https://facebook.com/narviadesigns",
    pinterest: "https://pinterest.com/narviadesigns",
    linkedin: "https://linkedin.com/company/narviadesigns",
  },

  // ---- Assets ----
  logoImage: null as string | null,

  // ---- Meta / SEO ----
  metaTitle: "NARVIA | Where Vision Meets Space, Built Beautifully",
  metaDescription:
    "Narvia creates bespoke residential living, executive workspaces, and architectural outdoor living. Where vision meets space, built beautifully.",
} as const;

export type SiteConfig = typeof siteConfig;
