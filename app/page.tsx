import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ModelCardGrid } from "@/components/models/ModelCardGrid";
import { CategoryCardGrid } from "@/components/categories/CategoryCardGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Faq } from "@/components/home/Faq";
import { SectionHeading } from "@/components/common/SectionHeading";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Featured"
            title="Popular spare parts"
            description="A selection from the catalogue. Listings are sample data — availability, grade and fitment are confirmed on WhatsApp before dispatch."
          />
          <FeaturedProducts limit={8} />
          <div className="mt-8 flex justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-honda hover:text-honda"
            >
              Browse all parts
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <ModelCardGrid
        eyebrow="Shop by motorcycle"
        title="Find parts for your Honda model"
        description="Select your motorcycle to see parts listed for it. Listings shown are sample data — final fitment is confirmed with our team before dispatch."
      />

      <CategoryCardGrid
        eyebrow="Shop by category"
        title="Spare-part categories"
        description="Browse parts by what you need. Categories are browsing aids — compatibility with your specific model is confirmed on each listing."
      />

      <WhyChooseUs />
      <Faq />
    </>
  );
}
