"use client";

import Image from "next/image";
import { Check, MessageCircle, PackageX, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { ClassificationBadge, StockBadge } from "@/components/common/Badges";
import { getCategoryName } from "@/data/categories";
import { getModelNames } from "@/data/models";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/formatCurrency";
import { buildProductInquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  if (!product) return null;

  return (
    <Modal open onClose={onClose} title={product.name}>
      <ProductDetailsPanel key={product.id} product={product} />
    </Modal>
  );
}

function ProductDetailsPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const feedbackTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  const modelNames = product.fitsUniversal
    ? ["Universal fit — confirm for your motorcycle"]
    : getModelNames(product.models);

  const handleAdd = () => {
    add(product.id, quantity);
    setJustAdded(true);
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-surface">
        <Image
          src={product.image}
          alt={`${product.name} for Honda motorcycles`}
          unoptimized
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, 40vw"
          className="h-auto w-full object-cover"
        />
        {product.stock === "out-of-stock" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-bold text-white">
              <PackageX className="h-4 w-4" aria-hidden />
              Currently unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <ClassificationBadge classification={product.classification} />
          <StockBadge stock={product.stock} />
        </div>

        <div>
          <p className="price-num text-3xl font-extrabold text-ink">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-1 text-xs font-medium text-charcoal-soft">
            Catalog sample price · {siteConfig.currency.label}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-charcoal">{product.description}</p>

        <dl className="divide-y divide-gray-100 rounded-xl border border-gray-200">
          {product.partNumber && (
            <div className="flex items-center justify-between gap-3 px-4 py-2.5">
              <dt className="text-xs font-bold text-charcoal-soft">Part number</dt>
              <dd className="price-num text-xs font-bold text-ink">
                {product.partNumber}{" "}
                <span className="font-medium text-charcoal-soft">(sample)</span>
              </dd>
            </div>
          )}
          <div className="flex items-center justify-between gap-3 px-4 py-2.5">
            <dt className="text-xs font-bold text-charcoal-soft">Category</dt>
            <dd className="text-xs font-bold text-ink">{getCategoryName(product.category)}</dd>
          </div>
          <div className="px-4 py-2.5">
            <dt className="text-xs font-bold text-charcoal-soft">Compatibility</dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {modelNames.map((name) => (
                <span
                  key={name}
                  className="rounded-md bg-surface px-2 py-1 text-[11px] font-bold text-charcoal"
                >
                  {name}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        {product.features.length > 0 && (
          <ul className="space-y-1.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-charcoal">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-honda" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={handleAdd}
            disabled={product.stock === "out-of-stock" || justAdded}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-honda px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-honda-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Added to cart
              </>
            ) : product.stock === "out-of-stock" ? (
              "Currently unavailable"
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden />
                Add {quantity > 1 ? `${quantity} ` : ""}to cart
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => openWhatsApp(buildProductInquiryMessage(product))}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-whatsapp bg-white px-5 py-3 text-sm font-bold text-whatsapp-dark transition-colors hover:bg-whatsapp hover:text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Ask about this part on WhatsApp
        </button>

        <p className="text-[11px] leading-relaxed text-charcoal-soft">
          Stock, fitment and final price are confirmed by our team before dispatch. Part numbers
          and classifications shown here are sample catalog data.
        </p>
      </div>
    </div>
  );
}
