import mercedes_csl_350_amg from "./images/mercedes_csl_350_amg.jpg";
import lamborghini_aventador_svj from "./images/lamborghini_aventador_svj.jpg";

export const vehicles = [
  {
    name: "Mercedes CLS 350 AMG",
    id: "mercedes_csl_350_amg",
    type: "electric_car",
    price: 29.99,
    discount: 69.99,
    images: [mercedes_csl_350_amg],
    characteristics: [
      { name: "recommendedAge", value: "1-6" },
      { name: "battery", value: "12V 4.5AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*25V" },
      {
        name: "seats",
        value: {
          number: 1,
          material: "leather",
        },
      },
      { name: "maxSpeed", value: "4-5" },
      { name: "maxWeight", value: 30 },
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
      {
        name: "sound",
        value: {
          isUsb: true,
          isBluetooth: true,
          isMp3: true,
        },
      },
      { name: "isOriginal", value: true },
    ],
  },
  {
    name: "Lamborghini Aventador SVJ",
    id: "lamborghini_aventador_svj",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [lamborghini_aventador_svj],
    characteristics: [
      { name: "recommendedAge", value: "3-8" },
      { name: "battery", value: "12V 7AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*35V" },
      {
        name: "seats",
        value: {
          number: 2,
          material: null,
        },
      },
      { name: "maxSpeed", value: "3-5" },
      { name: "maxWeight", value: 25 },
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
      {
        name: "sound",
        value: {
          isUsb: true,
          isBluetooth: true,
          isMp3: true,
        },
      },
      { name: "isOriginal", value: true },
    ],
  },
];
