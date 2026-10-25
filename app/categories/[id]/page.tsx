import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { categoryById, categories } from "@/data/categories";

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[id]">): Promise<Metadata> {
  const { id } = await params;
  const category = categoryById.get(id);
  if (!category) return {};
  return {
    title: category.name,
    description: `Browse ${category.name.toLowerCase()} for Honda motorcycles in Pakistan. ${category.description}`,
    alternates: { canonical: `/categories/${category.id}` },
  };
}

export default function CategoryDetailPage({
  params,
}: PageProps<"/categories/[id]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="text-sm font-semibold text-charcoal-soft">Loading category…</p>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categoryById.get(id);
  if (!category) notFound();

  const Icon = category.icon;

  return (
    <>
      <PageHeader
        eyebrow="Spare-part category"
        title={category.name}
        description={category.description}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/categories", label: "Categories" },
          { href: `/categories/${category.id}`, label: category.name },
        ]}
      />

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-8 sm:px-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-honda-soft text-honda">
            <Icon className="h-7 w-7" aria-hidden />
          </span>
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-sm leading-relaxed text-charcoal-soft sm:text-base">
              Sample parts in this category. Confirm your motorcycle model and exact fitment on
              WhatsApp before ordering — compatibility shown here is catalogue sample data.
            </p>
            <Link
              href="/categories"
              className="text-sm font-bold text-honda transition-colors hover:text-honda-dark"
            >
              ← All categories
            </Link>
          </div>
        </div>
      </section>

      <ProductExplorer
        sectionId="category-parts"
        eyebrow={category.name}
        title={`${category.name} for Honda motorcycles`}
        description="Narrow by motorcycle model and price, then add items to your cart and send an order request on WhatsApp."
        headingAlign="left"
        fixedCategory={category.id}
        onRequestPartHref="/contact"
      />
    </>
  );
}
