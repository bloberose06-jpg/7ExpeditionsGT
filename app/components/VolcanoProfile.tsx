"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation"; // ajusta el alias si tu archivo está en otra ruta
import { useTranslations } from "next-intl";
import { volcanoes, maxElevation } from "../data/volcanoes";

// ...VIEW_W, VIEW_H, BASE_Y, GAP, peakHeight igual que antes...

export default function VolcanoProfile() {
  const t = useTranslations("volcanoProfile");
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative w-full select-none">
      <svg /* ...igual... */>
        {/* ...líneas de referencia igual... */}

        {volcanoes.map((v, i) => {
          const cx = GAP * i + GAP / 2;
          const h = peakHeight(v.elevation);
          const width = GAP * 0.82;
          const isActive = active === v.slug;
          return (
            <g
              key={v.slug}
              onMouseEnter={() => setActive(v.slug)}
              onMouseLeave={() => setActive(null)}
              onClick={() => router.push(`/volcanoes/${v.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") router.push(`/volcanoes/${v.slug}`);
              }}
              className="cursor-pointer"
            >
              {/* ...polygon, circle (ember), texts igual que antes... */}
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bruma-dim)]">
        {t("hint")}
      </p>
    </div>
  );
}
