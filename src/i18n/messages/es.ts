import { plurals } from "../format";

export const es = {
  meta: {
    siteTitle: "Antelu | Vehículos infantiles de alquiler",
    siteDescription:
      "Coches, motos y caballitos infantiles de alquiler en Narón. Encuentra su favorito y consulta la disponibilidad con Antelu.",
    socialDescription: "Pequeños vehículos. Grandes recuerdos.",
    homeTitle: "Antelu | Alquiler de vehículos infantiles en Narón",
    homeDescription:
      "Coches eléctricos, motos, quads, tractores y caballitos infantiles de alquiler. Descubre los modelos y consulta tu alquiler con Antelu en Narón.",
    galleryTitle: "Galería | Antelu",
    galleryDescription:
      "Paseos, coches, motos y caballitos: descubre los momentos de Antelu en nuestra galería de fotos.",
    gallerySocialDescription: "Los pequeños grandes planes de Antelu, en imágenes.",
    vehicleTitle: "{name} de alquiler | Antelu",
    vehicleDescription:
      "Descubre {name}: fotos, características y alquiler por día. Consulta la disponibilidad con Antelu en Narón.",
    notFoundTitle: "Página no encontrada | Antelu",
    itemList: "Vehículos infantiles de Antelu",
  },
  shell: {
    skipLink: "Saltar al contenido",
    home: "Antelu, inicio",
    nav: {
      vehicles: "Vehículos",
      info: "Información",
      gallery: "Galería",
      questions: "Preguntas",
    },
    mainNavigation: "Navegación principal",
    mobileNavigation: "Navegación móvil",
    footerNavigation: "Enlaces del pie",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
  },
  footer: {
    tagline: ["Pequeños vehículos.", "Grandes recuerdos."],
    visitUs: "Ven a conocernos",
    hours: "Todos los días, de 11:00 a 21:00",
    directions: "Cómo llegar",
    talk: "¿Hablamos?",
    writeWhatsApp: "Escríbenos por WhatsApp",
  },
  suggestion: {
    text: "Esta web también está disponible en español.",
    action: "Ver en español",
    dismiss: "Cerrar",
  },
  contact: {
    title: "Hablemos de tu alquiler",
    description: "Coches, motos y caballitos para un día especial.",
    whatsapp: "Consultar por WhatsApp",
    call: "Llamar al {phone}",
    telegram: "Contactar por Telegram",
    close: "Cerrar",
    enquire: "Consultar alquiler",
    enquireNoScript: " por WhatsApp",
    whatsappGeneric:
      "Hola, me gustaría consultar la disponibilidad de vuestros vehículos infantiles.",
    whatsappVehicle: "Hola, me gustaría consultar la disponibilidad de {name}. {url}",
  },
  vehicles: {
    categories: {
      all: "Todos",
      electric_car: "Coches",
      motorbike: "Motos",
      quad: "Quads",
      tractor: "Tractores",
      pony: "Caballitos",
    } as Record<string, string>,
    ageRange: plurals({ one: "{min}-{n} año", other: "{min}-{n} años" }),
    ageUnknown: "Consultar edad recomendada",
    from: "Desde",
    perDay: "/ día",
    previousPrice: "Precio anterior: ",
    view: "Ver {name}",
  },
  catalogue: {
    typeLabel: "Tipo de vehículo",
    ageLabel: "Edad",
    ageAria: "Edad del niño o niña",
    allAges: "Todas las edades",
    years: plurals({ one: "{n} año", other: "{n} años" }),
    count: plurals({ one: "{n} vehículo", other: "{n} vehículos" }),
    reset: "Restablecer filtros",
    emptyTitle: "No hay vehículos con estos filtros",
    showAll: "Ver todos los vehículos",
  },
  home: {
    location: "Antelu · Narón, A Coruña",
    heroTitle: ["Vehículos infantiles", "de alquiler."],
    heroDescription: "Coches, motos y caballitos para sus pequeños grandes planes.",
    chooseVehicle: "Elige su vehículo",
    talk: "¿Hablamos?",
    categoriesLabel: "Categorías de vehículos",
    tileModels: plurals({ one: "{n} modelo · ", other: "{n} modelos · " }),
    tileFrom: "desde {price}",
    strip: ["Alquiler por día", "Recogida en Narón", "Consulta por WhatsApp o teléfono"],
    catalogueEyebrow: "Elige su próxima aventura",
    catalogueTitle: "¿Cuál será el suyo?",
    catalogueDescription:
      "Encuentra su favorito. Los precios son por un día de alquiler.",
    catalogueNote: "Coches, motos y mucho más",
    infoEyebrow: "Del catálogo a la diversión",
    infoTitle: "Un plan sencillo.",
    infoAction: "Consulta tu alquiler",
    steps: [
      {
        title: "Encuentra su favorito",
        text: "Revisa la edad recomendada y las características de cada vehículo.",
      },
      {
        title: "Cuéntanos tu plan",
        text: "Contacta por teléfono o WhatsApp para acordar la fecha y confirmar disponibilidad.",
      },
      {
        title: "Recoge y disfruta",
        text: "Recoge el vehículo y devuélvelo en el lugar y la hora acordados. También puedes consultar la entrega con cargo adicional.",
      },
    ],
    terms:
      "Titular mayor de 18 años, DNI y fianza de {deposit} por vehículo. La reserva se confirma directamente con Antelu.",
    galleryEyebrow: "Momentos Antelu",
    galleryTitle: ["La diversión", "tiene muchas formas."],
    galleryText:
      "Un paseo, un cumpleaños o un día en familia. Así se viven los pequeños grandes planes.",
    galleryAction: "Ver la galería",
    galleryLink: "Ver la galería de fotos de Antelu",
    faqEyebrow: "Antes de arrancar",
    faqTitle: ["Preguntas", "frecuentes."],
    faq: [
      {
        title: "¿Qué vehículo es adecuado para su edad?",
        answer:
          "Cada modelo tiene su propia edad recomendada y capacidad de carga. Revisa su ficha y consúltanos si necesitas ayuda para elegir.",
      },
      {
        title: "¿Cómo se confirma el alquiler?",
        answer:
          "Escríbenos por WhatsApp o llámanos con el modelo y la fecha que te interesan. Confirmaremos contigo la disponibilidad y las condiciones antes de la recogida.",
      },
      {
        title: "¿Qué necesito para recoger el vehículo?",
        answer:
          "La persona titular del alquiler debe ser mayor de 18 años, presentar su DNI y dejar una fianza de {deposit} por vehículo.",
      },
      {
        title: "¿Se puede entregar el vehículo a domicilio?",
        answer:
          "Puedes consultar nuestro servicio de entrega con cargo adicional. Acordaremos contigo la zona, el horario y el importe antes de confirmar el alquiler.",
      },
      {
        title: "¿Qué hago si hay algún problema con el vehículo?",
        answer:
          "Contacta con Antelu para que podamos ayudarte. Consulta las condiciones de uso, devolución y posibles daños antes de confirmar tu alquiler.",
      },
    ],
    contactEyebrow: "Estamos al otro lado",
    contactTitle: "¿Preparamos su próximo plan?",
    contactAction: "Hablar por WhatsApp",
  },
  vehicle: {
    back: "Todos los vehículos",
    intro:
      "Un vehículo para su próximo gran plan. Consulta la fecha que tienes en mente y confirmaremos contigo el alquiler.",
    whatsapp: "Consultar por WhatsApp",
    dailyRental: "Alquiler por día",
    pickup: "Recogida en el C. C. Odeón, Narón",
    specsEyebrow: "Conoce el vehículo",
    specsTitle: "Características",
    conditionsEyebrow: "Antes de salir",
    conditionsTitle: "Tu alquiler",
    conditions: [
      "La reserva se confirma directamente con Antelu.",
      "Fianza de {deposit} por vehículo.",
      "La persona titular debe ser mayor de 18 años y presentar su DNI.",
      "Recogida y devolución en el lugar y horario acordados.",
      "Consulta las condiciones de entrega con cargo adicional.",
    ],
    conditionsNote:
      "Comprueba la edad recomendada, la carga máxima y las condiciones de uso antes del alquiler.",
    breadcrumb: "Vehículos",
  },
  carousel: {
    region: "Fotos de {name}",
    roleDescription: "carrusel",
    slide: "Foto {i} de {n}",
    alt: "{name}, vista {i}",
    previous: "Foto anterior",
    next: "Foto siguiente",
    goTo: "Ir a la foto {i}",
  },
  specs: {
    age: plurals({
      one: "Edad recomendada: {min}-{n} año",
      other: "Edad recomendada: {min}-{n} años",
    }),
    battery: "Batería: {value}",
    doors: "Puertas que se abren",
    motor: "Motor: {value}",
    motors: plurals({ other: "{n} motores de {value}" }),
    seats: plurals({ one: "{n} asiento", other: "{n} asientos" }),
    leatherSeats: plurals({
      one: "{n} asiento de ecocuero",
      other: "{n} asientos de ecocuero",
    }),
    speed: "Velocidad máxima: {value} km/h",
    load: "Carga máxima: {value} kg",
    belts: "Cinturones de seguridad",
    remote: "Control remoto para adultos",
    sound: "Sonido: {value}",
    trailer: "Remolque desmontable",
    units: { decimal: ",", volt: "V", ampHour: "Ah" },
  },
  gallery: {
    back: "Volver a los vehículos",
    eyebrow: "Momentos Antelu",
    title: "Pequeños grandes recuerdos.",
    text: "Paseos, celebraciones y muchas formas de pasarlo bien.",
    action: "Prepara tu plan",
    lightbox: { close: "Cerrar", next: "Siguiente", previous: "Anterior" },
  },
  notFound: {
    eyebrow: "404 · Página no encontrada",
    title: "Por aquí no es.",
    text: "Este vehículo o esta página no está en nuestro catálogo.",
    back: "Volver a los vehículos",
  },
};

export type Messages = typeof es;
