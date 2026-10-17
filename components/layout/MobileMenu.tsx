"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, Search, X } from "lucide-react";
import { navLinks, isActivePath } from "@/data/nav";
import { siteConfig, whatsappDigits } from "@/config/site";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [term, setTerm] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => panelRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/55 animate-fade-in" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
        className="absolute top-0 right-0 flex h-full w-[min(22rem,88vw)] flex-col bg-white shadow-drawer animate-slide-in-right"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <span className="text-base font-extrabold text-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-charcoal-soft hover:bg-surface hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form
          role="search"
          className="border-b border-gray-200 px-5 py-4"
          onSubmit={(event) => {
            event.preventDefault();
            const query = term.trim();
            router.push(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
            onClose();
          }}
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search spare parts
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
              aria-hidden
            />
            <input
              id="mobile-search"
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search parts, models, part no."
              className="w-full rounded-xl border border-gray-200 bg-surface py-2.5 pr-3 pl-9 text-sm focus:border-honda focus:bg-white focus:outline-none"
            />
          </div>
        </form>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      active
                        ? "bg-honda-soft text-honda"
                        : "text-ink hover:bg-surface hover:text-honda"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-5">
          <a
            href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Chat on WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-charcoal-soft">
            WhatsApp: {whatsappDigits} · {siteConfig.name}
          </p>
        </div>
      </div>
    </div>
  );
}
