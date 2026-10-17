"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink transition-colors hover:text-honda sm:px-6"
              >
                {item.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-charcoal-soft transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-charcoal-soft sm:px-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
