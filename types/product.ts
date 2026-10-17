export type ProductClassification = "genuine-honda" | "oem" | "aftermarket";

export type StockStatus = "in-stock" | "low-stock" | "backorder" | "out-of-stock";

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export interface Product {
  id: string;
  name: string;
  partNumber: string | null;
  price: number;
  category: string;
  models: string[];
  fitsUniversal?: boolean;
  classification: ProductClassification;
  stock: StockStatus;
  image: string;
  description: string;
  features: string[];
  featured?: boolean;
  sampleData: boolean;
}

export interface MotorcycleModel {
  id: string;
  name: string;
  description: string;
  shortName: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
