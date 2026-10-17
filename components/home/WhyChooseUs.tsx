import { HandHelping, MessageCircle, Ruler, Truck } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

const reasons = [
  {
    icon: Ruler,
    title: "Help identifying the correct part",
    description:
      "Not sure which part fits? Send your bike model, year and a photo — we help you narrow down the correct item before you order.",
  },
  {
    icon: HandHelping,
    title: "Clear product descriptions",
    description:
      "Every listing states its category, classification and listed compatibility, so you know what you are ordering.",
  },
  {
    icon: MessageCircle,
    title: "Convenient WhatsApp assistance",
    description:
      "When available, orders and questions are handled directly on WhatsApp — no complicated account setup.",
  },
  {
    icon: Truck,
    title: "Delivery options confirmed at checkout",
    description:
      "Delivery coverage, charges and timelines are confirmed by our team on WhatsApp before payment.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we help"
          title="Buying spare parts, made simpler"
          description="These are the services we aim to provide for every order. Where a service depends on stock or delivery partners, our team confirms the details with you first."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-honda-soft text-honda">
                <reason.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-base font-extrabold text-ink">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-charcoal-soft">{reason.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
