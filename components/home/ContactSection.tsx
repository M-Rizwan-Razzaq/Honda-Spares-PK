import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink py-14 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold tracking-[0.18em] text-honda uppercase">Contact</p>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Need a part or have a question?
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              Message us on WhatsApp with your motorcycle model and the part you need. We will
              confirm availability, fitment and delivery details with you.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phoneDisplay.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white/60"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Contact details are placeholders until confirmed by the business.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-honda" aria-hidden />
              <div>
                <h3 className="text-sm font-bold">Store location</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-300">{siteConfig.address}</p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-honda" aria-hidden />
              <div>
                <h3 className="text-sm font-bold">WhatsApp</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-300">
                  {siteConfig.whatsappNumber} (placeholder)
                </p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-honda" aria-hidden />
              <div>
                <h3 className="text-sm font-bold">Email</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-300">
                  {siteConfig.contactEmail}
                </p>
              </div>
            </li>
            <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-honda" aria-hidden />
              <div>
                <h3 className="text-sm font-bold">Phone</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-300">
                  {siteConfig.phoneDisplay}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
