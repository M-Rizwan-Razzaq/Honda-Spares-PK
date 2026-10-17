import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { ShopExplorer } from "@/components/shop/ShopExplorer";

export const metadata: Metadata = {
  title: "Shop Spare Parts",
  description:
    "Browse Honda motorcycle spare parts by model, category and price. Search by part name or part number, then order on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Shop spare parts"
        description="Search the catalogue by part name, motorcycle model or part number, then narrow the list with category and price filters."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
        ]}
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="text-sm font-semibold text-charcoal-soft">Loading catalogue…</p>
          </div>
        }
      >
        <ShopExplorer />
      </Suspense>
    </>
  );
}
