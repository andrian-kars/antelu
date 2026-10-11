import { plurals } from "../format";
import type { Messages } from "./es";

export const en: Messages = {
  meta: {
    siteTitle: "Antelu | Kids' ride-on vehicle rental",
    siteDescription:
      "Rent kids' electric cars, motorbikes and ponies in Narón, Spain. Find their favourite and check availability with Antelu.",
    socialDescription: "Little vehicles. Big memories.",
    homeTitle: "Antelu | Kids' vehicle rental in Narón",
    homeDescription:
      "Kids' electric cars, motorbikes, quads, tractors and ponies to rent. Browse the models and check availability with Antelu in Narón.",
    galleryTitle: "Gallery | Antelu",
    galleryDescription:
      "Rides, cars, motorbikes and ponies: see Antelu moments in our photo gallery.",
    gallerySocialDescription: "Antelu's big little adventures, in pictures.",
    vehicleTitle: "{name} rental | Antelu",
    vehicleDescription:
      "Discover the {name}: photos, features and daily rental. Check availability with Antelu in Narón.",
    notFoundTitle: "Page not found | Antelu",
    itemList: "Antelu kids' vehicles",
  },
  shell: {
    skipLink: "Skip to content",
    home: "Antelu, home",
    nav: {
      vehicles: "Vehicles",
      info: "How it works",
      gallery: "Gallery",
      questions: "FAQ",
    },
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    footerNavigation: "Footer links",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  footer: {
    tagline: ["Little vehicles.", "Big memories."],
    visitUs: "Come and see us",
    hours: "Every day, 11:00–21:00",
    directions: "Get directions",
    talk: "Let's talk",
    writeWhatsApp: "Message us on WhatsApp",
  },
  suggestion: {
    text: "This site is also available in English.",
    action: "Switch to English",
    dismiss: "Dismiss",
  },
  contact: {
    title: "Let's talk about your rental",
    description: "Cars, motorbikes and ponies for a special day.",
    whatsapp: "Ask on WhatsApp",
    call: "Call {phone}",
    telegram: "Message on Telegram",
    close: "Close",
    enquire: "Check availability",
    enquireNoScript: " on WhatsApp",
    whatsappGeneric:
      "Hi, I'd like to check the availability of your kids' ride-on vehicles.",
    whatsappVehicle: "Hi, I'd like to check the availability of the {name}. {url}",
  },
  vehicles: {
    categories: {
      all: "All",
      electric_car: "Cars",
      motorbike: "Motorbikes",
      quad: "Quads",
      tractor: "Tractors",
      pony: "Ponies",
    },
    ageRange: plurals({ other: "Ages {min}–{n}" }),
    ageUnknown: "Ask about the recommended age",
    from: "From",
    perDay: "/ day",
    previousPrice: "Previous price: ",
    view: "View {name}",
  },
  catalogue: {
    typeLabel: "Vehicle type",
    ageLabel: "Age",
    ageAria: "Child's age",
    allAges: "All ages",
    years: plurals({ one: "{n} year", other: "{n} years" }),
    count: plurals({ one: "{n} vehicle", other: "{n} vehicles" }),
    reset: "Reset filters",
    emptyTitle: "No vehicles match these filters",
    showAll: "Show all vehicles",
  },
  home: {
    location: "Antelu · Narón, A Coruña",
    heroTitle: ["Kids' ride-on vehicles", "for rent."],
    heroDescription: "Cars, motorbikes and ponies for their big little adventures.",
    chooseVehicle: "Choose a vehicle",
    talk: "Let's talk",
    categoriesLabel: "Vehicle categories",
    tileModels: plurals({ one: "{n} model · ", other: "{n} models · " }),
    tileFrom: "from {price}",
    strip: ["Daily rental", "Pick-up in Narón", "Enquire by WhatsApp or phone"],
    catalogueEyebrow: "Pick their next adventure",
    catalogueTitle: "Which one will it be?",
    catalogueDescription: "Find their favourite. Prices are for one day's rental.",
    catalogueNote: "Cars, motorbikes and more",
    infoEyebrow: "From catalogue to fun",
    infoTitle: "A simple plan.",
    infoAction: "Check your rental",
    steps: [
      {
        title: "Find their favourite",
        text: "Check the recommended age and features of each vehicle.",
      },
      {
        title: "Tell us your plan",
        text: "Contact us by phone or WhatsApp to agree a date and confirm availability.",
      },
      {
        title: "Pick up and enjoy",
        text: "Collect the vehicle and return it at the agreed place and time. You can also ask about delivery for an extra charge.",
      },
    ],
    terms:
      "The renter must be over 18 and show ID, with a {deposit} deposit per vehicle. Bookings are confirmed directly with Antelu.",
    galleryEyebrow: "Antelu moments",
    galleryTitle: ["Fun comes in", "all shapes and sizes."],
    galleryText:
      "A ride, a birthday or a family day out. This is what big little adventures look like.",
    galleryAction: "View the gallery",
    galleryLink: "View Antelu's photo gallery",
    faqEyebrow: "Before you start",
    faqTitle: ["Frequently asked", "questions."],
    faq: [
      {
        title: "Which vehicle suits their age?",
        answer:
          "Each model has its own recommended age and maximum load. Check its page and ask us if you need help choosing.",
      },
      {
        title: "How is the rental confirmed?",
        answer:
          "Message us on WhatsApp or call us with the model and date you're interested in. We'll confirm availability and terms with you before pick-up.",
      },
      {
        title: "What do I need to pick up the vehicle?",
        answer:
          "The renter must be over 18, show their ID and leave a {deposit} deposit per vehicle.",
      },
      {
        title: "Can the vehicle be delivered?",
        answer:
          "You can ask about our delivery service for an extra charge. We'll agree the area, time and price with you before confirming the rental.",
      },
      {
        title: "What if there's a problem with the vehicle?",
        answer:
          "Contact Antelu so we can help. Check the terms for use, return and possible damage before confirming your rental.",
      },
    ],
    contactEyebrow: "We're here for you",
    contactTitle: "Shall we plan their next adventure?",
    contactAction: "Chat on WhatsApp",
  },
  vehicle: {
    back: "All vehicles",
    intro:
      "A vehicle for their next big adventure. Tell us the date you have in mind and we'll confirm the rental with you.",
    whatsapp: "Ask on WhatsApp",
    dailyRental: "Daily rental",
    pickup: "Pick-up at Odeón shopping centre, Narón",
    specsEyebrow: "Get to know it",
    specsTitle: "Features",
    conditionsEyebrow: "Before you go",
    conditionsTitle: "Your rental",
    conditions: [
      "Bookings are confirmed directly with Antelu.",
      "{deposit} deposit per vehicle.",
      "The renter must be over 18 and show their ID.",
      "Pick-up and return at the agreed place and time.",
      "Ask about delivery for an extra charge.",
    ],
    conditionsNote:
      "Check the recommended age, maximum load and terms of use before renting.",
    breadcrumb: "Vehicles",
  },
  carousel: {
    region: "Photos of {name}",
    roleDescription: "carousel",
    slide: "Photo {i} of {n}",
    alt: "{name}, view {i}",
    previous: "Previous photo",
    next: "Next photo",
    goTo: "Go to photo {i}",
  },
  specs: {
    age: plurals({
      one: "Recommended age: {min}–{n} year",
      other: "Recommended age: {min}–{n} years",
    }),
    battery: "Battery: {value}",
    doors: "Opening doors",
    motor: "Motor: {value}",
    motors: plurals({ other: "{n} × {value} motors" }),
    seats: plurals({ one: "{n} seat", other: "{n} seats" }),
    leatherSeats: plurals({
      one: "{n} faux-leather seat",
      other: "{n} faux-leather seats",
    }),
    speed: "Top speed: {value} km/h",
    load: "Maximum load: {value} kg",
    belts: "Seat belts",
    remote: "Parental remote control",
    sound: "Sound: {value}",
    trailer: "Detachable trailer",
    units: { decimal: ".", volt: "V", ampHour: "Ah" },
  },
  gallery: {
    back: "Back to vehicles",
    eyebrow: "Antelu moments",
    title: "Big little memories.",
    text: "Rides, celebrations and lots of ways to have fun.",
    action: "Plan your day",
    lightbox: { close: "Close", next: "Next", previous: "Previous" },
  },
  notFound: {
    eyebrow: "404 · Page not found",
    title: "Wrong turn.",
    text: "This vehicle or page isn't in our catalogue.",
    back: "Back to vehicles",
  },
};
