export interface Tour {
  slug: string;
  title: { es: string; en: string };
  metaDescription: { es: string; en: string };
  priceUSD: number;
  duration: { es: string; en: string };
  schedule: { es: string; en: string };
  elevation: string;
  availability: { es: string; en: string };
  heroImage: string;
  gallery: string[];
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
    slug: "acatenango-fuego-2-dias-1-noche",
    title: {
      es: "Tour Volcán Acatenango & Volcán de Fuego (2 Días y 1 Noche)",
      en: "Acatenango & Fuego Volcano Overnight Hike (2 Days / 1 Night)"
    },
    metaDescription: {
      es: "Tour de 2 días y 1 noche en el Volcán Acatenango y Volcán de Fuego todo incluido. Glamping, 4 comidas, guías certificados y equipo de montaña.",
      en: "All-inclusive 2 days / 1 night tour to Acatenango & Fuego Volcano. Glamping base camp, 4 meals, certified guides, and mountain gear."
    },
    priceUSD: 175,
    duration: { es: "2 Días / 1 Noche", en: "2 Days / 1 Night" },
    schedule: { es: "Todos los días", en: "Daily departures" },
    elevation: "3,976 msnm / 13,044 ft",
    availability: { es: "Disponible", en: "Available" },
    heroImage: "/gallery/Acatenango1.jpg",
    gallery: [
      "/gallery/Acatenango1.jpg",
      "/gallery/Glamping1.jpg",
      "/gallery/FuegoEruption.jpg"
    ],
    overview: {
      es: "Experimenta la expedición más icónica de Guatemala. Asciende el Volcán Acatenango hasta nuestro campamento base privado estilo Glamping con vistas privilegiadas hacia las erupciones en vivo del Volcán de Fuego. Incluye atención personalizada con 1 guía por cada 4 viajeros, 4 comidas y equipo técnico completo.",
      en: "Experience Guatemala's most iconic expedition. Hike Acatenango Volcano up to our private Glamping base camp with front-row views of active Fuego Volcano eruptions. Features personalized attention with 1 guide per 4 travelers, 4 meals, and full mountain gear."
    },
    included: {
      es: [
        "1 guía certificado por cada 4 viajeros",
        "Entradas a la reserva de Acatenango y Volcán de Fuego",
        "4 comidas preparadas en montaña",
        "Hospedaje en Campamento Base (Glamping con bolsas de dormir térmicas)",
        "Linterna de cabeza para cada viajero",
        "Baño cerca del campamento",
        "Café guatemalteco, té y chocolate caliente ilimitados",
        "Transporte ida y vuelta desde Antigua Guatemala o Ciudad de Guatemala"
      ],
      en: [
        "1 certified guide per 4 travelers",
        "Entrance fees to Acatenango & Fuego Volcano",
        "4 freshly prepared mountain meals",
        "Base Camp lodging (Glamping setup with thermal sleeping bags)",
        "Headlamp provided for each trekker",
        "Restroom facilities near base camp",
        "Unlimited Guatemalan coffee, tea, and hot chocolate",
        "Round-trip transport from Antigua Guatemala or Guatemala City"
      ]
    },
    gearProvided: {
      es: [
        "Chaqueta de montaña",
        "Guantes térmicos",
        "Bastones de senderismo",
        "Casco de protección",
        "Bolsa de dormir térmica de alta montaña"
      ],
      en: [
        "Mountain jacket",
        "Thermal gloves",
        "Trekking poles",
        "Safety helmet",
        "High-altitude thermal sleeping bag"
      ]
    },
    gearToBring: {
      es: [
        "Mochila de 40L - 50L",
        "3 a 4 litros de agua",
        "Calzado con buen agarre (botas de montaña)",
        "Ropa térmica por capas (3 a 4 capas)",
        "Snacks energéticos adicionales"
      ],
      en: [
        "40L - 50L backpack",
        "3 to 4 liters of water",
        "Hiking boots or trail shoes with good grip",
        "Layered clothing (3 to 4 layers)",
        "Extra energy snacks"
      ]
    },
    itinerary: {
      es: [
        {
          time: "Día 1 - 08:00 AM",
          title: "Pickup y Traslado",
          desc: "Punto de encuentro en Antigua Guatemala o Ciudad de Guatemala y traslado al inicio de la ruta en La Soledad."
        },
        {
          time: "Día 1 - 10:00 AM",
          title: "Inicio del Ascenso",
          desc: "Caminata guiada a través de senderos agrícolas, bosque de pino y bosque nuboso a un ritmo constante y seguro."
        },
        {
          time: "Día 1 - 03:30 PM",
          title: "Llegada al Base Camp Glamping",
          desc: "Acomodación en el campamento base frente al Volcán de Fuego. Disfruta de bebidas calientes y comida en la montaña."
        },
        {
          time: "Día 1 - 04:30 PM",
          title: "Expedición Opcional a Fuego",
          desc: "Caminata adicional hacia las crestas de Fuego para presenciar las erupciones a corta distancia (sujeto a clima)."
        },
        {
          time: "Día 2 - 04:00 AM",
          title: "Ascenso a la Cumbre",
          desc: "Ataque a la cima de Acatenango a 3,976 msnm para presenciar un amanecer espectacular sobre la cadena volcánica."
        },
        {
          time: "Día 2 - 08:00 AM",
          title: "Desayuno y Descenso",
          desc: "Desayuno en el campamento base y posterior descenso hacia la base para el traslado de retorno."
        }
      ],
      en: [
        {
          time: "Day 1 - 08:00 AM",
          title: "Pickup & Transfer",
          desc: "Meetup in Antigua Guatemala or Guatemala City for transfer to the trailhead in La Soledad."
        },
        {
          time: "Day 1 - 10:00 AM",
          title: "Trek Begins",
          desc: "Guided hike through local farmland, pine forests, and cloud forest at a safe and steady pace."
        },
        {
          time: "Day 1 - 03:30 PM",
          title: "Arrival at Glamping Base Camp",
          desc: "Check-in at our private base camp facing active Fuego Volcano. Enjoy hot drinks and mountain lunch."
        },
        {
          time: "Day 1 - 04:30 PM",
          title: "Optional Fuego Hike",
          desc: "Extra trek towards the ridges of Fuego Volcano to view eruptions up close (weather permitting)."
        },
        {
          time: "Day 2 - 04:00 AM",
          title: "Summit Sunrise Hike",
          desc: "Final push to Acatenango summit (3,976m / 13,044ft) to watch the sunrise over Guatemala's volcanic chain."
        },
        {
          time: "Day 2 - 08:00 AM",
          title: "Breakfast & Descent",
          desc: "Breakfast at base camp followed by the descent back to the trailhead for return transport."
        }
      ]
    },
    faqs: {
      es: [
        {
          q: "¿Se requiere experiencia previa en montaña?",
          a: "No se requiere experiencia técnica, pero sí una condición física moderada a buena debido a la inclinación y la altitud."
        },
        {
          q: "¿Cómo se gestiona la seguridad en la montaña?",
          a: "Monitoreamos constantemente la actividad volcánica junto con el INSIVUMEH. Nuestros guías están certificados en primeros auxilios de montaña y llevamos un ratio estricto de 1 guía por cada 4 excursionistas."
        }
      ],
      en: [
        {
          q: "Is prior mountain hiking experience required?",
          a: "Technical experience is not required, but moderate-to-good fitness is recommended due to steep inclines and high altitude."
        },
        {
          q: "How is safety handled on the volcano?",
          a: "We continuously monitor volcanic activity via INSIVUMEH. All guides are certified in wilderness first aid and we keep a strict ratio of 1 guide per 4 hikers."
        }
      ]
    }
  },
  {
    slug: "tour-1-dia-volcan-acatenango",
    title: {
      es: "Tour 1 Día Volcán Acatenango (Ascenso Express)",
      en: "1-Day Acatenango Volcano Hike (Express Trek)"
    },
    metaDescription: {
      es: "Tour de 1 día en el Volcán Acatenango. Ascenso express con guía certificado, equipo de montaña y transporte desde Antigua o Ciudad de Guatemala.",
      en: "1-day express hike up Acatenango Volcano. Includes certified guide, mountain gear, and transport from Antigua or Guatemala City."
    },
    priceUSD: 99,
    duration: { es: "1 Día", en: "1 Day" },
    schedule: { es: "Todos los días", en: "Daily departures" },
    elevation: "3,976 msnm / 13,044 ft",
    availability: { es: "Disponible", en: "Available" },
    heroImage: "/gallery/Acatenango1.jpg",
    gallery: ["/gallery/Acatenango1.jpg"],
    overview: {
      es: "Diseñado para viajeros con tiempo limitado que desean conquistar la cumbre del Volcán Acatenango en una sola jornada intensa.",
      en: "Designed for travelers with limited time who want to summit Acatenango Volcano in an intense single-day adventure."
    },
    included: {
      es: [
        "Guías locales certificados con primeros auxilios",
        "Transporte ida y vuelta desde Antigua o Ciudad de Guatemala",
        "Equipo de montaña (bastones, chaqueta, guantes)",
        "Entrada al parque nacional"
      ],
      en: [
        "Certified local guides with first-aid training",
        "Round-trip transport from Antigua or Guatemala City",
        "Mountain gear rental (poles, jacket, gloves)",
        "National park entry fee"
      ]
    },
    gearProvided: {
      es: ["Bastones", "Chaqueta de montaña", "Guantes"],
      en: ["Trekking poles", "Mountain jacket", "Gloves"]
    },
    gearToBring: {
      es: ["Mochila pequeña", "3L de agua", "Snacks calóricos", "Calzado de montaña"],
      en: ["Daypack", "3L of water", "High-energy snacks", "Hiking boots"]
    },
    itinerary: {
      es: [
        { time: "05:00 AM", title: "Salida", desc: "Pickup en tu hotel y traslado al punto de inicio." },
        { time: "07:00 AM", title: "Ascenso", desc: "Caminata continua hacia la cumbre de Acatenango." },
        { time: "01:00 PM", title: "Cumbre", desc: "Tiempo en la cima con vistas al Volcán de Fuego." },
        { time: "05:00 PM", title: "Retorno", desc: "Descenso y traslado de regreso a Antigua." }
      ],
      en: [
        { time: "05:00 AM", title: "Departure", desc: "Hotel pickup and drive to trailhead." },
        { time: "07:00 AM", title: "Hike Begins", desc: "Continuous ascent towards Acatenango summit." },
        { time: "01:00 PM", title: "Summit", desc: "Time at the peak with active views of Fuego Volcano." },
        { time: "05:00 PM", title: "Return", desc: "Descent and transfer back to Antigua." }
      ]
    },
    faqs: {
      es: [
        { q: "¿Es muy exigente el tour de 1 día?", a: "Sí, requiere excelente condición física ya que se sube y baja en la misma jornada." }
      ],
      en: [
        { q: "Is the 1-day tour demanding?", a: "Yes, excellent physical condition is required as you hike up and down in a single day." }
      ]
    }
  },
  {
    slug: "ascenso-nocturno-volcan-acatenango",
    title: {
      es: "Ascenso Nocturno al Volcán Acatenango",
      en: "Acatenango Volcano Night Hike & Sunrise"
    },
    metaDescription: {
      es: "Atrévete a viajar en un ascenso nocturno iniciando a las 9pm para llegar a ver el amanecer desde la cumbre a 3,976msnm y las erupciones del Volcán de Fuego.",
      en: "Embark on a night hike starting at 9pm to reach the 3,976m (13,044ft) summit for sunrise and active Fuego eruptions."
    },
    priceUSD: 75,
    duration: { es: "1 Noche / Madrugada", en: "Overnight / Early Morning" },
    schedule: { es: "Todos los días (Inicia 9:00 PM)", en: "Daily (Starts 9:00 PM)" },
    elevation: "3,976 msnm / 13,044 ft",
    availability: { es: "Disponible", en: "Available" },
    heroImage: "/gallery/FuegoEruption.jpg",
    gallery: ["/gallery/FuegoEruption.jpg"],
    overview: {
      es: "Una caminata nocturna única que parte a las 9:00 PM. Camina bajo las estrellas para llegar a la cumbre al amanecer y contemplar las erupciones incandescentes de Fuego iluminando la noche.",
      en: "A unique night hike starting at 9:00 PM. Hike under the stars to summit by sunrise and witness Fuego's glowing eruptions lighting up the dark."
    },
    included: {
      es: [
        "Guía de montaña certificado",
        "Linterna frontal para el trayecto",
        "Bebida caliente en la cumbre",
        "Transporte de ida y vuelta"
      ],
      en: [
        "Certified mountain guide",
        "Headlamp provided",
        "Hot drink at the summit",
        "Round-trip transport"
      ]
    },
    gearProvided: {
      es: ["Linterna de cabeza", "Bastones"],
      en: ["Headlamp", "Trekking poles"]
    },
    gearToBring: {
      es: ["Ropa para frío extremo (-5°C)", "2.5L de agua", "Linterna extra", "Calzado resistente"],
      en: ["Extreme cold gear (-5°C / 23°F)", "2.5L water", "Extra light", "Sturdy boots"]
    },
    itinerary: {
      es: [
        { time: "09:00 PM", title: "Salida Nocturna", desc: "Traslado desde Antigua hacia la base del volcán." },
        { time: "11:00 PM", title: "Inicio de Ascenso", desc: "Ascenso nocturno con linternas de cabeza." },
        { time: "05:30 AM", title: "Amanecer en Cima", desc: "Llegada a la cima (3,976 msnm) para ver el amanecer y erupciones." },
        { time: "10:00 AM", title: "Retorno", desc: "Descenso y llegada a Antigua Guatemala." }
      ],
      en: [
        { time: "09:00 PM", title: "Night Departure", desc: "Pickup from Antigua to trailhead." },
        { time: "11:00 PM", title: "Night Ascent", desc: "Hike starts under the stars with headlamps." },
        { time: "05:30 AM", title: "Summit Sunrise", desc: "Reach 3,976m summit for sunrise & Fuego eruptions." },
        { time: "10:00 AM", title: "Return", desc: "Descent and arrival back in Antigua." }
      ]
    },
    faqs: {
      es: [
        { q: "¿Hace mucho frío de noche?", a: "Sí, las temperaturas en la cumbre pueden bajar de los 0°C. Es obligatorio llevar varias capas de abrigo." }
      ],
      en: [
        { q: "Is it very cold at night?", a: "Yes, summit temperatures can drop below freezing (0°C / 32°F). Thermal layers are required." }
      ]
    }
  },
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
      es: "Descubre el Lago de Atitlán entre volcanes, pueblos mayas y paseos en lancha.",
      en: "Discover Lake Atitlan among volcanoes, Mayan villages, and boat tours."
    },
    schedule: {
      es: "Todos los días",
      en: "Daily departures"
    },
    duration: {
      es: "1 Día",
      en: "1 Day"
    },
    overview: {
      es: "¡Descubre el Lago de Atitlán como nunca antes! Vive una experiencia única entre volcanes, pueblos mayas y paisajes increíbles...",
      en: "Discover Lake Atitlan like never before! Experience a unique journey surrounded by volcanoes and Mayan culture..."
    },
    included: {
      es: ["Transporte privado", "Paseo en lancha", "Guía local", "Visita a pueblos mayas"],
      en: ["Private transport", "Boat tour", "Local guide", "Mayan village visits"]
    },
    gearProvided: {
      es: ["Chalecos salvavidas", "Kit de primeros auxilios"],
      en: ["Life jackets", "First aid kit"]
    },
    gearToBring: {
      es: ["Protector solar", "Cámara", "Lentes de sol", "Chaqueta liviana"],
      en: ["Sunscreen", "Camera", "Sunglasses", "Light jacket"]
    },
    itinerary: {
      es: [
        { time: "06:00 AM", title: "Salida desde Panajachel", desc: "Encuentro y abordaje de lancha." },
        { time: "09:00 AM", title: "Recorrido por San Juan La Laguna", desc: "Visita a talleres textiles y artesanales." }
      ],
      en: [
        { time: "06:00 AM", title: "Departure from Panajachel", desc: "Meeting point and boat embarkation." },
        { time: "09:00 AM", title: "San Juan La Laguna Tour", desc: "Visit to local textile workshops and art galleries." }
      ]
    },
    faqs: {
      es: [
        { q: "¿Es apto para toda la familia?", a: "Sí, es un tour de dificultad baja ideal para todas las edades." }
      ],
      en: [
        { q: "Is it suitable for all ages?", a: "Yes, this is an easy-level tour suitable for all family members." }
      ]
    }
  }
];
];
