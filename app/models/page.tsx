import type { Metadata } from "next";
import { PageHeader } from "@/components/common/PageHeader";
import { ModelCardGrid } from "@/components/models/ModelCardGrid";

export const metadata: Metadata = {
  title: "Honda Motorcycle Models",
  description:
    "Shop Honda motorcycle spare parts by model — CD 70, CD 70 Dream, Pridor, CG 125, CG 125 Special Edition, CB 125F, CB 150F and more.",
  alternates: { canonical: "/models" },
};

export default function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop by motorcycle"
        title="Honda motorcycle models"
        description="Pick your motorcycle to view the parts listed for it. Fitment shown here is sample catalogue data — we confirm your exact model, year and variant before dispatch."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/models", label: "Models" },
        ]}
      />
      <ModelCardGrid showHeading={false} />
    </>
  );
}
