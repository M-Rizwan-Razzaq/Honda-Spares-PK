import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Honda Spare Parts Pakistan",
  description: "Learn how Honda Spares PK handles the contact, motorcycle and order details customers share when asking about spare parts or arranging delivery in Pakistan.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Your information" title="Privacy policy" description="How we use information you choose to share while asking about parts, placing an order or contacting our team." crumbs={[{ href: "/", label: "Home" }, { href: "/privacy", label: "Privacy policy" }]} />
      <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm leading-7 text-charcoal-soft sm:px-6 sm:py-16 sm:text-base">
        <section><h2 className="text-xl font-extrabold text-ink">Information you share</h2><p className="mt-3">When you contact us, request a part or arrange an order, you may share your name, phone number, WhatsApp messages, motorcycle model, requested parts, delivery details and information about your order. Please share only details needed to handle your enquiry or order.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">How we use it</h2><p className="mt-3">We use the information you provide to answer questions, check part availability and fitment, confirm prices and delivery, process and fulfil orders, provide after-sales support, and keep appropriate order records. We do not sell your personal contact details.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Service providers and external services</h2><p className="mt-3">We may rely on services needed to communicate with you or deliver an order, such as WhatsApp, email and courier providers. Those services handle information under their own policies. We do not control their privacy practices; please review their terms where relevant.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Storage, security and your choices</h2><p className="mt-3">We keep enquiry and order information only as needed for customer support, business records and applicable obligations, and take reasonable steps to limit access. No online communication or storage method can be guaranteed completely secure. You may contact us to ask about information you have shared or request correction of inaccurate details, subject to records we need to retain.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Contact</h2><p className="mt-3">For privacy questions, contact {siteConfig.name} at <a className="font-bold text-honda hover:underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or on WhatsApp at {siteConfig.phoneDisplay}.</p></section>
      </article>
    </>
  );
}
