"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { CustomSelect } from "@/components/common/CustomSelect";
import { categories } from "@/data/categories";
import { motorcycleModels } from "@/data/models";
import { priceBounds } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import type { SortOption } from "@/types/product";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name (A–Z)" },
];

const sliderStep = 50;

export interface ProductFiltersProps {
  category: string | null;
  model: string | null;
  priceMin: number | null;
  priceMax: number | null;
  activeFilterCount: number;
  lockedCategory?: boolean;
  lockedModel?: boolean;
  onCategoryChange: (value: string | null) => void;
  onModelChange: (value: string | null) => void;
  onPriceMinChange: (value: number | null) => void;
  onPriceMaxChange: (value: number | null) => void;
  onClear: () => void;
  className?: string;
}

export function ProductFilters({
  category,
  model,
  priceMin,
  priceMax,
  activeFilterCount,
  lockedCategory = false,
  lockedModel = false,
  onCategoryChange,
  onModelChange,
  onPriceMinChange,
  onPriceMaxChange,
  onClear,
  className = "",
}: ProductFiltersProps) {
  const min = priceMin ?? priceBounds.min;
  const max = priceMax ?? priceBounds.max;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-ink uppercase">
          <SlidersHorizontal className="h-4 w-4 text-honda" aria-hidden />
          Filters
        </h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-bold text-honda hover:text-honda-dark"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
            Clear all
          </button>
        )}
      </div>

      <div className="mt-5 space-y-5">
        {!lockedModel && (
          <div>
            <p className="text-xs font-bold text-charcoal">
              Motorcycle model
            </p>
            <CustomSelect
              label="Motorcycle model"
              value={model ?? ""}
              onChange={(value) => onModelChange(value || null)}
              className="mt-2 w-full"
              options={[
                { value: "", label: "All models" },
                ...motorcycleModels.map((modelItem) => ({ value: modelItem.id, label: modelItem.name })),
              ]}
            />
          </div>
        )}

        {!lockedCategory && (
          <div>
            <p className="text-xs font-bold text-charcoal">
              Category
            </p>
            <CustomSelect
              label="Category"
              value={category ?? ""}
              onChange={(value) => onCategoryChange(value || null)}
              className="mt-2 w-full"
              options={[
                { value: "", label: "All categories" },
                ...categories.map((categoryItem) => ({ value: categoryItem.id, label: categoryItem.name })),
              ]}
            />
          </div>
        )}

        <fieldset>
          <legend className="text-xs font-bold text-charcoal">Price range</legend>
          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-charcoal-soft">
            <span className="price-num rounded-md bg-surface px-2 py-1 text-ink">
              {formatCurrency(min)}
            </span>
            <span aria-hidden>—</span>
            <span className="price-num rounded-md bg-surface px-2 py-1 text-ink">
              {formatCurrency(max)}
            </span>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor="filter-price-min" className="sr-only">
                Minimum price
              </label>
              <input
                id="filter-price-min"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={sliderStep}
                value={min}
                onChange={(event) => onPriceMinChange(Number(event.target.value))}
                className="w-full accent-honda"
              />
              <span className="text-[11px] font-medium text-charcoal-soft">Minimum price</span>
            </div>
            <div>
              <label htmlFor="filter-price-max" className="sr-only">
                Maximum price
              </label>
              <input
                id="filter-price-max"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={sliderStep}
                value={max}
                onChange={(event) => onPriceMaxChange(Number(event.target.value))}
                className="w-full accent-honda"
              />
              <span className="text-[11px] font-medium text-charcoal-soft">Maximum price</span>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export function SortSelect({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <CustomSelect
      label="Sort products"
      value={value}
      onChange={(nextValue) => onChange(nextValue as SortOption)}
      className="w-auto min-w-44 max-w-[min(16rem,55vw)]"
      options={sortOptions}
    />
  );
}
