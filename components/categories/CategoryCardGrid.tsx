import Image from "next/image";
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
            const categoryProducts = getProductsByCategory(categoryItem.id);
            const count = categoryProducts.length;
            const imageSrc = categoryItem.imageSrc ?? categoryProducts[0]?.image;
            return (
              <li key={categoryItem.id}>
                <Link
                  href={`/categories/${categoryItem.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-honda hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honda"
                >
                  {imageSrc && (
                    <span className="relative block aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image
                        src={imageSrc}
                        alt={`${categoryItem.name} parts`}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </span>
                  )}
                  <span className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                    <span className="text-sm leading-snug font-extrabold text-ink">
                      {categoryItem.name}
                    </span>
                    <span className="text-xs font-semibold text-charcoal-soft">
                      {count} {count === 1 ? "part" : "parts"} listed
                    </span>
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
