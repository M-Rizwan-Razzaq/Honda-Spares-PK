import { Accordion, type AccordionItem } from "@/components/common/Accordion";
import { SectionHeading } from "@/components/common/SectionHeading";

const faqs: AccordionItem[] = [
  {
    id: "find-parts",
    question: "How can I find parts for my motorcycle?",
    answer:
      "Use the search box in the catalogue to look up a part by name, motorcycle model or part number. You can also select your model card or a category card to filter the list, then narrow results further with the price filter.",
  },
  {
    id: "verify-compatibility",
    question: "How do I verify compatibility?",
    answer:
      "Each listing shows the models it is listed for. Compatibility shown here is sample catalogue data, so please confirm your exact model, year and variant on WhatsApp before ordering. Send a photo of the part or your bike if you are unsure — we will help match it.",
  },
  {
    id: "genuine-parts",
    question: "Are all products genuine Honda parts?",
    answer:
      "No. Listings are classified as Genuine Honda, OEM or Aftermarket, and the classification is shown on every product. We do not claim that unverified items are genuine, and part numbers shown in the demo catalogue are sample codes, not official Honda part numbers.",
  },
  {
    id: "how-to-order",
    question: "How can I place an order?",
    answer:
      "Add the parts you need to the cart, open the cart and choose “Order on WhatsApp”. Complete the short form with your name, phone number, city and address. The message with your order summary opens in WhatsApp — this is an order request that our team confirms before payment.",
  },
  {
    id: "delivery",
    question: "What delivery options are available?",
    answer:
      "Delivery is arranged across Pakistan through our delivery partners. Charges and timelines depend on your city and the size of the order, and are always confirmed by our team on WhatsApp before you pay. No free-shipping promise is made here.",
  },
  {
    id: "request-part",
    question: "Can I request a specific spare part?",
    answer:
      "Yes. If a part is not in the catalogue, send us the part name, your motorcycle model and a photo on WhatsApp. We will check availability and share options with you.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Quick answers about finding parts, compatibility, ordering and delivery."
        />
        <div className="mt-10">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
