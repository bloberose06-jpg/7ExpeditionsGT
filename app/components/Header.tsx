"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#expediciones", label: "Expediciones" },
  { href: "#calendario", label: "Calendario" }, // <-- Agregado aquí de manera centralizada
  { href: "#galeria", label: "Galería" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#reservar", label: "Reservar" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[var(--basalt)]/90 backdrop-blur border-b border-[var(--ceniza-line)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-18 py-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 22L11 8L14.5 14.5L17 10L24 22H4Z" fill="var(--lava)" />
            <circle cx="17.2" cy="9.4" r="1.4" className="ember" fill="var(--sulfuro)" />
          </svg>
          <span className="font-display text-xl tracking-wide text-[var(--bruma)] uppercase">
            7 Expeditions <span className="text-[var(--lava)]">GT</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma-dim)] hover:text-[var(--sulfuro)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="rounded-sm bg-[var(--lava)] hover:bg-[var(--lava-bright)] transition-colors px-4 py-2 font-display text-sm uppercase tracking-wide text-[var(--bruma)]"
          >
            Reservar cupo
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="md:hidden text-[var(--bruma)] p-2"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--basalt)] border-t border-[var(--ceniza-line)] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl uppercase text-[var(--bruma)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
