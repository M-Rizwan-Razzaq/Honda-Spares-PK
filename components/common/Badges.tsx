import type { ProductClassification, StockStatus } from "@/types/product";

const classificationStyles: Record<ProductClassification, { label: string; className: string }> = {
  "genuine-honda": {
    label: "Genuine Honda",
    className: "bg-honda text-white",
  },
  oem: {
    label: "OEM",
    className: "bg-ink text-white",
  },
  aftermarket: {
    label: "Aftermarket",
    className: "border border-charcoal-soft/40 bg-white text-charcoal",
  },
};

export function ClassificationBadge({
  classification,
}: {
  classification: ProductClassification;
}) {
  const style = classificationStyles[classification];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase ${style.className}`}
    >
      {style.label}
    </span>
  );
}

const stockStyles: Record<StockStatus, { label: string; dotClassName: string; textClassName: string }> =
  {
    "in-stock": {
      label: "In stock",
      dotClassName: "bg-emerald-500",
      textClassName: "text-emerald-700",
    },
    "low-stock": {
      label: "Limited stock",
      dotClassName: "bg-amber-500",
      textClassName: "text-amber-700",
    },
    backorder: {
      label: "Backorder",
      dotClassName: "bg-sky-600",
      textClassName: "text-sky-700",
    },
    "out-of-stock": {
      label: "Out of stock",
      dotClassName: "bg-gray-400",
      textClassName: "text-gray-500",
    },
  };

export function StockBadge({ stock }: { stock: StockStatus }) {
  const style = stockStyles[stock];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${style.textClassName}`}>
      <span className={`h-2 w-2 rounded-full ${style.dotClassName}`} aria-hidden />
      {style.label}
    </span>
  );
}
