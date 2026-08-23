"use client";

import React from "react";

export default function SocialFloatingButtons() {
  const phoneNumber = "50236181268";
  
  // Mensaje que indica claramente el origen de la consulta
  const message = encodeURIComponent(
    "¡Hola! Vengo desde la página web 7expeditionsguatemala.com y me gustaría solicitar más información o hacer una reserva."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const instagramUrl = "https://instagram.com/7expeditionsgt";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Botón de Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <svg
          width="24"
          height="24"
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
      </a>

      {/* Botón de WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full text-white shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
    </div>
  );
}
