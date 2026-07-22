"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { volcanoes } from "../data/volcanoes";

// TODO: reemplazá estos dos valores con los datos reales del negocio.
const WHATSAPP_NUMBER = "50236181268"; // formato: código de país + número, sin +, sin espacios
const CONTACT_EMAIL = "viajesguateasociados@gmail.com";

// URL del Google Apps Script que guarda la reserva en Sheets y envía el correo.
// Se configura en .env.local / variables de entorno de Vercel:
// NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
const SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT || "";

export default function Reservation() {
  const t = useTranslations("reservation");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tour: volcanoes[1].name, // Acatenango por defecto
    date: "",
    people: "2",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Envía los datos del formulario al Google Apps Script, que los guarda en
  // Sheets y le manda un correo de aviso al negocio. Se dispara ANTES de
  // abrir WhatsApp o el correo, para que la reserva quede guardada sin
  // depender de que el cliente confirme el envío del mensaje.
  const saveToSheet = async () => {
    if (!SHEETS_ENDPOINT) {
      // Si no está configurado el endpoint, no bloqueamos el flujo actual.
      console.warn("NEXT_PUBLIC_SHEETS_ENDPOINT no está configurado; la reserva no se guardó en Sheets.");
      return;
    }
    try {
      setStatus("sending");
      // mode: "no-cors" + Content-Type text/plain evita el preflight que
      // Google Apps Script no maneja bien. No podemos leer la respuesta,
      // pero no la necesitamos: solo nos interesa que el POST se dispare.
      await fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      });
      setStatus("sent");
    } catch (err) {
      console.error("Error guardando la reserva en Sheets:", err);
      setStatus("error");
    }
  };

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
      t("waMessageIntro"),
      ``,
      `${t("waVolcano")}: ${form.tour}`,
      `${t("waDate")}: ${form.date || t("waDateFallback")}`,
      `${t("waPeople")}: ${form.people}`,
      `${t("waName")}: ${form.name || "-"}`,
      `${t("waEmail")}: ${form.email || "-"}`,
      `${t("waPhone")}: ${form.phone || "-"}`,
      form.message ? `${t("waMessage")}: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const isValid = form.name.trim() && (form.email.trim() || form.phone.trim());

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    t("emailSubject", { tour: form.tour })
  )}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <section id="reservar" className="px-6 lg:px-10 py-24 md:py-32 bg-[var(--basalt)]">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-3">
          {t("eyebrow")}
        </p>
        <h2 className="font-display uppercase text-[var(--bruma)] mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
          {t("title")}
        </h2>
        <p className="text-[var(--bruma-dim)] max-w-xl mb-10">
          {t("description")}
        </p>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[var(--ceniza)] border border-[var(--ceniza-line)] rounded-sm p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <Field label={t("labelName")} required>
            <input
              required
              value={form.name}
              onChange={update("name")}
              placeholder={t("placeholderName")}
              className="field-input"
            />
          </Field>

          <Field label={t("labelTour")}>
            <select value={form.tour} onChange={update("tour")} className="field-input">
              {volcanoes.map((v) => (
                <option key={v.slug} value={v.name}>
                  {v.name} · {v.elevation.toLocaleString()} m
                </option>
              ))}
            </select>
          </Field>

          <Field label={t("labelEmail")}>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder={t("placeholderEmail")}
              className="field-input"
            />
          </Field>

          <Field label={t("labelPhone")}>
            <input
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder={t("placeholderPhone")}
              className="field-input"
            />
          </Field>

          <Field label={t("labelDate")}>
            <input type="date" value={form.date} onChange={update("date")} className="field-input" />
          </Field>

          <Field label={t("labelPeople")}>
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
            <Field label={t("labelMessage")}>
              <textarea
                rows={3}
                value={form.message}
                onChange={update("message")}
                placeholder={t("placeholderMessage")}
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
              onClick={async (e) => {
                if (!isValid) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                await saveToSheet();
                window.open(whatsappHref, "_blank", "noopener,noreferrer");
              }}
              className={`flex-1 text-center rounded-sm px-6 py-3.5 font-display text-base uppercase tracking-wide transition-colors ${
                isValid
                  ? "bg-[var(--lava)] hover:bg-[var(--lava-bright)] text-[var(--bruma)] cursor-pointer"
                  : "bg-[var(--ceniza-line)] text-[var(--bruma-dim)] cursor-not-allowed"
              }`}
            >
              {t("sendWhatsapp")}
            </a>
            <a
              href={isValid ? mailHref : undefined}
              aria-disabled={!isValid}
              onClick={async (e) => {
                if (!isValid) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                await saveToSheet();
                window.location.href = mailHref;
              }}
              className={`flex-1 text-center rounded-sm px-6 py-3.5 font-display text-base uppercase tracking-wide border transition-colors ${
                isValid
                  ? "border-[var(--sulfuro)] text-[var(--bruma)] hover:bg-[var(--sulfuro)] hover:text-[var(--basalt)] cursor-pointer"
                  : "border-[var(--ceniza-line)] text-[var(--bruma-dim)] cursor-not-allowed"
              }`}
            >
              {t("sendEmail")}
            </a>
          </div>
          {status === "sending" && (
            <p className="md:col-span-2 font-mono text-[11px] text-[var(--lava-bright)]">
              Guardando tu reserva…
            </p>
          )}
          {status === "sent" && (
            <p className="md:col-span-2 font-mono text-[11px] text-[var(--lava-bright)]">
              ✓ Reserva guardada. Abriendo WhatsApp/correo…
            </p>
          )}
          {status === "error" && (
            <p className="md:col-span-2 font-mono text-[11px] text-red-400">
              No pudimos guardar la reserva automáticamente, pero tu mensaje se envía igual.
            </p>
          )}
          {!isValid && (
            <p className="md:col-span-2 font-mono text-[11px] text-[var(--bruma-dim)]">
              {t("validationHint")}
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
