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
            <li>WhatsApp: +502 3618 1268</li>
            <li>viajesguateasociados@gmail.com</li>
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

      {/* Métodos de Pago Aceptados */}
      <div className="mx-auto max-w-6xl mt-10 pt-6 border-t border-[var(--ceniza-line)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bruma-dim)]">
            Métodos de pago aceptados
          </p>
          <div className="flex flex-wrap gap-2 text-white/60 font-mono text-[11px]">
            {/* PayPal */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v2H4V6zm0 12v-6h16v6H4z"/>
              </svg>
              PayPal
            </span>

            {/* Payoneer */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
              Payoneer
            </span>

            {/* Airtm */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Airtm
            </span>

            {/* Binance / Criptomonedas General */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 text-[var(--sulfuro)] border-[var(--sulfuro)]/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Binance Pay / Crypto
            </span>

            {/* Bitcoin */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12h9a3 3 0 0 0 0-6H6v6zm0 6h10a3 3 0 0 0 0-6H6v6z" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="12" y1="3" x2="12" y2="21" />
              </svg>
              Bitcoin (BTC)
            </span>

            {/* Solana */}
            <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16l-4 4H0zM24 14H8l-4 4h16zM0 10h16l4-4H4z" />
              </svg>
              Solana (SOL)
            </span>
          </div>
        </div>

        {/* Términos y Copyright */}
        <div className="flex flex-col gap-1 text-left lg:text-right mt-4 lg:mt-0">
          <p className="font-mono text-[11px] text-[var(--bruma-dim)]">
            © {new Date().getFullYear()} 7 Expeditions GT. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px] text-[var(--bruma-dim)]">
            Rutas sujetas a condiciones climáticas y actividad volcánica.
          </p>
        </div>
      </div>
    </footer>
  );
}
