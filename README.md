# Honda Spare Parts PK — Next.js storefront

A multi-page e-commerce storefront for selling genuine, OEM and aftermarket spare parts for popular Honda motorcycles in Pakistan. Browse by model or category, search the catalogue, filter and sort products, view details, manage a persistent cart, and send order requests on WhatsApp.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, featured parts, model and category previews, why-choose-us, FAQ |
| `/shop` | Full catalogue with search, filters and sort (supports `?q=`, `?category=`, `?model=`) |
| `/models` | All Honda motorcycle models |
| `/models/[id]` | Parts listed for a single model |
| `/categories` | All spare-part categories |
| `/categories/[id]` | Parts in a single category |
| `/about` | About the business |
| `/contact` | Contact details and FAQ |

Unknown `[id]` values under `/models` and `/categories` are rejected in `proxy.ts` (Next 16's renamed middleware) so they return a hard `404` instead of a soft-200 shell.

## Tech stack

- Next.js 16 (App Router, Turbopack, Cache Components)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (via `@tailwindcss/turbopack`)
- lucide-react icons

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint.config.mjs`, flat config) |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |

## Configuration (read this before launch)

All business details live in **`config/site.ts`**. Everything below is a **placeholder** and must be replaced with real values:

- `whatsappNumber` — the single source of truth for the WhatsApp order flow (digits are normalised automatically; `+92 300 0000000` ships as a placeholder).
- `contactEmail`, `phoneDisplay`, `address` — contact placeholders.
- `url` — used for `metadataBase`, `robots.txt` and `sitemap.xml` (currently `https://example.com`).
- `social` — links render in the footer only when non-empty.
- `policies`, `shipping`, `demoNotice`, `legalDisclaimer` — footer/notice copy.

> Do not ship with the placeholder WhatsApp number — it will open a chat to a non-existent contact.

## Sample data

The catalogue is seeded with sample products in `data/products.ts` (marketed as demo data across the UI):

- Prices, stock status, classifications and fitment are **sample values**.
- Part numbers use an `SP-` prefix and are **not** official Honda part numbers.
- Products are classified as `genuine-honda`, `oem` or `aftermarket`; the UI never claims unverified items are genuine.
- Product and model illustrations are clearly generic line-art placeholders in `public/images/` — replace with real product photography when available.

## Project structure

```
app/                     # layout, routed pages, metadata, icon, robots, sitemap, OG image
components/
  layout/                # AnnouncementBar, Header, MobileMenu, Footer
  home/                  # Hero, FeaturedProducts, WhyChooseUs, About, Faq, ContactSection
  models/                # ModelCardGrid
  categories/            # CategoryCardGrid
  shop/                  # ShopExplorer (reads query params)
  products/              # ProductExplorer, ProductCard, ProductFilters, ProductDetails
  cart/                  # CartDrawer
  checkout/              # WhatsAppCheckout
  common/                # PageHeader, Modal, Accordion, Badges, QuantityStepper, WhatsAppButton, SectionHeading
config/site.ts           # Central business configuration
context/                 # CartContext (useSyncExternalStore)
data/                    # products, models, categories, nav
lib/                     # formatCurrency, whatsapp, cart-store
types/                   # product, cart
proxy.ts                 # Route guard for unknown model/category ids (Next 16 middleware)
public/images/           # SVG placeholder artwork
```

## Notes

- The cart persists in `localStorage` (`honda-spares-cart-v1`) and is exposed through an external store read with `useSyncExternalStore`, so it hydrates without mismatches.
- WhatsApp messages are URL-encoded via `lib/whatsapp.ts`; the order message includes line items, quantities, unit prices, subtotal, customer details and an order-request disclaimer.
- No shipping charges or tax are displayed; only a clearly labelled subtotal.
- Accessibility: dialogs and drawers use `role="dialog"`, `aria-modal`, Escape-to-close, focus trapping and body scroll lock; filters and forms use labelled controls.
