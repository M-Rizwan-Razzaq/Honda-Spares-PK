"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MessageCircle, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { navLinks, isActivePath } from "@/data/nav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [term, setTerm] = useState("");

  const submitSearch = (value: string) => {
    const query = value.trim();
    router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} — home`}
          >
            <Image src="/icon.svg" alt="" width={36} height={36} className="rounded-lg" />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight text-ink sm:text-lg">
                {siteConfig.name}
              </span>
              <span className="hidden text-[11px] font-medium text-charcoal-soft xl:block">
                Spare parts for Honda motorcycles
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-honda-soft text-honda"
                          : "text-charcoal hover:bg-surface hover:text-honda"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <form
              role="search"
              className="relative hidden md:block"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch(term);
              }}
            >
              <label htmlFor="header-search" className="sr-only">
                Search spare parts
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
                aria-hidden
              />
              <input
                id="header-search"
                type="search"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Search parts, models…"
                className="w-44 rounded-xl border border-gray-200 bg-surface py-2 pr-3 pl-9 text-sm text-ink transition-all placeholder:text-charcoal-soft/80 focus:w-60 focus:border-honda focus:bg-white focus:outline-none xl:w-56 xl:focus:w-72"
              />
            </form>

            <a
              href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-whatsapp px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark sm:flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={openCart}
              className="relative rounded-xl border border-gray-200 p-2.5 text-ink transition-colors hover:border-honda hover:text-honda"
              aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-honda px-1 text-[11px] font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="rounded-xl border border-gray-200 p-2.5 text-ink transition-colors hover:border-honda hover:text-honda lg:hidden"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
