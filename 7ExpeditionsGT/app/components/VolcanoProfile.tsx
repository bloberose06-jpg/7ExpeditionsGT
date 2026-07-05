"use client";

import { useState } from "react";
import { volcanoes, maxElevation } from "../data/volcanoes";

const VIEW_W = 1200;
const VIEW_H = 340;
const BASE_Y = 300;
const GAP = VIEW_W / volcanoes.length;

function peakHeight(elevation: number) {
  const min = 90;
  const max = 250;
  return min + ((elevation - 2500) / (maxElevation - 2500)) * (max - min);
}

export default function VolcanoProfile() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative w-full select-none">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Perfil de elevación de los volcanes de Guatemala, de mayor a menor altura"
      >
        {/* líneas de referencia de altitud */}
        {[1000, 2000, 3000, 4000].map((m) => {
          const y = BASE_Y - peakHeight(m);
          return (
            <g key={m}>
              <line x1={0} x2={VIEW_W} y1={y} y2={y} stroke="var(--ceniza-line)" strokeWidth={1} strokeDasharray="2 6" />
              <text x={4} y={y - 6} className="font-mono" fontSize="11" fill="var(--bruma-dim)">
                {m.toLocaleString()} m
              </text>
            </g>
          );
        })}

        <line x1={0} x2={VIEW_W} y1={BASE_Y} y2={BASE_Y} stroke="var(--ceniza-line)" strokeWidth={1.5} />

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
              onClick={() => {
                document.getElementById(v.slug)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="cursor-pointer"
            >
              <polygon
                points={`${cx - width / 2},${BASE_Y} ${cx},${BASE_Y - h} ${cx + width / 2},${BASE_Y}`}
                fill={isActive ? "var(--lava)" : "var(--ceniza)"}
                stroke="var(--ceniza-line)"
                strokeWidth={1}
                style={{ transition: "fill 0.25s ease" }}
              />
              {v.active && (
                <circle
                  cx={cx}
                  cy={BASE_Y - h + 6}
                  r={4}
                  fill="var(--sulfuro)"
                  className="ember"
                />
              )}
              <text
                x={cx}
                y={BASE_Y + 22}
                textAnchor="middle"
                className="font-display uppercase"
                fontSize="15"
                fill={isActive ? "var(--sulfuro)" : "var(--bruma)"}
                style={{ transition: "fill 0.25s ease" }}
              >
                {v.name.split(" ")[0]}
              </text>
              <text
                x={cx}
                y={BASE_Y + 38}
                textAnchor="middle"
                className="font-mono"
                fontSize="10.5"
                fill="var(--bruma-dim)"
              >
                {v.elevation.toLocaleString()} m
              </text>
            </g>
          );
        })}
      </svg>

      <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bruma-dim)]">
        Tocá un volcán para ver su expedición ↓
      </p>
    </div>
  );
}
