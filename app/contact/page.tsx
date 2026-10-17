import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq } from "@/components/home/Faq";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach us on WhatsApp, phone or email for Honda motorcycle spare parts. Send your bike model and the part you need — we confirm availability, fitment and delivery before dispatch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Message us on WhatsApp with your motorcycle model and the part you need. We confirm availability, fitment and delivery details with you before you pay."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />
      <ContactSection />
      <Faq />
    </>
  );
}
