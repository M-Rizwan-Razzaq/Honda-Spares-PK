import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, MessageCircle, Ruler } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const trustItems = [
  {
    icon: Ruler,
    title: "Fitment help",
    description: "Share your bike model — we help match the correct part.",
  },
  {
    icon: FileText,
    title: "Clear part details",
    description: "Descriptions, classifications and compatibility on every listing.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp support",
    description: "Questions and order requests handled chat-first.",
  },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-honda/20 bg-honda-soft px-3.5 py-1.5 text-xs font-bold tracking-wide text-honda uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-honda" aria-hidden />
            For Honda bike owners in Pakistan
          </p>

          <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Genuine Honda
            <br />
            Motorcycle Spare Parts
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Find the right parts for your Honda bike, from everyday maintenance essentials to
            engine and body components.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-honda px-6 py-3.5 text-sm font-bold text-white shadow-card transition-colors hover:bg-honda-dark"
            >
              Explore Spare Parts
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink hover:bg-surface"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp-dark" aria-hidden />
              Order on WhatsApp
            </a>
          </div>

          <dl className="mt-4 grid w-full gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.title} className="flex gap-3">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-honda" aria-hidden />
                <div>
                  <dt className="text-sm font-bold text-ink">{item.title}</dt>
                  <dd className="mt-0.5 text-xs leading-relaxed text-charcoal-soft">
                    {item.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-surface shadow-card">
            <Image
              src="/images/herosection.jpg"
              alt="Motorcycle engine piston, spark plugs, chain, sprockets and replacement parts"
              width={1152}
              height={864}
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
            <div className="absolute right-4 bottom-4 rounded-xl bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:right-6 sm:bottom-6">
              <p className="text-xs font-bold tracking-wide text-honda uppercase">
                {siteConfig.currency.label}
              </p>
              <p className="text-sm font-semibold text-ink">Catalogue priced in PKR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
