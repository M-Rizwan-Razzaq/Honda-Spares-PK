"use client";

import { useSearchParams } from "next/navigation";
import { ProductExplorer } from "@/components/products/ProductExplorer";

export function ShopExplorer() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const category = searchParams.get("category");
  const model = searchParams.get("model");

  const key = `${q}|${category ?? ""}|${model ?? ""}`;

  return (
    <ProductExplorer
      key={key}
      sectionId="shop"
      eyebrow="Catalogue"
      title={q ? `Search results for “${q}”` : "Shop spare parts"}
      description="Search by part name, model or part number, then narrow results with category and price filters."
      initialSearch={q}
      initialCategory={category}
      initialModel={model}
    />
  );
}
