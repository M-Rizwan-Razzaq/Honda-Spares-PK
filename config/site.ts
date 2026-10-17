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
  url: "https://hondasparespk.com",

  currency: {
    code: "PKR",
    symbol: "Rs.",
    label: "PKR (Rs.)",
  },

  // PLACEHOLDER — replace with the real business WhatsApp number.
  // Include country code, digits only after normalisation, e.g. "+92 300 1234567".
  whatsappNumber: "+92 318 6592403",
  whatsappGreeting:
    "Assalam-o-Alaikum! I need help finding spare parts for my Honda motorcycle.",

  contactEmail: "info.hondasparespk@gmail.com",
  phoneDisplay: "+92 318 6592403",

  // PLACEHOLDER — no real shop address has been provided yet.
  address: "Shop address to be confirmed — Pakistan",

  shipping: {
    summary:
      "Delivery is arranged across Pakistan after order confirmation. Delivery options, charges and timelines are confirmed by our team on WhatsApp before payment.",
  },

  policies: {
    returns: "Contact us promptly about an incorrect, damaged or unsuitable item so we can review the order and confirm next steps.",
    privacy: "We use the contact, motorcycle and order details you share to answer enquiries, arrange delivery and provide support.",
    terms: "Catalogue details are subject to confirmation; item, price and delivery are agreed directly before an order is confirmed.",
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
