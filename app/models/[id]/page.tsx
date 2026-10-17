import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { modelById, motorcycleModels } from "@/data/models";

export function generateStaticParams() {
  return motorcycleModels.map((model) => ({ id: model.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/models/[id]">): Promise<Metadata> {
  const { id } = await params;
  const model = modelById.get(id);
  if (!model) return {};
  return {
    title: `${model.name} Spare Parts`,
    description: `Shop spare parts listed for the ${model.name} — engine, brakes, electrical and maintenance components. Confirm fitment on WhatsApp before ordering.`,
    alternates: { canonical: `/models/${model.id}` },
  };
}

export default async function ModelDetailPage({ params }: PageProps<"/models/[id]">) {
  const { id } = await params;
  const model = modelById.get(id);
  if (!model) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Motorcycle model"
        title={model.name}
        description={model.description}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/models", label: "Models" },
          { href: `/models/${model.id}`, label: model.shortName },
        ]}
      />

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-8 sm:px-6">
          <div className="relative hidden aspect-[4/3] w-56 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-surface sm:block">
            <Image
              src="/images/models/bike.svg"
              alt={`Generic motorcycle illustration for ${model.name}`}
              width={800}
              height={600}
              sizes="224px"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <p className="text-sm leading-relaxed text-charcoal-soft sm:text-base">
              Below are sample parts listed for the {model.name}. Use the filters to narrow by
              category and price, then add what you need to your cart and send the order request on
              WhatsApp. We confirm compatibility, availability and delivery with you before you pay.
            </p>
            <Link
              href="/models"
              className="text-sm font-bold text-honda transition-colors hover:text-honda-dark"
            >
              ← All motorcycle models
            </Link>
          </div>
        </div>
      </section>

      <ProductExplorer
        sectionId="model-parts"
        eyebrow={`${model.name} parts`}
        title={`Parts listed for the ${model.shortName}`}
        description="Sample catalogue listings — final fitment, grade and stock are confirmed on WhatsApp before dispatch."
        headingAlign="left"
        fixedModel={model.id}
        onRequestPartHref="/contact"
      />
    </>
  );
}
