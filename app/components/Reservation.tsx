"use client";

import React from "react";

// Haciendo params opcional con '?' se resuelve el error de Vercel/TypeScript
interface ReservationProps {
  params?: Promise<{ locale?: string; slug?: string }>;
}

export default function Reservation({ params }: ReservationProps = {}) {
  return (
    <section id="reservation" className="py-20 bg-[var(--basalt)] text-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display uppercase text-3xl md:text-5xl text-[var(--lava-bright)] mb-4">
          Reserva tu Expedición
        </h2>
        <p className="text-[var(--bruma-dim)] mb-8 max-w-xl mx-auto">
          ¿Listo para la aventura? Completa el formulario a continuación o contáctanos directamente para asegurar tu cupo.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--bruma-dim)] mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              required
              className="w-full bg-[var(--basalt-2)] border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-[var(--lava-bright)]"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[var(--bruma-dim)] mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full bg-[var(--basalt-2)] border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-[var(--lava-bright)]"
              placeholder="tu@email.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono uppercase text-[var(--bruma-dim)] mb-2">
              Mensaje / Detalle de Reserva
            </label>
            <textarea
              rows={4}
              required
              className="w-full bg-[var(--basalt-2)] border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-[var(--lava-bright)]"
              placeholder="Indícanos la fecha deseada, número de personas o cualquier duda..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--lava-bright)] hover:bg-red-600 text-white font-mono uppercase tracking-wider text-sm transition-colors rounded"
            >
              Enviar Reserva
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
