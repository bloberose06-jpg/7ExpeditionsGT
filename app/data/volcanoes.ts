export type Volcano = {
  slug: string;
  name: string;
  elevation: number;
  active: boolean;
  // nuevos, opcionales:
  difficulty: "Moderada" | "Alta" | "Muy alta";
  duration?: string;
  description?: string;
  highlights?: string[];
  images?: string[];
};

export const volcanoes: Volcano[] = [
  {
    slug: "tajumulco",
    name: "Tajumulco",
    elevation: 4220,
    difficulty: "Muy alta",
    duration: "2 días / 1 noche",
    active: false,
    summary:
      "El punto más alto de Centroamérica. Se acampa cerca de la cumbre para ver el amanecer sobre México y el Pacífico.",
    highlights: ["Cumbre más alta de C.A.", "Amanecer sobre dos océanos visibles", "Campamento en altura"],
    price: "Desde Q1,450",
  },
  {
    slug: "acatenango",
    name: "Acatenango",
    elevation: 3976,
    difficulty: "Muy alta",
    duration: "2 días / 1 noche",
    active: false,
    summary:
      "La expedición más buscada del país: se duerme frente al Fuego en erupción, a un cañón de distancia de la lava.",
    highlights: ["Vista frontal al Volcán de Fuego", "Campamento a 3,600 m", "Erupciones nocturnas visibles"],
    price: "Ver Tarifas y Glamping →", // 🚀 Texto mejorado, más comercial
    pdfPath: "/docs/Acatenango_Fuego_7Expeditions.pdf", // 👈 Ruta del PDF
  },
  {
    slug: "fuego",
    name: "Fuego (mirador)",
    elevation: 3763,
    difficulty: "Alta",
    duration: "Combinado con Acatenango",
    active: true,
    summary:
      "Uno de los volcanes más activos de América. Por seguridad no se asciende a su cráter: se observa desde el campamento en Acatenango.",
    highlights: ["Erupciones estrombolianas frecuentes", "Explosiones audibles de noche", "Solo como mirador guiado"],
    price: "Ver Catálogo Completo →", // 🚀 Texto mejorado
    pdfPath: "/docs/Acatenango_Fuego_7Expeditions.pdf", // 👈 También abre el catálogo
  },
  {
    slug: "agua",
    name: "Agua",
    elevation: 3760,
    difficulty: "Alta",
    duration: "1 día",
    active: false,
    summary:
      "Domina el valle de Antigua con una silueta cónica perfecta. Ascenso exigente de un solo día, ida y vuelta.",
    highlights: ["Vistas 360° de Antigua Guatemala", "Cráter cubierto de musgo", "Ruta técnica de bosque nuboso"],
    price: "Desde Q950",
  },
  {
    slug: "atitlan",
    name: "Atitlán",
    elevation: 3535,
    difficulty: "Alta",
    duration: "1 día",
    active: false,
    summary:
      "Se asciende desde San Lucas Tolimán con el lago de Atitlán y sus tres volcanes hermanos como telón de fondo.",
    highlights: ["Vista al lago de Atitlán", "Bosque nuboso denso", "Cráter con laguna estacional"],
    price: "Desde Q1,050",
  },
  {
    slug: "san-pedro",
    name: "San Pedro",
    elevation: 3020,
    difficulty: "Moderada",
    duration: "Medio día",
    active: false,
    summary:
      "El ascenso más accesible junto al lago, ideal para quienes buscan altura sin acampar. Sale desde el pueblo de San Pedro La Laguna.",
    highlights: ["Ideal para principiantes con buen estado físico", "Mirador natural del lago", "Regreso el mismo día"],
    price: "Desde Q450",
  },
  {
    slug: "pacaya",
    name: "Pacaya",
    elevation: 2552,
    difficulty: "Moderada",
    duration: "Medio día",
    active: true,
    summary:
      "El volcán activo más accesible de Guatemala. Se camina sobre coladas de lava recientes y se asan malvaviscos en el calor de la roca.",
    highlights: ["Lava activa reciente", "Apto para familias y principiantes", "Sale por la tarde para ver el atardecer"],
    price: "Desde Q350",
  },
];

export const maxElevation = Math.max(...volcanoes.map((v) => v.elevation));
