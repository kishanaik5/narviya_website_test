/**
 * Narviya — single source of truth for brand & contact info.
 */

export const siteConfig = {
  // ---- Brand ----
  brandName: "Narviya",
  brandShort: "NARVIYA",
  tagline: "Where Vision Meets Space, Built Beautifully",
  logoText: "NARVIYA",
  domain: "narviadesign.com",
  siteUrl: "https://narviadesign.com",

  // ---- Contact ----
  email: "hello@narviadesign.com",
  phone: "+91 93538 75064",
  phone2: "+91 63637 07061",
  ownerName: "Harshith Naik",
  gst: "29BFHPH7078L1ZR",
  whatsapp: "+91 93538 75064",
  address: "",
  city: "",
  hours: {
    weekdays: "All Working Days: 8:00 AM – 8:00 PM",
    sunday: "Available Daily: 8:00 AM – 8:00 PM",
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
  metaTitle: "NARVIYA | Where Vision Meets Space, Built Beautifully",
  metaDescription:
    "Narviya creates bespoke residential living, executive workspaces, and architectural outdoor living. Where vision meets space, built beautifully.",
} as const;

export type SiteConfig = typeof siteConfig;
