"use client";

import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDetails } from "@/components/products/ProductDetails";
import { getFeaturedProducts } from "@/data/products";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  limit?: number;
}

export function FeaturedProducts({ limit = 8 }: FeaturedProductsProps) {
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const featured = getFeaturedProducts(limit);

  return (
    <>
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featured.map((product) => (
          <li key={product.id} className="h-full">
            <ProductCard product={product} onOpenDetails={setDetailsProduct} />
          </li>
        ))}
      </ul>
      <ProductDetails product={detailsProduct} onClose={() => setDetailsProduct(null)} />
    </>
  );
}
