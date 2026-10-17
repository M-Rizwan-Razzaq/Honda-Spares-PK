"use client";

import Image from "next/image";
import { Check, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ClassificationBadge, StockBadge } from "@/components/common/Badges";
import { getCategoryName } from "@/data/categories";
import { getModelNames } from "@/data/models";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const feedbackTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  const handleAdd = () => {
    add(product.id, 1);
    setJustAdded(true);
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAdded(false), 1600);
  };

  const modelNames = product.fitsUniversal
    ? ["Universal fit"]
    : getModelNames(product.models);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <button
        type="button"
        onClick={() => onOpenDetails(product)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-surface"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.image}
          alt={`Placeholder illustration for ${product.name}`}
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3">
          <ClassificationBadge classification={product.classification} />
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <StockBadge stock={product.stock} />
          <span className="text-[11px] font-semibold text-charcoal-soft">
            {getCategoryName(product.category)}
          </span>
        </div>

        <h3 className="line-clamp-2 text-base leading-snug font-extrabold text-ink">
          <button
            type="button"
            onClick={() => onOpenDetails(product)}
            className="text-left transition-colors hover:text-honda"
          >
            {product.name}
          </button>
        </h3>

        {product.partNumber && (
          <p className="text-xs font-semibold text-charcoal-soft">
            Part no. <span className="price-num text-charcoal">{product.partNumber}</span>
            <span className="ml-1 font-medium">(sample)</span>
          </p>
        )}

        <p className="line-clamp-1 text-xs font-medium text-charcoal-soft">
          Fits: {modelNames.slice(0, 2).join(", ")}
          {modelNames.length > 2 ? ` +${modelNames.length - 2} more` : ""}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="price-num text-lg font-extrabold text-ink">
              {formatCurrency(product.price)}
            </p>
            <p className="text-[11px] font-medium text-charcoal-soft">Catalog sample price</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenDetails(product)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-bold text-ink transition-colors hover:border-ink hover:bg-surface"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
            Details
          </button>
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === "out-of-stock" || justAdded}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-honda px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-honda-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden />
                Added
              </>
            ) : product.stock === "out-of-stock" ? (
              "Unavailable"
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" aria-hidden />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
