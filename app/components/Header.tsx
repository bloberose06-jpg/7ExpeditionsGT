"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { target: "expediciones", label: t("navExpediciones") },
    { target: "calendario", label: t("navCalendario") },
    { target: "galeria", label: t("navGaleria") },
    { target: "nosotros", label: t("navNosotros") },
    { target: "reservar", label: t("navReservar") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Función inteligente para manejar el scroll/navegación
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setOpen(false);

    const isHome = pathname === `/${locale}` || pathname === "/";

    if (isHome) {
      // Si ya estamos en la Home, hacemos scroll directo a la sección
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Si estamos en otra subruta (ej: /volcanoes/acatenango), redirigimos a la Home con el hash
      router.push(`/${locale}#${target}`);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--basalt)]/90 backdrop-blur border-b border-[var(--ceniza-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-18 py-4">
        
        {/* Logo / Inicio */}
        <a
          href={`/${locale}`}
          onClick={(e) => handleNav(e, "top")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M4 22L11 8L14.5 14.5L17 10L24 22H4Z" fill="var(--lava)" />
            <circle cx="17.2" cy="9.4" r="1.4" className="ember" fill="var(--sulfuro)" />
          </svg>
          <span className="font-display text-xl tracking-wide text-[var(--bruma)] uppercase">
            7 Expeditions <span className="text-[var(--lava)]">GT</span>
          </span>
        </a>

        {/* Menú Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.target}
              href={`/${locale}#${l.target}`}
              onClick={(e) => handleNav(e, l.target)}
              className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--bruma-dim)] hover:text-[var(--sulfuro)] transition-colors cursor-pointer"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`/${locale}#reservar`}
            onClick={(e) => handleNav(e, "reservar")}
            className="rounded-sm bg-[var(--lava)] hover:bg-[var(--lava-bright)] transition-colors px-4 py-2 font-display text-sm uppercase tracking-wide text-[var(--bruma)] cursor-pointer"
          >
            {t("cta")}
          </a>
          <LanguageSwitcher />
        </nav>

        {/* Botón Móvil */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="text-[var(--bruma)] p-2"
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
      </div>

      {/* Menú Desplegable Móvil */}
      {open && (
        <div className="md:hidden bg-[var(--basalt)] border-t border-[var(--ceniza-line)] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.target}
              href={`/${locale}#${l.target}`}
              onClick={(e) => handleNav(e, l.target)}
              className="font-display text-2xl uppercase text-[var(--bruma)] cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
