"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { productById } from "@/data/products";
import {
  addToCart,
  clearCart,
  getCartServerSnapshot,
  getCartSnapshot,
  removeFromCart,
  subscribeToCart,
  updateCartQuantity,
} from "@/lib/cart-store";
import type { CartLine } from "@/types/cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeToCart, getCartSnapshot, getCartServerSnapshot);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const lines = useMemo<CartLine[]>(() => {
    const result: CartLine[] = [];
    for (const item of items) {
      const product = productById.get(item.productId);
      if (!product) continue;
      result.push({ ...item, product, lineTotal: product.price * item.quantity });
    }
    return result;
  }, [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      add: addToCart,
      remove: removeFromCart,
      setQuantity: updateCartQuantity,
      clear: clearCart,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
    }),
    [
      lines,
      count,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
