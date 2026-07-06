import VolcanoProfile from "./VolcanoProfile";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-16 md:pt-44 md:pb-20 px-6 lg:px-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, var(--basalt-2) 0%, var(--basalt) 60%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--lava-bright)] mb-5">
          Expediciones guiadas · Guatemala
        </p>
        <h1
          className="reveal font-display uppercase leading-[0.92] text-[var(--bruma)]"
          style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", animationDelay: "0.05s" }}
        >
          Guatemala
          <br />
           . <span className="text-[var(--lava)]">TIERRA DE FUEGO.</span>
        </h1>
        <p
          className="reveal mt-6 max-w-xl text-base md:text-lg text-[var(--bruma-dim)] font-medium"
          style={{ animationDelay: "0.15s" }}
        >
          Siete volcanes, un país. Ascensos guiados a Acatenango, Pacaya, Agua,
          Atitlán y más — con guías locales certificados, grupos pequeños y el
          Fuego iluminando la noche.
        </p>

        <div className="reveal mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.25s" }}>
          <a
            href="#reservar"
            className="rounded-sm bg-[var(--lava)] hover:bg-[var(--lava-bright)] transition-colors px-6 py-3 font-display text-base uppercase tracking-wide text-[var(--bruma)]"
          >
            Reservar mi expedición
          </a>
          <a
            href="#expediciones"
            className="rounded-sm border border-[var(--ceniza-line)] hover:border-[var(--sulfuro)] transition-colors px-6 py-3 font-display text-base uppercase tracking-wide text-[var(--bruma)]"
          >
            Ver los 7 volcanes
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-16 md:mt-24 reveal" style={{ animationDelay: "0.35s" }}>
        <VolcanoProfile />
      </div>
    </section>
  );
}
