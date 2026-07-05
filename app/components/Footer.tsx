export default function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-14 bg-[var(--basalt-2)] border-t border-[var(--ceniza-line)]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-xl uppercase text-[var(--bruma)]">
            7 Expeditions <span className="text-[var(--lava)]">GT</span>
          </span>
          <p className="mt-3 text-sm text-[var(--bruma-dim)] max-w-xs">
            Expediciones guiadas a los volcanes de Guatemala. Antigua Guatemala
            y Ciudad de Guatemala.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bruma-dim)] mb-3">
            Contacto
          </p>
          <ul className="space-y-1.5 text-sm text-[var(--bruma)]">
            {/* TODO: actualizá con los datos reales del negocio */}
            <li>WhatsApp: +502 1234 5678</li>
            <li>reservas@7expeditionsgt.com</li>
            <li>Antigua Guatemala, Sacatepéquez</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bruma-dim)] mb-3">
            Navegación
          </p>
          <ul className="space-y-1.5 text-sm">
            <li><a href="#expediciones" className="text-[var(--bruma-dim)] hover:text-[var(--sulfuro)]">Expediciones</a></li>
            <li><a href="#galeria" className="text-[var(--bruma-dim)] hover:text-[var(--sulfuro)]">Galería</a></li>
            <li><a href="#nosotros" className="text-[var(--bruma-dim)] hover:text-[var(--sulfuro)]">Nosotros</a></li>
            <li><a href="#reservar" className="text-[var(--bruma-dim)] hover:text-[var(--sulfuro)]">Reservar</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-[var(--ceniza-line)] flex flex-col sm:flex-row justify-between gap-2">
        <p className="font-mono text-[11px] text-[var(--bruma-dim)]">
          © {new Date().getFullYear()} 7 Expeditions GT. Todos los derechos reservados.
        </p>
        <p className="font-mono text-[11px] text-[var(--bruma-dim)]">
          Rutas sujetas a condiciones climáticas y actividad volcánica.
        </p>
      </div>
    </footer>
  );
}
