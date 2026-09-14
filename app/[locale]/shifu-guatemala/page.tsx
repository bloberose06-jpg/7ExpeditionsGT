
import Header from "../../components/Header";


const moments = [
  {
    number: "01",
    place: "ANTIGUA GUATEMALA",
    title: "El comienzo",
    description:
      "Shifu comienza su aventura caminando por las calles empedradas de Antigua Guatemala. Entre arquitectura colonial, volcanes y el famoso Arco de Santa Catalina, descubre el carácter histórico de Guatemala.",
    quote:
      "Un buen viaje comienza cuando uno deja de saber exactamente qué encontrará.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20-%20Santa%20Catalina%20Arch.jpg",
  },
  {
    number: "02",
    place: "VOLCÁN ACATENANGO",
    title: "Frente al volcán",
    description:
      "La tranquilidad queda atrás. Shifu emprende el ascenso hacia el Volcán Acatenango. Cada paso lo acerca a una de las vistas más impresionantes del país.",
    quote: "La paciencia también es una forma de fuerza.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Volcan%20acatenango.jpg",
  },
  {
    number: "03",
    place: "LAGO DE ATITLÁN",
    title: "El lago de los volcanes",
    description:
      "Shifu llega al Lago de Atitlán y encuentra finalmente un momento de calma. El agua, los volcanes y los pueblos que rodean el lago convierten este lugar en uno de los momentos más especiales del viaje.",
    quote:
      "A veces el mejor entrenamiento consiste simplemente en detenerse.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Atitlan%2C%20Guatemala.jpg",
  },
  {
    number: "04",
    place: "SEMUC CHAMPEY",
    title: "La selva escondida",
    description:
      "Después de atravesar caminos de montaña, Shifu descubre las pozas turquesas de Semuc Champey. Rodeado de selva, comprende que algunas de las mejores aventuras están lejos de los caminos fáciles.",
    quote:
      "El camino difícil suele llevar a lugares extraordinarios.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Semuc%20Champey%2C%20Guatemala%20CA.jpg",
  },
  {
    number: "05",
    place: "TIKAL",
    title: "Entre los antiguos mayas",
    description:
      "El último gran capítulo lleva a Shifu hasta Tikal. Los templos emergen entre la selva mientras contempla la grandeza de la civilización maya.",
    quote:
      "El verdadero conocimiento también vive en las historias del pasado.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tikal%20(Guatemala).JPG",
  },
];

const gallery = [
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20-%20Santa%20Catalina%20Arch.jpg",
    alt: "Antigua Guatemala",
  },
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Atitlan%2C%20Guatemala.jpg",
    alt: "Lago de Atitlán",
  },
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Semuc%20Champey%2C%20Guatemala%20CA.jpg",
    alt: "Semuc Champey",
  },
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Volcan%20acatenango.jpg",
    alt: "Volcán Acatenango",
  },
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tikal%20(Guatemala).JPG",
    alt: "Tikal",
  },
  {
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Antigua%20Guatemala%20-%20Santa%20Catalina%20Arch.jpg",
    alt: "Arco de Santa Catalina",
  },
];

export default function ShifuGuatemalaPage() {
  return (
    <main className="shifu-page">
      <Header />

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#101914]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${moments[0].image}")`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07110d] via-[#07110dcc] to-[#07110d33]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
          <div className="max-w-4xl">
            <span className="mb-7 inline-block rounded-full bg-[#e5ad45] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#162019]">
              Diario de aventura · Guatemala
            </span>

            <h1 className="font-display text-7xl uppercase leading-[0.82] tracking-wide text-[#f7f1df] sm:text-8xl md:text-9xl lg:text-[10rem]">
              El viaje
              <br />
              <span className="text-[#e5ad45]">de Shifu</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-[#e5eee9] sm:text-lg">
              Entre volcanes, pueblos llenos de color, lagos rodeados de
              montañas y antiguas ciudades mayas, Shifu descubre una
              Guatemala que jamás olvidará.
            </p>

            <a
              href="#aventura"
              className="mt-10 inline-flex items-center gap-3 border border-[#e5ad45] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#e5ad45] transition-all hover:bg-[#e5ad45] hover:text-[#162019]"
            >
              Comenzar el viaje
              <span>↓</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-[#f7f1df99]">
          Guatemala · 7 Expeditions GT
        </div>
      </section>

      {/* INTRO */}
      <section
        id="aventura"
        className="bg-[#f7f1df] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#b37d20]">
            Una aventura inesperada
          </p>

          <h2 className="font-display text-5xl uppercase leading-none text-[#163f35] sm:text-6xl md:text-7xl">
            Cinco lugares.
            <br />
            Una historia.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#35443e] sm:text-lg">
            Shifu llegó a Guatemala buscando tranquilidad... pero encontró
            volcanes, selva, agua turquesa, cultura maya y algunos de los
            paisajes más impresionantes de Centroamérica.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        id="momentos"
        className="bg-[#163f35] px-6 py-24 text-[#f7f1df] lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#e5ad45]">
              El recorrido
            </p>

            <h2 className="font-display text-6xl uppercase text-[#e5ad45] sm:text-7xl">
              Momentos clave
            </h2>
          </div>

          <div className="space-y-28">
            {moments.map((moment, index) => (
              <article
                key={moment.number}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`overflow-hidden rounded-2xl ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <img
                    src={moment.image}
                    alt={moment.place}
                    className="h-[350px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[450px]"
                  />
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="font-mono text-sm tracking-[0.3em] text-[#e5ad45]">
                    {moment.number} · {moment.place}
                  </span>

                  <h3 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">
                    {moment.title}
                  </h3>

                  <p className="mt-6 max-w-xl leading-8 text-[#d8e2dd]">
                    {moment.description}
                  </p>

                  <div className="mt-7 border-l-4 border-[#e5ad45] pl-5 text-sm italic leading-7 text-[#e5ad45]">
                    “{moment.quote}”
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section
        id="galeria"
        className="bg-[#f7f1df] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#b37d20]">
              Recuerdos
            </p>

            <h2 className="font-display text-6xl uppercase text-[#163f35] sm:text-7xl">
              Postales del viaje
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <div
                key={`${item.alt}-${index}`}
                className="group overflow-hidden rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section
        className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24 text-center"
        style={{
          backgroundImage: `url("${moments[4].image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#07110d]/80" />

        <div className="relative z-10 max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#e5ad45]">
            Fin de la expedición
          </p>

          <h2 className="font-display text-7xl uppercase leading-none text-[#e5ad45] sm:text-8xl md:text-9xl">
            Hasta pronto,
            <br />
            Guatemala.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#f7f1df] sm:text-lg">
            Shifu llegó buscando una aventura y se marchó con algo mucho más
            valioso: recuerdos, paisajes y nuevas historias que contar.
          </p>

          <a
            href="#top"
            className="mt-10 inline-flex rounded-sm bg-[#e5ad45] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#162019] transition hover:bg-[#f2c35f]"
          >
            Volver al inicio ↑
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c1713] px-6 py-8 text-center text-xs text-[#9eaca5]">
        <p>7 Expeditions GT · El viaje de Shifu por Guatemala</p>
        <p className="mt-2 opacity-70">
          Fotografías obtenidas de Wikimedia Commons. Consulta las páginas
          originales para autoría y licencia de cada imagen.
        </p>
      </footer>
    </main>
  );
}
