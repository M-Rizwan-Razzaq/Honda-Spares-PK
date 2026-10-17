import { siteConfig, whatsappDigits } from "@/config/site";
import type { CartLine, CustomerDetails } from "@/types/cart";
import type { Product } from "@/types/product";
import { formatCurrency } from "./formatCurrency";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export function buildGeneralInquiryMessage(): string {
  return siteConfig.whatsappGreeting;
}

export function buildProductInquiryMessage(product: Product): string {
  const lines = [
    `Assalam-o-Alaikum! I would like to ask about a spare part from ${siteConfig.name}.`,
    "",
    `*${product.name}*`,
    `Part no.: ${product.partNumber ?? "Not listed"}`,
    `Price: ${formatCurrency(product.price)} (catalog sample data)`,
    `Fits: ${
      product.fitsUniversal
        ? "Universal fit (please confirm for my model)"
        : product.models.join(", ")
    }`,
    "",
    "Could you please confirm availability, fitment for my motorcycle, and delivery details?",
  ];
  return lines.join("\n");
}

export function buildCartOrderMessage(
  lines: CartLine[],
  customer: CustomerDetails,
): string {
  const itemRows = lines.map(
    (line, index) =>
      `${index + 1}. ${line.product.name}\n` +
      `   ${line.quantity} x ${formatCurrency(line.product.price)} = ${formatCurrency(line.lineTotal)}` +
      (line.product.partNumber ? `\n   Part no.: ${line.product.partNumber}` : ""),
  );

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  const parts = [
    `Assalam-o-Alaikum! I would like to place an order request from ${siteConfig.name}.`,
    "",
    "*Order request:*",
    ...itemRows,
    "",
    `*Subtotal:* ${formatCurrency(subtotal)}`,
    "(Delivery charges and final total to be confirmed)",
    "",
    "*Customer details:*",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `City: ${customer.city}`,
    customer.address.trim() ? `Address: ${customer.address.trim()}` : null,
    "",
    "Please confirm stock, fitment, delivery charges and final price. I understand this is an order request until confirmed.",
  ];

  return parts.filter((part): part is string => part !== null).join("\n");
}
