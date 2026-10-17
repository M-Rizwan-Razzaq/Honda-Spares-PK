/**
 * Central store configuration.
 *
 * Every business detail below is a PLACEHOLDER until the real values are
 * supplied. Replace them before launching — especially `whatsappNumber`,
 * `contactEmail`, and `address`.
 */
export const siteConfig = {
  name: "Honda Spares PK",
  tagline: "Motorcycle spare parts for Honda bike owners in Pakistan",
  description:
    "Browse genuine, OEM and aftermarket spare parts for popular Honda motorcycles in Pakistan — including CD 70, CD 70 Dream, Pridor, CG 125, CB 125F and CB 150F. Search by part name or model and send order requests on WhatsApp.",
  url: "https://example.com",

  currency: {
    code: "PKR",
    symbol: "Rs.",
    label: "PKR (Rs.)",
  },

  // PLACEHOLDER — replace with the real business WhatsApp number.
  // Include country code, digits only after normalisation, e.g. "+92 300 1234567".
  whatsappNumber: "+92 300 0000000",
  whatsappGreeting:
    "Assalam-o-Alaikum! I need help finding spare parts for my Honda motorcycle.",

  contactEmail: "orders@example.com",
  phoneDisplay: "+92 300 0000000",

  // PLACEHOLDER — no real shop address has been provided yet.
  address: "Shop address to be confirmed — Pakistan",

  shipping: {
    summary:
      "Delivery is arranged across Pakistan after order confirmation. Delivery options, charges and timelines are confirmed by our team on WhatsApp before payment.",
  },

  policies: {
    returns: "Return and exchange policy will be published here before launch.",
    privacy: "Privacy policy will be published here before launch.",
    terms: "Terms of service will be published here before launch.",
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  demoNotice:
    "Demo catalog — prices, stock, part numbers and fitment details shown here are sample data for development. Final inventory will be loaded before launch.",

  legalDisclaimer:
    "We are an independent spare-parts seller. Honda, CD, CG, CB and related model names are trademarks of their respective owners. This website is not affiliated with, endorsed by, or an official Honda dealership.",
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappDigits = siteConfig.whatsappNumber.replace(/\D/g, "");
