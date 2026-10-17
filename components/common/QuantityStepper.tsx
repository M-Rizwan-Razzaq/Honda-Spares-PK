"use client";

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="p-2.5 text-charcoal transition-colors hover:text-honda disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span
        aria-live="polite"
        className="price-num w-10 text-center text-sm font-bold text-ink"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="p-2.5 text-charcoal transition-colors hover:text-honda disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
