"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { formatCurrency } from "@/lib/formatCurrency";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const router = useRouter();
  const {
    lines,
    count,
    subtotal,
    isCartOpen,
    closeCart,
    setQuantity,
    remove,
    clear,
    openCheckout,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <Modal
      open={isCartOpen}
      onClose={closeCart}
      title={`Your cart (${count} item${count === 1 ? "" : "s"})`}
      variant="drawer"
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <ShoppingBag className="h-10 w-10 text-charcoal-soft" aria-hidden />
          <h3 className="text-lg font-extrabold text-ink">Your cart is empty</h3>
          <p className="max-w-xs text-sm leading-relaxed text-charcoal-soft">
            Browse the catalogue and add the parts you need. Your cart is saved on this device.
          </p>
          <button
            type="button"
            onClick={() => {
              closeCart();
              router.push("/shop");
            }}
            className="mt-2 rounded-xl bg-honda px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-honda-dark"
          >
            Browse spare parts
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-gray-100 px-5">
            {lines.map((line) => (
              <li key={line.productId} className="flex gap-4 py-4">
                <Image
                  src={line.product.image}
                  alt={`Placeholder illustration for ${line.product.name}`}
                  width={96}
                  height={96}
                  className="h-20 w-20 shrink-0 rounded-xl border border-gray-200 bg-surface object-cover"
                />
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm leading-snug font-bold text-ink">{line.product.name}</h3>
                    <button
                      type="button"
                      onClick={() => remove(line.productId)}
                      aria-label={`Remove ${line.product.name} from cart`}
                      className="rounded-lg p-1.5 text-charcoal-soft transition-colors hover:bg-honda-soft hover:text-honda"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  {line.product.partNumber && (
                    <p className="price-num text-[11px] font-semibold text-charcoal-soft">
                      {line.product.partNumber}
                    </p>
                  )}
                  <p className="price-num text-xs font-semibold text-charcoal-soft">
                    {formatCurrency(line.product.price)} each
                  </p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <QuantityStepper
                      value={line.quantity}
                      onChange={(value) => setQuantity(line.productId, value)}
                      label={`Quantity for ${line.product.name}`}
                    />
                    <p className="price-num text-sm font-extrabold text-ink">
                      {formatCurrency(line.lineTotal)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-3 border-t border-gray-200 bg-surface px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-charcoal">Subtotal</span>
              <span className="price-num text-xl font-extrabold text-ink">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-charcoal-soft">
              Subtotal only. Delivery charges and final price are confirmed on WhatsApp after
              stock and fitment are reviewed.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Order on WhatsApp
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:border-ink"
              >
                Continue shopping
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={clear}
                className="rounded-xl px-3 py-2.5 text-xs font-bold text-charcoal underline-offset-2 transition-colors hover:text-honda hover:underline"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
