import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motorcycleModels } from "@/data/models";
import { getProductsByModel } from "@/data/products";
import { SectionHeading } from "@/components/common/SectionHeading";

interface ModelCardGridProps {
  limit?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "center" | "left";
  showHeading?: boolean;
}

export function ModelCardGrid({
  limit,
  eyebrow = "Shop by motorcycle",
  title = "Find parts for your Honda model",
  description = "Select your motorcycle to see parts listed for it. Listings shown are sample data — final fitment is confirmed with our team before dispatch.",
  align = "center",
  showHeading = true,
}: ModelCardGridProps) {
  const models = typeof limit === "number" ? motorcycleModels.slice(0, limit) : motorcycleModels;

  return (
    <section id="models" className="bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align={align} />
        )}

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((modelItem) => {
            const count = getProductsByModel(modelItem.id).length;

            return (
              <li key={modelItem.id}>
                <Link
                  href={`/models/${modelItem.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-honda hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honda"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={modelItem.imageSrc}
                      alt={`${modelItem.name} motorcycle`}
                      width={800}
                      height={600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-base font-extrabold text-ink">{modelItem.name}</h3>
                    <p className="flex-1 text-xs leading-relaxed text-charcoal-soft">
                      {modelItem.description}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-honda">
                      View Parts
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                      <span className="ml-auto text-xs font-semibold text-charcoal-soft">
                        {count} listed
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
