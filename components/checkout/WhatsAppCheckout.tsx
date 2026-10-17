"use client";

import { CheckCircle2, ClipboardCopy, MessageCircle, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { formatCurrency } from "@/lib/formatCurrency";
import { buildCartOrderMessage, buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";
import type { CartLine, CustomerDetails } from "@/types/cart";

type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

const emptyForm: CustomerDetails = { name: "", phone: "", city: "", address: "" };

function validate(form: CustomerDetails): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  const digits = form.phone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Enter a valid phone number, e.g. 0300 1234567.";
  }
  if (form.city.trim().length < 2) {
    errors.city = "Please enter your delivery city.";
  }
  return errors;
}

export function WhatsAppCheckout() {
  const { lines, subtotal, count, isCheckoutOpen, closeCheckout } = useCart();

  return (
    <Modal open={isCheckoutOpen} onClose={closeCheckout} title="WhatsApp order request">
      <CheckoutPanel
        lines={lines}
        subtotal={subtotal}
        count={count}
        onClose={closeCheckout}
      />
    </Modal>
  );
}

interface CheckoutPanelProps {
  lines: CartLine[];
  subtotal: number;
  count: number;
  onClose: () => void;
}

function CheckoutPanel({ lines, subtotal, count, onClose }: CheckoutPanelProps) {
  const [form, setForm] = useState<CustomerDetails>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildCartOrderMessage(lines, form);
    setSentMessage(message);
    openWhatsApp(message);
  };

  const copyMessage = async () => {
    if (!sentMessage) return;
    try {
      await navigator.clipboard.writeText(sentMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const fieldClasses = (hasError: boolean) =>
    `w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink transition-colors focus:outline-none ${
      hasError
        ? "border-honda bg-honda-soft focus:border-honda"
        : "border-gray-200 bg-surface focus:border-honda focus:bg-white"
    }`;

  if (sentMessage) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-whatsapp" aria-hidden />
        <h3 className="text-xl font-extrabold text-ink">Order request prepared</h3>
        <p className="max-w-md text-sm leading-relaxed text-charcoal-soft">
          WhatsApp should have opened in a new tab with your order summary. If it did not, use the
          buttons below. This is an order request — our team will confirm stock, fitment, delivery
          and the final price in the chat.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a
            href={buildWhatsAppUrl(sentMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Open WhatsApp again
          </a>
          <button
            type="button"
            onClick={copyMessage}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            <ClipboardCopy className="h-4 w-4" aria-hidden />
            {copied ? "Copied!" : "Copy message"}
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-1 text-xs font-bold text-charcoal-soft underline-offset-2 hover:text-honda hover:underline"
        >
          Back to browsing
        </button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <ShoppingBag className="h-10 w-10 text-charcoal-soft" aria-hidden />
        <h3 className="text-lg font-extrabold text-ink">Your cart is empty</h3>
        <p className="max-w-xs text-sm text-charcoal-soft">
          Add parts to your cart before sending an order request.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 rounded-xl bg-honda px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-honda-dark"
        >
          Browse parts
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5 sm:px-6" noValidate>
      <div className="rounded-xl border border-gray-200 bg-surface px-4 py-3">
        <p className="text-xs font-bold tracking-wide text-charcoal-soft uppercase">Order summary</p>
        <ul className="mt-2 space-y-1.5">
          {lines.map((line) => (
            <li key={line.productId} className="flex justify-between gap-3 text-sm">
              <span className="text-charcoal">
                {line.product.name}{" "}
                <span className="price-num font-bold text-ink">× {line.quantity}</span>
              </span>
              <span className="price-num font-bold text-ink">
                {formatCurrency(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-sm font-extrabold">
          <span>Subtotal ({count} items)</span>
          <span className="price-num">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="checkout-name" className="text-xs font-bold text-charcoal">
            Full name <span aria-hidden>*</span>
          </label>
          <input
            id="checkout-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "checkout-name-error" : undefined}
            className={`mt-1.5 ${fieldClasses(Boolean(errors.name))}`}
            placeholder="e.g. Ahmed Raza"
          />
          {errors.name && (
            <p id="checkout-name-error" role="alert" className="mt-1 text-xs font-semibold text-honda">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="checkout-phone" className="text-xs font-bold text-charcoal">
            Phone number <span aria-hidden>*</span>
          </label>
          <input
            id="checkout-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
            className={`mt-1.5 ${fieldClasses(Boolean(errors.phone))}`}
            placeholder="0300 1234567"
          />
          {errors.phone && (
            <p id="checkout-phone-error" role="alert" className="mt-1 text-xs font-semibold text-honda">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="checkout-city" className="text-xs font-bold text-charcoal">
            Delivery city <span aria-hidden>*</span>
          </label>
          <input
            id="checkout-city"
            type="text"
            autoComplete="address-level2"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "checkout-city-error" : undefined}
            className={`mt-1.5 ${fieldClasses(Boolean(errors.city))}`}
            placeholder="e.g. Lahore"
          />
          {errors.city && (
            <p id="checkout-city-error" role="alert" className="mt-1 text-xs font-semibold text-honda">
              {errors.city}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="checkout-address" className="text-xs font-bold text-charcoal">
            Delivery address <span className="font-medium text-charcoal-soft">(optional)</span>
          </label>
          <textarea
            id="checkout-address"
            rows={3}
            autoComplete="street-address"
            value={form.address}
            onChange={(event) => updateField("address", event.target.value)}
            className={`mt-1.5 ${fieldClasses(false)}`}
            placeholder="Shop / street address, area, landmark"
          />
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        This sends an <strong>order request</strong> on WhatsApp. Your order is not confirmed until
        our team verifies stock, fitment, delivery charges and the final price.
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-whatsapp-dark"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        Send order request on WhatsApp
      </button>
    </form>
  );
}
