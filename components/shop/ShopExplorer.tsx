"use client";

import { ProductExplorer } from "@/components/products/ProductExplorer";

export function ShopExplorer() {
  return (
    <ProductExplorer
      sectionId="shop"
      eyebrow="Catalogue"
      title="Shop spare parts"
      description="Search by part name, model or part number, then narrow results with category and price filters."
    />
  );
}
