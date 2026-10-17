"use client";

import { Info, PackageOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "./ProductCard";
import { ProductDetails } from "./ProductDetails";
import { ProductFilters, SortSelect } from "./ProductFilters";
import { getCategoryName } from "@/data/categories";
import { getModelNames } from "@/data/models";
import { products, priceBounds } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import { siteConfig } from "@/config/site";
import type { Product, SortOption } from "@/types/product";

export interface ProductExplorerProps {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  headingAlign?: "center" | "left";
  fixedCategory?: string;
  fixedModel?: string;
  initialSearch?: string;
  initialCategory?: string | null;
  initialModel?: string | null;
  onRequestPartHref?: string;
}

export function ProductExplorer({
  sectionId = "shop",
  eyebrow = "Catalogue",
  title = "Shop spare parts",
  description = "Search by part name, model or part number, then narrow results with category and price filters.",
  headingAlign = "center",
  fixedCategory,
  fixedModel,
  initialSearch = "",
  initialCategory = null,
  initialModel = null,
  onRequestPartHref = "/contact",
}: ProductExplorerProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<string | null>(fixedCategory ?? initialCategory);
  const [model, setModel] = useState<string | null>(fixedModel ?? initialModel);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("featured");
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const setBoundedPriceMin = (value: number | null) => {
    if (value === null) {
      setPriceMin(null);
      return;
    }
    const nextMin = Math.max(priceBounds.min, Math.min(value, priceBounds.max));
    setPriceMin(nextMin);
    if (priceMax !== null && nextMin > priceMax) setPriceMax(nextMin);
  };

  const setBoundedPriceMax = (value: number | null) => {
    if (value === null) {
      setPriceMax(null);
      return;
    }
    const nextMax = Math.min(priceBounds.max, Math.max(value, priceBounds.min));
    setPriceMax(nextMax);
    if (priceMin !== null && nextMax < priceMin) setPriceMin(nextMax);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory(fixedCategory ?? null);
    setModel(fixedModel ?? null);
    setPriceMin(null);
    setPriceMax(null);
    setSort("featured");
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (!fixedCategory && category) count += 1;
    if (!fixedModel && model) count += 1;
    if (search.trim()) count += 1;
    if (priceMin !== null || priceMax !== null) count += 1;
    return count;
  }, [category, model, search, priceMin, priceMax, fixedCategory, fixedModel]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      if (term) {
        const haystack = [
          product.name,
          product.partNumber ?? "",
          getCategoryName(product.category),
          product.fitsUniversal ? "universal fit" : "",
          ...getModelNames(product.models),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (category && product.category !== category) return false;
      if (model && !(product.fitsUniversal || product.models.includes(model))) return false;
      if (priceMin !== null && product.price < priceMin) return false;
      if (priceMax !== null && product.price > priceMax) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return [...result].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
  }, [search, category, model, priceMin, priceMax, sort]);

  const chips: { key: string; label: string; onRemove: () => void }[] = [];
  if (search.trim()) {
    chips.push({ key: "search", label: `Search: “${search.trim()}”`, onRemove: () => setSearch("") });
  }
  if (!fixedCategory && category) {
    chips.push({ key: "category", label: getCategoryName(category), onRemove: () => setCategory(null) });
  }
  if (!fixedModel && model) {
    chips.push({
      key: "model",
      label: getModelNames([model])[0] ?? model,
      onRemove: () => setModel(null),
    });
  }
  if (priceMin !== null || priceMax !== null) {
    chips.push({
      key: "price",
      label: `${formatCurrency(priceMin ?? priceBounds.min)} – ${formatCurrency(priceMax ?? priceBounds.max)}`,
      onRemove: () => {
        setPriceMin(null);
        setPriceMax(null);
      },
    });
  }

  return (
    <section id={sectionId} className="border-t border-gray-200 bg-surface py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align={headingAlign} />

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p className="leading-relaxed">{siteConfig.demoNotice}</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[17rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
              <ProductFilters
                category={category}
                model={model}
                priceMin={priceMin}
                priceMax={priceMax}
                activeFilterCount={activeFilterCount}
                lockedCategory={Boolean(fixedCategory)}
                lockedModel={Boolean(fixedModel)}
                onCategoryChange={setCategory}
                onModelChange={setModel}
                onPriceMinChange={setBoundedPriceMin}
                onPriceMaxChange={setBoundedPriceMax}
                onClear={clearFilters}
              />
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <label htmlFor={`${sectionId}-search`} className="sr-only">
                  Search the parts catalogue
                </label>
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
                  aria-hidden
                />
                <input
                  id={`${sectionId}-search`}
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by part name, model or part number…"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-10 pl-10 text-sm text-ink shadow-sm placeholder:text-charcoal-soft/80 focus:border-honda focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-charcoal-soft hover:bg-surface hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm transition-colors hover:border-honda hover:text-honda lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-honda px-1 text-[11px] text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <SortSelect value={sort} onChange={setSort} />
              </div>
            </div>

            {(chips.length > 0 || activeFilterCount > 0) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-honda/25 bg-honda-soft py-1 pr-1.5 pl-3 text-xs font-bold text-honda"
                  >
                    {chip.label}
                    <button
                      type="button"
                      onClick={chip.onRemove}
                      aria-label={`Remove filter: ${chip.label}`}
                      className="rounded-full p-0.5 transition-colors hover:bg-honda hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-charcoal underline-offset-2 hover:text-honda hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            <p className="mt-4 text-sm font-semibold text-charcoal-soft" aria-live="polite">
              Showing <span className="text-ink">{filteredProducts.length}</span> of{" "}
              <span className="text-ink">{products.length}</span> products
            </p>

            {filteredProducts.length === 0 ? (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <PackageOpen className="h-10 w-10 text-charcoal-soft" aria-hidden />
                <h3 className="text-lg font-extrabold text-ink">No matching parts found</h3>
                <p className="max-w-md text-sm leading-relaxed text-charcoal-soft">
                  Try a different search term, or clear the filters to browse the full catalogue.
                  You can also send us a part request on WhatsApp and we&apos;ll help source it.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-xl bg-honda px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-honda-dark"
                  >
                    Clear filters
                  </button>
                  <a
                    href={onRequestPartHref}
                    className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-ink"
                  >
                    Request a part
                  </a>
                </div>
              </div>
            ) : (
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="h-full">
                    <ProductCard product={product} onOpenDetails={setDetailsProduct} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        title="Filter parts"
        variant="drawer"
      >
        <div className="p-4">
          <ProductFilters
            category={category}
            model={model}
            priceMin={priceMin}
            priceMax={priceMax}
            activeFilterCount={activeFilterCount}
            lockedCategory={Boolean(fixedCategory)}
            lockedModel={Boolean(fixedModel)}
            onCategoryChange={setCategory}
            onModelChange={setModel}
            onPriceMinChange={setBoundedPriceMin}
            onPriceMaxChange={setBoundedPriceMax}
            onClear={clearFilters}
          />
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(false)}
            className="mt-6 w-full rounded-xl bg-honda px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-honda-dark"
          >
            Show {filteredProducts.length} results
          </button>
        </div>
      </Modal>

      <ProductDetails product={detailsProduct} onClose={() => setDetailsProduct(null)} />
    </section>
  );
}
