import { productById } from "@/data/products";
import type { CartItem } from "@/types/cart";

export const CART_STORAGE_KEY = "honda-spares-cart-v1";
export const MAX_CART_QUANTITY = 99;

const emptyCart: CartItem[] = [];
const listeners = new Set<() => void>();

let cartItems: CartItem[] = emptyCart;
let hasLoaded = false;

function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(MAX_CART_QUANTITY, Math.max(1, Math.round(quantity)));
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // Storage can be unavailable (private mode); the cart still works in-memory.
  }
}

function notify() {
  for (const listener of listeners) listener();
}

function commit(next: CartItem[]) {
  cartItems = next;
  persist();
  notify();
}

function loadFromStorage() {
  if (hasLoaded || typeof window === "undefined") return;
  hasLoaded = true;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    const valid = parsed
      .filter(
        (item): item is CartItem =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as CartItem).productId === "string" &&
          typeof (item as CartItem).quantity === "number" &&
          productById.has((item as CartItem).productId),
      )
      .map((item) => ({
        productId: item.productId,
        quantity: clampQuantity(item.quantity),
      }));
    if (valid.length > 0) {
      cartItems = valid;
    }
  } catch {
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

export function subscribeToCart(listener: () => void): () => void {
  loadFromStorage();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartSnapshot(): CartItem[] {
  loadFromStorage();
  return cartItems;
}

export function getCartServerSnapshot(): CartItem[] {
  return emptyCart;
}

export function addToCart(productId: string, quantity: number = 1) {
  const product = productById.get(productId);
  if (!product || product.stock === "out-of-stock") return;

  const existing = cartItems.find((item) => item.productId === productId);
  if (existing) {
    commit(
      cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
          : item,
      ),
    );
  } else {
    commit([...cartItems, { productId, quantity: clampQuantity(quantity) }]);
  }
}

export function removeFromCart(productId: string) {
  commit(cartItems.filter((item) => item.productId !== productId));
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(productId);
    return;
  }
  commit(
    cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
    ),
  );
}

export function clearCart() {
  commit([]);
}
