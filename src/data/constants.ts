export const phoneNumber = "+34 604 952 317";
export const telegramId = "+34 604 952 317";

export const navLinks = [
  { key: "vehicles", path: "/#vehicles" },
  { key: "info", path: "/#info" },
  { key: "gallery", path: "/gallery" },
  { key: "questions", path: "/#questions" },
] as const;

export const business = {
  name: "Antelu",
  url: "https://antelu.es",
  phone: phoneNumber,
  phoneHref: "tel:+34604952317",
  address: "Centro comercial Odeón, Estrada Castelao, s/n",
  locality: "15570 Narón, A Coruña",
  deposit: 50,
};

export type ContactVehicle = { id: string; name: string };
