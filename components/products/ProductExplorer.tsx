"use client";

import { Info, PackageOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@/components/common/Modal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "./ProductCard";
import { ProductDetails } from "./ProductDetails";
import { ProductFilters, sortOptions, SortSelect } from "./ProductFilters";
import { categoryById, getCategoryName } from "@/data/categories";
import { getModelNames, modelById } from "@/data/models";
import { products, priceBounds } from "@/data/products";
import { formatCurrency } from "@/lib/formatCurrency";
import { siteConfig } from "@/config/site";
import type { Product, SortOption } from "@/types/product";

const searchDebounceMs = 300;
const catalogueParamNames = ["q", "category", "model", "minPrice", "maxPrice", "sort"] as const;

interface CatalogueFilters {
  search: string;
  category: string | null;
  model: string | null;
  priceMin: number | null;
  priceMax: number | null;
  sort: SortOption;
}

function parsePrice(value: string | null): number | null {
  if (value === null || value.trim() === "") return null;

  const price = Number(value);
  return Number.isFinite(price) && price >= priceBounds.min && price <= priceBounds.max
    ? price
    : null;
}

function getFiltersFromSearchParams(
  searchParams: { get: (name: string) => string | null },
  fixedCategory?: string,
  fixedModel?: string,
): CatalogueFilters {
  let priceMin = parsePrice(searchParams.get("minPrice"));
  let priceMax = parsePrice(searchParams.get("maxPrice"));

  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    [priceMin, priceMax] = [priceMax, priceMin];
  }

  if (priceMin === priceBounds.min) priceMin = null;
  if (priceMax === priceBounds.max) priceMax = null;

  const sort = searchParams.get("sort");
  const isSortOption = sortOptions.some((option) => option.value === sort);

  return {
    search: searchParams.get("q")?.trim() ?? "",
    category:
      fixedCategory ??
      (categoryById.has(searchParams.get("category") ?? "") ? searchParams.get("category") : null),
    model:
      fixedModel ??
      (modelById.has(searchParams.get("model") ?? "") ? searchParams.get("model") : null),
    priceMin,
    priceMax,
    sort: isSortOption ? (sort as SortOption) : "featured",
  };
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-honda/25 bg-honda-soft py-1 pr-1.5 pl-3 text-xs font-bold text-honda">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter: ${label}`}
        className="rounded-full p-0.5 transition-colors hover:bg-honda hover:text-white"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </span>
  );
}

export interface ProductExplorerProps {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  headingAlign?: "center" | "left";
  fixedCategory?: string;
  fixedModel?: string;
  onRequestPartHref?: string;
}

export function ProductExplorer(props: ProductExplorerProps) {
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const initialFilters = useMemo(
    () => getFiltersFromSearchParams(searchParams, props.fixedCategory, props.fixedModel),
    [searchParams, props.fixedCategory, props.fixedModel],
  );

  return <ProductExplorerContent key={searchParamsKey} {...props} initialFilters={initialFilters} />;
}

