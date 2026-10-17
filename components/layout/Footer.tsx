import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/nav";
import { categories } from "@/data/categories";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const socialEntries = [
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
] as const;

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();
  const socialLinks = socialEntries.filter((entry) => siteConfig.social[entry.key]);
  const topCategories = categories.slice(0, 8);

  return (
    <footer className="border-t border-white/10 bg-ink text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/images/logo-mark.jpg" alt={`${siteConfig.name} logo`} width={56} height={56} className="shrink-0 rounded-full bg-white object-contain" />
              <span className="text-lg font-extrabold text-white">{siteConfig.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">{siteConfig.description}</p>
            <a
              href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp us
            </a>
            {socialLinks.length > 0 && (
              <ul className="flex gap-4">
                {socialLinks.map((entry) => (
                  <li key={entry.key}>
                    <a
                      href={siteConfig.social[entry.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-gray-400 transition-colors hover:text-white"
                    >
                      {entry.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-sm font-extrabold tracking-wide text-white uppercase">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Product categories">
            <h2 className="text-sm font-extrabold tracking-wide text-white uppercase">
              Categories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="text-sm font-bold text-honda hover:text-white">
                  View all categories
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-extrabold tracking-wide text-white uppercase">
              Contact & policies
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              <li>WhatsApp: {siteConfig.whatsappNumber}</li>
              <li>Email: {siteConfig.contactEmail}</li>
              <li>Location: {siteConfig.address}</li>
            </ul>
            <nav aria-label="Store policies" className="mt-5">
              <h3 className="text-xs font-bold tracking-wide text-gray-200 uppercase">Store policies</h3>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/returns-exchanges", label: "Returns & exchanges" },
                  { href: "/privacy", label: "Privacy policy" },
                  { href: "/terms", label: "Terms of service" },
                ].map((policy) => (
                  <li key={policy.href}>
                    <Link href={policy.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                      {policy.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-gray-500">{siteConfig.legalDisclaimer}</p>
          <p className="text-xs text-gray-500">
            © {year} {siteConfig.name}. All rights reserved. Prices in {siteConfig.currency.label}.
          </p>
        </div>
      </div>
    </footer>
  );
}
