"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale: "es" | "en") {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
      <button
        onClick={() => switchTo("es")}
        className={
          locale === "es"
            ? "text-[var(--lava-bright)]"
            : "text-white/50 hover:text-white transition-colors"
        }
      >
        ES
      </button>
      <span className="text-white/30">/</span>
      <button
        onClick={() => switchTo("en")}
        className={
          locale === "en"
            ? "text-[var(--lava-bright)]"
            : "text-white/50 hover:text-white transition-colors"
        }
      >
        EN
      </button>
    </div>
  );
}
