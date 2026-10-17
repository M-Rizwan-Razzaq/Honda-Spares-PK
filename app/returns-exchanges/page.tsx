import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Honda Spare Parts Pakistan",
  description: "Read Honda Spares PK's returns and exchange process for motorcycle spare parts orders in Pakistan, including how to report an incorrect, damaged or unsuitable item.",
  alternates: { canonical: "/returns-exchanges" },
};

export default function ReturnsExchangesPage() {
  return (
    <>
      <PageHeader eyebrow="Customer support" title="Returns & exchanges" description="Please check fitment and order details with our team before confirming your motorcycle spare parts order." crumbs={[{ href: "/", label: "Home" }, { href: "/returns-exchanges", label: "Returns & exchanges" }]} />
      <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm leading-7 text-charcoal-soft sm:px-6 sm:py-16 sm:text-base">
        <section><h2 className="text-xl font-extrabold text-ink">Before placing an order</h2><p className="mt-3">Share your motorcycle model, model year where relevant, and the part you need. Our team will help check the available fitment information and confirm the item, price, delivery charges and delivery estimate with you on WhatsApp before you agree to the order.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">If there is a problem with your order</h2><p className="mt-3">If your parcel arrives damaged, contains an item different from the one confirmed, or you believe a part does not match the confirmed fitment, contact us as soon as possible after delivery. Send your order conversation, clear photos of the item and packaging, and a short description of the issue so we can review it.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Review and resolution</h2><p className="mt-3">We review each request individually and will explain the available next steps after checking the order and item. Please keep the part, labels and packaging in their received condition while we review your request. Do not install, alter or discard an item you want us to assess.</p><p className="mt-3">Return or exchange arrangements, including eligibility, condition requirements, shipping responsibility and any applicable costs, are confirmed with you before an item is sent back. An exchange or refund is not guaranteed until the request has been reviewed and agreed.</p></section>
        <section><h2 className="text-xl font-extrabold text-ink">Contact us</h2><p className="mt-3">Start a return or exchange request by messaging us on WhatsApp at <a className="font-bold text-honda hover:underline" href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{siteConfig.phoneDisplay}</a> or emailing <a className="font-bold text-honda hover:underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Include your name, order details and photos so our team can help.</p><p className="mt-3">For help choosing a part before you order, visit our <Link className="font-bold text-honda hover:underline" href="/contact">contact page</Link>.</p></section>
        <p className="border-t border-gray-200 pt-5 text-xs">This page describes our current customer support process. Any order-specific return or exchange agreement confirmed with you will apply to that order.</p>
      </article>
    </>
  );
}
