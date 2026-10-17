import type { Product } from "./product";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
}
