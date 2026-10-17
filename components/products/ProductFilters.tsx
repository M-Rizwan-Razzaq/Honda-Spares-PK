"use client";

import { SlidersHorizontal, X } from "lucide-react";
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
            <label htmlFor="filter-model" className="text-xs font-bold text-charcoal">
              Motorcycle model
            </label>
            <select
              id="filter-model"
              value={model ?? ""}
              onChange={(event) => onModelChange(event.target.value || null)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-sm font-medium text-ink focus:border-honda focus:bg-white focus:outline-none"
            >
              <option value="">All models</option>
              {motorcycleModels.map((modelItem) => (
                <option key={modelItem.id} value={modelItem.id}>
                  {modelItem.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!lockedCategory && (
          <div>
            <label htmlFor="filter-category" className="text-xs font-bold text-charcoal">
              Category
            </label>
            <select
              id="filter-category"
              value={category ?? ""}
              onChange={(event) => onCategoryChange(event.target.value || null)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-surface px-3 py-2.5 text-sm font-medium text-ink focus:border-honda focus:bg-white focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((categoryItem) => (
                <option key={categoryItem.id} value={categoryItem.id}>
                  {categoryItem.name}
                </option>
              ))}
            </select>
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
    <div>
      <label htmlFor="sort-select" className="sr-only">
        Sort products
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink focus:border-honda focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