function ProductExplorerContent({
  sectionId = "shop",
  eyebrow = "Catalogue",
  title = "Shop spare parts",
  description = "Search by part name, model or part number, then narrow results with category and price filters.",
  headingAlign = "center",
  fixedCategory,
  fixedModel,
  onRequestPartHref = "/contact",
  initialFilters,
}: ProductExplorerProps & { initialFilters: CatalogueFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const filtersRef = useRef<CatalogueFilters>(initialFilters);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [search, setSearch] = useState(initialFilters.search);
  const [category, setCategory] = useState<string | null>(initialFilters.category);
  const [model, setModel] = useState<string | null>(initialFilters.model);
  const [priceMin, setPriceMin] = useState<number | null>(initialFilters.priceMin);
  const [priceMax, setPriceMax] = useState<number | null>(initialFilters.priceMax);
  const [sort, setSort] = useState<SortOption>(initialFilters.sort);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const updateUrl = useCallback((nextFilters: CatalogueFilters, mode: "push" | "replace") => {
    const params = new URLSearchParams(window.location.search);
    catalogueParamNames.forEach((name) => params.delete(name));

    if (nextFilters.search) params.set("q", nextFilters.search);
    if (!fixedCategory && nextFilters.category) params.set("category", nextFilters.category);
    if (!fixedModel && nextFilters.model) params.set("model", nextFilters.model);
    if (nextFilters.priceMin !== null) params.set("minPrice", String(nextFilters.priceMin));
    if (nextFilters.priceMax !== null) params.set("maxPrice", String(nextFilters.priceMax));
    if (nextFilters.sort !== "featured") params.set("sort", nextFilters.sort);

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router[mode](href, { scroll: false });
  }, [fixedCategory, fixedModel, pathname, router]);

  const applyFilters = useCallback((nextFilters: CatalogueFilters, mode: "push" | "replace") => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    filtersRef.current = nextFilters;
    setSearch(nextFilters.search);
    setCategory(nextFilters.category);
    setModel(nextFilters.model);
    setPriceMin(nextFilters.priceMin);
    setPriceMax(nextFilters.priceMax);
    setSort(nextFilters.sort);
    updateUrl(nextFilters, mode);
  }, [updateUrl]);

  const updateFilters = useCallback(
    (changes: Partial<CatalogueFilters>, mode: "push" | "replace" = "push") => {
      applyFilters({ ...filtersRef.current, ...changes }, mode);
    },
    [applyFilters],
  );

  const updateSearch = useCallback((value: string) => {
    const nextFilters = { ...filtersRef.current, search: value.trim() };
    filtersRef.current = nextFilters;
    setSearch(value);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      searchTimeoutRef.current = null;
      updateUrl(filtersRef.current, "replace");
    }, searchDebounceMs);
  }, [updateUrl]);

  const setBoundedPriceMin = useCallback((value: number | null) => {
    if (value === null) {
      updateFilters({ priceMin: null }, "replace");
      return;
    }
    const nextMin = Math.max(priceBounds.min, Math.min(value, priceBounds.max));
    const normalizedMin = nextMin === priceBounds.min ? null : nextMin;
    const currentPriceMax = filtersRef.current.priceMax;
    updateFilters(
      {
        priceMin: normalizedMin,
        priceMax:
          currentPriceMax !== null && nextMin > currentPriceMax ? nextMin : currentPriceMax,
      },
      "replace",
    );
  }, [updateFilters]);

  const setBoundedPriceMax = useCallback((value: number | null) => {
    if (value === null) {
      updateFilters({ priceMax: null }, "replace");
      return;
    }
    const nextMax = Math.min(priceBounds.max, Math.max(value, priceBounds.min));
    const normalizedMax = nextMax === priceBounds.max ? null : nextMax;
    const currentPriceMin = filtersRef.current.priceMin;
    updateFilters(
      {
        priceMax: normalizedMax,
        priceMin: currentPriceMin !== null && nextMax < currentPriceMin ? nextMax : currentPriceMin,
      },
      "replace",
    );
  }, [updateFilters]);

  const clearFilters = useCallback(() => {
    applyFilters(
      {
        search: "",
        category: fixedCategory ?? null,
        model: fixedModel ?? null,
        priceMin: null,
        priceMax: null,
        sort: "featured",
      },
      "push",
    );
  }, [applyFilters, fixedCategory, fixedModel]);

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

  const clearSearch = useCallback(() => updateFilters({ search: "" }), [updateFilters]);
  const clearCategory = useCallback(() => updateFilters({ category: null }), [updateFilters]);
  const clearModel = useCallback(() => updateFilters({ model: null }), [updateFilters]);
  const clearPriceRange = useCallback(
    () => updateFilters({ priceMin: null, priceMax: null }),
    [updateFilters],
  );

  const hasVisibleFilters =
    Boolean(search.trim()) ||
    Boolean(!fixedCategory && category) ||
    Boolean(!fixedModel && model) ||
    priceMin !== null ||
    priceMax !== null ||
    sort !== "featured";

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
                onCategoryChange={(value) => updateFilters({ category: value })}
                onModelChange={(value) => updateFilters({ model: value })}
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
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Search by part name, model or part number…"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-10 pl-10 text-sm text-ink shadow-sm placeholder:text-charcoal-soft/80 focus:border-honda focus:outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
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
                <SortSelect value={sort} onChange={(value) => updateFilters({ sort: value })} />
              </div>
            </div>

            {hasVisibleFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {search.trim() && <FilterChip label={`Search: “${search.trim()}”`} onRemove={clearSearch} />}
                {!fixedCategory && category && (
                  <FilterChip label={getCategoryName(category)} onRemove={clearCategory} />
                )}
                {!fixedModel && model && (
                  <FilterChip label={getModelNames([model])[0] ?? model} onRemove={clearModel} />
                )}
                {(priceMin !== null || priceMax !== null) && (
                  <FilterChip
                    label={`${formatCurrency(priceMin ?? priceBounds.min)} – ${formatCurrency(priceMax ?? priceBounds.max)}`}
                    onRemove={clearPriceRange}
                  />
                )}
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
            onCategoryChange={(value) => updateFilters({ category: value })}
            onModelChange={(value) => updateFilters({ model: value })}
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
