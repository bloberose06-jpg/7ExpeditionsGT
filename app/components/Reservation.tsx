"use client";

import { useEffect, useState } from "react";
import { volcanoes } from "../data/volcanoes";

// TODO: reemplazá estos dos valores con los datos reales del negocio.
const WHATSAPP_NUMBER = "50212345678"; // formato: código de país + número, sin +, sin espacios
const CONTACT_EMAIL = "reservas@7expeditionsgt.com";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tour: volcanoes[1].name, // Acatenango por defecto
    date: "",
    people: "2",
    message: "",
  });

  // Si el visitante viene de un botón "Reservar →" de una tarjeta de tour,
  // preseleccionamos ese volcán automáticamente.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(".reservar-link");
      if (target?.dataset.tour) {
        setForm((f) => ({ ...f, tour: target.dataset.tour as string }));
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildMessage = () =>
    [
      `Hola, quiero reservar una expedición con 7 Expeditions GT.`,
      ``,
      `Volcán: ${form.tour}`,
      `Fecha deseada: ${form.date || "por confirmar"}`,
      `Número de personas: ${form.people}`,
      `Nombre: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Teléfono: ${form.phone || "-"}`,
      form.message ? `Mensaje: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const isValid = form.name.trim() && (form.email.trim() || form.phone.trim());

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Reservación · ${form.tour}`
  )}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <section id="reservar" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
          Último paso antes de subir
        </p>
        <h2 className="font-display uppercase text-[var(--bruma)] mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
          Reservá tu expedición
        </h2>
        <p className="text-[var(--bruma-dim)] max-w-xl mb-10">
          Completá el formulario y enviá tu solicitud directo por WhatsApp o
          correo. Un guía te confirma disponibilidad en menos de 24 horas.
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[var(--ceniza)] border border-[var(--ceniza-line)] rounded-sm p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label="Nombre completo" required>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Tu nombre"
              className="field-input"
            />
          </Field>

          <Field label="Volcán">
            <select value={form.tour} onChange={update("tour")} className="field-input">
              {volcanoes.map((v) => (
                <option key={v.slug} value={v.name}>
                  {v.name} · {v.elevation.toLocaleString()} m
                </option>
              ))}
            </select>
          </Field>

          <Field label="Correo electrónico">
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="vos@correo.com"
              className="field-input"
            />
          </Field>

          <Field label="Teléfono / WhatsApp">
            <input
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+502 ..."
              className="field-input"
            />
          </Field>

          <Field label="Fecha deseada">
            <input type="date" value={form.date} onChange={update("date")} className="field-input" />
          </Field>

          <Field label="Número de personas">
            <input
              type="number"
              min={1}
              max={20}
              value={form.people}
              onChange={update("people")}
              className="field-input"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Mensaje (opcional)">
              <textarea
                rows={3}
                value={form.message}
                onChange={update("message")}
                placeholder="Alergias, nivel de condición física, equipo que necesitás rentar…"
                className="field-input resize-none"
              />
            </Field>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={isValid ? whatsappHref : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isValid}
              onClick={(e) => !isValid && e.preventDefault()}
              className={`flex-1 text-center rounded-sm px-6 py-3.5 font-display text-base uppercase tracking-wide transition-colors ${
                isValid
                  ? "bg-[var(--lava)] hover:bg-[var(--lava-bright)] text-[var(--bruma)] cursor-pointer"
                  : "bg-[var(--ceniza-line)] text-[var(--bruma-dim)] cursor-not-allowed"
              }`}
            >
              Enviar por WhatsApp
            </a>
            <a
              href={isValid ? mailHref : undefined}
              aria-disabled={!isValid}
              onClick={(e) => !isValid && e.preventDefault()}
              className={`flex-1 text-center rounded-sm px-6 py-3.5 font-display text-base uppercase tracking-wide border transition-colors ${
                isValid
                  ? "border-[var(--sulfuro)] text-[var(--bruma)] hover:bg-[var(--sulfuro)] hover:text-[var(--basalt)] cursor-pointer"
                  : "border-[var(--ceniza-line)] text-[var(--bruma-dim)] cursor-not-allowed"
              }`}
            >
              Enviar por correo
            </a>
          </div>
          {!isValid && (
            <p className="md:col-span-2 font-mono text-[11px] text-[var(--bruma-dim)]">
              Completá tu nombre y al menos un correo o teléfono para habilitar el envío.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--bruma-dim)]">
        {label}
        {required && <span className="text-[var(--lava)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
