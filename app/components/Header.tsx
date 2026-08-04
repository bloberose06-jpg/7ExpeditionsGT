"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl"; // 👈 Agrega useLocale
import Link from "next/link"; // 👈 Agrega Link
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale(); // 👈 Obtén el idioma actual
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Modifica los links para que apunten a la raíz del locale con su hash correspondiente
  const links = [
    { href: `/${locale}#expediciones`, label: t("navExpediciones") },
    { href: `/${locale}#calendario`, label: t("navCalendario") },
    { href: `/${locale}#galeria`, label: t("navGaleria") },
    { href: `/${locale}#nosotros`, label: t("navNosotros") },
    { href: `/${locale}#reservar`, label: t("navReservar") },
  ];

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
        
        {/* ❌ ANTES: <a href="#top" className="..."> */}
        {/* ✅ AHORA: Apunta a /es o /en para volver a la Home */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 22L11 8L14.5 14.5L17 10L24 22H4Z" fill="var(--lava)" />
            <circle cx="17.2" cy="9.4" r="1.4" className="ember" fill="var(--sulfuro)" />
          </svg>
          <span className="font-display text-xl tracking-wide text-[var(--bruma)] uppercase">
            7 Expeditions <span className="text-[var(--lava)]">GT</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma-dim)] hover:text-[var(--sulfuro)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${locale}#reservar`}
            className="rounded-sm bg-[var(--lava)] hover:bg-[var(--lava-bright)] transition-colors px-4 py-2 font-display text-sm uppercase tracking-wide text-[var(--bruma)]"
          >
            {t("cta")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* ... Resto del menú móvil ... */}
