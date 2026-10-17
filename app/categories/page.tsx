import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { CategoryCardGrid } from "@/components/categories/CategoryCardGrid";

export const metadata: Metadata = {
  title: "Spare-Part Categories",
  description:
    "Browse Honda motorcycle spare parts by category — engine, clutch, brakes, electrical, suspension, body parts, filters and more.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop by category"
        title="Spare-part categories"
        description="Browse parts by what you need. Categories are browsing aids — compatibility with your specific model is confirmed on each listing."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/categories", label: "Categories" },
        ]}
      />
      <CategoryCardGrid showHeading={false} />
    </>
  );
}
