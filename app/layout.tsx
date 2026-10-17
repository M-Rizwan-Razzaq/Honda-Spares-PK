import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/Providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppCheckout } from "@/components/checkout/WhatsAppCheckout";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

const barlow = localFont({
  src: [
    { path: "../public/fonts/Barlow-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Barlow-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Barlow-SemiBold.ttf", weight: "600" },
    { path: "../public/fonts/Barlow-Bold.ttf", weight: "700" },
    { path: "../public/fonts/Barlow-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Genuine Honda Motorcycle Spare Parts in Pakistan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Honda spare parts Pakistan",
    "Honda CD 70 parts",
    "Honda CG 125 parts",
    "Honda CB 125F spare parts",
    "motorcycle spare parts Pakistan",
    "Pridor parts",
    "genuine Honda parts",
    "aftermarket motorcycle parts",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Genuine Honda Motorcycle Spare Parts in Pakistan`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Honda Motorcycle Spare Parts`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#cc0000",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.contactEmail,
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={barlow.variable}>
      <body className="flex min-h-full flex-col bg-white font-sans text-ink antialiased">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartDrawer />
          <WhatsAppCheckout />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
