import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { About } from "@/components/home/About";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A Honda motorcycle spare-parts business in Pakistan — helping riders find the right parts with fitment support, clear part details and chat-first ordering on WhatsApp.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About us"
        description="We help Honda riders across Pakistan find the right spare parts, with fitment guidance, clear part details and chat-first support on WhatsApp."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <About />
      <WhyChooseUs />
    </>
  );
}
