import { CheckCircle2, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const points = [
  "Browse parts by motorcycle model, category or part number.",
  "Every order is reviewed for stock and fitment before payment.",
  "Order requests are handled on WhatsApp for quick follow-up.",
  "Catalog values are sample data until the live inventory is loaded.",
];

export function About() {
  return (
    <section id="about" className="bg-surface py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold tracking-[0.18em] text-honda uppercase">
            About the business
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Helping Honda motorcycle owners find the right parts
          </h2>
          <p className="text-sm leading-relaxed text-charcoal-soft sm:text-base">
            {siteConfig.name} is a spare-parts storefront for Honda motorcycle owners in Pakistan.
            The goal is simple: make it easier to find maintenance essentials and replacement
            components for everyday bikes like the CD 70, CG 125, Pridor and CB series — with
            clear information about what each part is and which models it is listed for.
          </p>
          <p className="text-sm leading-relaxed text-charcoal-soft sm:text-base">
            We are an independent seller. We are not a Honda dealership and this website is not
            affiliated with or endorsed by Honda. Product classifications (genuine, OEM or
            aftermarket) are shown per listing based on how the item is supplied.
          </p>
          <p className="flex items-start gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs leading-relaxed text-charcoal-soft">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-honda" aria-hidden />
            {siteConfig.address}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card sm:p-8">
          <h3 className="text-lg font-extrabold text-ink">What to expect</h3>
          <ul className="mt-4 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-honda" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-surface px-4 py-3 text-xs leading-relaxed text-charcoal-soft">
            Business details such as store name, contact numbers and address are configurable and
            will be updated once confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
