import Link from "next/link";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { SectionHeading } from "@/components/common/SectionHeading";

interface CategoryCardGridProps {
  limit?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "center" | "left";
  showHeading?: boolean;
}

export function CategoryCardGrid({
  limit,
  eyebrow = "Shop by category",
  title = "Spare-part categories",
  description = "Browse parts by what you need. Categories are browsing aids — compatibility with your specific model is confirmed on each listing.",
  align = "center",
  showHeading = true,
}: CategoryCardGridProps) {
  const items = typeof limit === "number" ? categories.slice(0, limit) : categories;

  return (
    <section id="categories" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align={align} />
        )}

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {items.map((categoryItem) => {
            const count = getProductsByCategory(categoryItem.id).length;
            const Icon = categoryItem.icon;

            return (
              <li key={categoryItem.id}>
                <Link
                  href={`/categories/${categoryItem.id}`}
                  className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-honda hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honda sm:p-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-honda-soft text-honda transition-colors group-hover:bg-honda group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm leading-snug font-extrabold text-ink">
                    {categoryItem.name}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-soft">
                    {count} {count === 1 ? "part" : "parts"} listed
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
