"use client";

import { MessageCircle } from "lucide-react";
import { buildGeneralInquiryMessage, openWhatsApp } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export function WhatsAppButton() {
  return (
    <button
      type="button"
      onClick={() => openWhatsApp(buildGeneralInquiryMessage())}
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      className="fixed right-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 hover:bg-whatsapp-dark sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </button>
  );
}
