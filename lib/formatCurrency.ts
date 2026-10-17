import { siteConfig } from "@/config/site";

const formatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return `${siteConfig.currency.symbol} ${formatter.format(Math.round(amount))}`;
}
