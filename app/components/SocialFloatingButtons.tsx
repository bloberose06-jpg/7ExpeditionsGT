"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function SocialFloatingButtons() {
  const t = useTranslations("social");
  const phoneNumber = "50236181268";

  // Pre-filled message localized automatically
  const message = encodeURIComponent(t("waReferralMessage"));

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const instagramUrl = "https://instagram.com/7expeditionsgt";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Instagram Button */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="group flex items-center gap-2 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-full p-1.5 pr-4 shadow-lg hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <span className="text-xs font-semibold whitespace-nowrap">
          {t("instagramLabel")}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group flex items-center gap-2 bg-[#25D366] text-white rounded-full p-1.5 pr-4 shadow-lg hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
        <span className="text-xs font-semibold whitespace-nowrap">
          {t("whatsappLabel")}
        </span>
      </a>
    </div>
  );
}
