export const navLinks = [
  { name: "Vehículos", path: "/#vehicles" },
  { name: "Información", path: "/#info" },
  { name: "Galería", path: "/gallery" },
  { name: "Preguntas", path: "/#questions" },
];

export const phoneNumber = "+34 604 952 317";
export const telegramId = "+34 604 952 317";

export const business = {
  name: "Antelu",
  url: "https://antelu.es",
  phone: phoneNumber,
  phoneHref: "tel:+34604952317",
  address: "Centro comercial Odeón, Estrada Castelao, s/n",
  locality: "15570 Narón, A Coruña",
  hours: "Todos los días, de 11:00 a 21:00",
  deposit: 50,
};

export type ContactVehicle = { id: string; name: string };

export function getWhatsAppUrl(vehicle?: ContactVehicle) {
  const url = new URL(`https://wa.me/${business.phone.replace(/\D/g, "")}`);
  const message = vehicle
    ? `Hola, me gustaría consultar la disponibilidad de ${vehicle.name}. ${new URL(`/rent/${vehicle.id}`, business.url).href}`
    : "Hola, me gustaría consultar la disponibilidad de vuestros vehículos infantiles.";
  url.searchParams.set("text", message);
  return url.href;
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    price,
  );
}
