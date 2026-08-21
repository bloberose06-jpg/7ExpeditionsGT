export interface Tour {
  slug: string;
  heroImage: string;
  priceUSD: number;
  elevation: string;
  title: { es: string; en: string };
  metaDescription: { es: string; en: string };
  schedule: { es: string; en: string };
  duration: { es: string; en: string };
  overview: { es: string; en: string };
  included: { es: string[]; en: string[] };
  gearProvided: { es: string[]; en: string[] };
  gearToBring: { es: string[]; en: string[] };
  itinerary: {
    es: { time: string; title: string; desc: string }[];
    en: { time: string; title: string; desc: string }[];
  };
  faqs: {
    es: { q: string; a: string }[];
    en: { q: string; a: string }[];
  };
}

export const TOURS_DATA: Tour[] = [
  {
    slug: "lago-de-atitlan",
    heroImage: "/images/tours/atitlan.jpg",
    priceUSD: 180,
    elevation: "1,560 msnm",
    title: {
      es: "Lago de Atitlán",
      en: "Lake Atitlan Expedition"
    },
    metaDescription: {
      es: "¡Descubre el Lago de Atitlán como nunca antes! Vive una experiencia única entre volcanes, pueblos mayas y paisajes increíbles.",
      en: "Discover Lake Atitlan like never before! Experience a unique journey surrounded by volcanoes, Mayan villages, and incredible landscapes."
    },
    schedule: {
      es: "Todos los días",
      en: "Every day"
    },
    duration: {
      es: "1 Día / Personalizado",
      en: "1 Day / Custom"
    },
    overview: {
      es: "¡Descubre el Lago de Atitlán como nunca antes! Vive una experiencia única entre volcanes, pueblos mayas y paisajes increíbles. Puedes elegir entre tour en lancha, visitar diferentes pueblos, conocer la cultura local, hacer actividades de aventura o simplemente disfrutar de la tranquilidad del lago. Salidas desde Panajachel. Transporte y experiencias personalizadas: Tú eliges cómo vivir Atitlán, ¡nosotros nos encargamos del resto!",
      en: "Discover Lake Atitlan like never before! Experience a unique journey surrounded by volcanoes, Mayan villages, and incredible landscapes. Choose between boat tours, visiting local villages, cultural immersion, adventure activities, or simply relaxing by the lake. Departures from Panajachel with full custom transport and tours."
    },
    included: {
      es: [
        "Navegación privada o semicontrolada en lancha",
        "Guía local certificado",
        "Visitas guiadas a pueblos culturales (San Juan, Santiago, etc.)",
        "Transporte terrestre según el itinerario acordado"
      ],
      en: [
        "Private or semi-private boat navigation",
        "Certified local guide",
        "Guided visits to cultural villages (San Juan, Santiago, etc.)",
        "Ground transportation per agreed itinerary"
      ]
    },
    gearProvided: {
      es: [
        "Chalecos salvavidas certificados en lancha",
        "Botiquín de primeros auxilios"
      ],
      en: [
        "Certified life jackets on boat",
        "First aid kit"
      ]
    },
    gearToBring: {
      es: [
        "Protector solar y lentes de sol",
        "Chaqueta o cortavientos liviano",
        "Calzado cómodo para caminar",
        "Cámara fotográfica",
        "Efectivo en quetzales para artesanías locales"
      ],
      en: [
        "Sunscreen and sunglasses",
        "Light jacket or windbreaker",
        "Comfortable walking shoes",
        "Camera",
        "Cash (GTQ) for local crafts"
      ]
    },
    itinerary: {
      es: [
        {
          time: "08:00 AM",
          title: "Encuentro en Panajachel",
          desc: "Bienvenida por parte de nuestro guía local y abordaje del transporte marítimo."
        },
        {
          time: "09:30 AM",
          title: "Inmersión Cultural en San Juan La Laguna",
          desc: "Recorrido por cofradías, galerías de arte, teñido textil natural y miradores."
        },
        {
          time: "12:30 PM",
          title: "Almuerzo & Tradición en Santiago Atitlán",
          desc: "Visita al centro histórico, veneración a Maximón y gastronomía local a orillas del lago."
        },
        {
          time: "03:30 PM",
          title: "Retorno Panorámico",
          desc: "Navegación de vuelta a Panajachel apreciando los volcanes Atitlán, Tolimán y San Pedro."
        }
      ],
      en: [
        {
          time: "08:00 AM",
          title: "Meeting at Panajachel",
          desc: "Welcome by our local guide and boat boarding."
        },
        {
          time: "09:30 AM",
          title: "Cultural Immersion in San Juan La Laguna",
          desc: "Tour through local art galleries, natural textile dyeing workshops, and viewpoints."
        },
        {
          time: "12:30 PM",
          title: "Lunch & Tradition in Santiago Atitlan",
          desc: "Visit to the historic center, Maximon shrine, and local lakeside cuisine."
        },
        {
          time: "03:30 PM",
          title: "Scenic Boat Ride Back",
          desc: "Sailing back to Panajachel enjoying views of the Atitlan, Toliman, and San Pedro volcanoes."
        }
      ]
    },
    faqs: {
      es: [
        {
          q: "¿Desde dónde sale la expedición?",
          a: "Las salidas principales son desde Panajachel, pero podemos coordinar pick-up desde tu hotel o desde Antigua Guatemala con costo adicional."
        },
        {
          q: "¿Es apto para niños y adultos mayores?",
          a: "Sí, es un tour de ritmo flexible adaptable a familias, parejas o viajeros en solitario."
        }
      ],
      en: [
        {
          q: "Where does the tour start?",
          a: "Main departures are from Panajachel, but we can arrange pick-up from your hotel or Antigua Guatemala upon request."
        },
        {
          q: "Is it suitable for children and seniors?",
          a: "Yes, this expedition offers a flexible pace perfect for families, couples, or solo travelers."
        }
      ]
    }
  }
];
