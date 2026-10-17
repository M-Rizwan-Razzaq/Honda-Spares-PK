import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | Honda Spare Parts Pakistan",
  description: "Read the terms for browsing Honda Spares PK, requesting motorcycle parts, confirming prices and delivery, and using product fitment information in Pakistan.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Website information" title="Terms of service" description="These terms explain how to use this catalogue and how enquiries and orders are confirmed." crumbs={[{ href: "/", label: "Home" }, { href: "/terms", label: "Terms of service" }]} />
      <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm leading-7 text-charcoal-soft sm:px-6 sm:py-16 sm:text-base">
        <section><h2 className="text-xl font-extrabold text-ink">Product and catalogue information</h2><p className="mt-3">We aim to keep product names, descriptions, images, prices, stock and compatibility information useful and current. Details can change and catalogue information may contain errors. Unless our team confirms an item and price with you, an online listing is an invitation to enquire, not a confirmed order or stock reservation. Some catalogue content may be demonstration data; check current availability and price with us before ordering.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Fitment and ordering</h2><p className="mt-3">Motorcycle parts may vary by model, year or variant. You are responsible for sharing accurate bike details and checking the part before installation. Our team can help review fitment information but cannot guarantee compatibility where the information supplied is incomplete. An order is confirmed only after we agree the item, price, delivery charges and other relevant details with you directly.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Payment, delivery and returns</h2><p className="mt-3">Available payment methods, delivery options, charges and estimated timelines are confirmed before order completion. Delivery estimates can change due to courier or other circumstances outside our control. Requests about incorrect, damaged or unsuitable items are handled under our <Link href="/returns-exchanges" className="font-bold text-honda hover:underline">returns and exchanges process</Link>.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Website use and intellectual property</h2><p className="mt-3">Use this website lawfully and do not interfere with its operation or misuse its content. Website text, layout and original graphics belong to their respective owners. Honda and motorcycle model names and marks belong to their respective trademark owners. {siteConfig.name} is an independent spare-parts seller and is not affiliated with or endorsed by Honda.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Changes and questions</h2><p className="mt-3">We may update catalogue details or these terms as our services change. The current version will be published on this page. For questions about an order or these terms, contact us at <a className="font-bold text-honda hover:underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or via WhatsApp at {siteConfig.phoneDisplay}.</p></section>
      </article>
    </>
  );
}
