import mercedes_csl_350_amg from "./images/mercedes_csl_350_amg.jpg";
import lamborghini_aventador_svj from "./images/lamborghini_aventador_svj.jpg";
import jeep_wragler from "./images/jeep_wragler.jpg";
import police_mustang from "./images/police_mustang.jpg";
import mercedes_ml_350 from "./images/mercedes_ml_350.jpg";
import fire_truck from "./images/fire_truck.jpg";
import jeep_yellow from "./images/jeep_yellow.jpg";
import jeep_red from "./images/jeep_red.jpg";
import lamborghini_sian from "./images/lamborghini_sian.jpg";

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
  {
    name: "HOMCOM Jeep Wragler",
    id: "jeep_wragler",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [jeep_wragler],
    characteristics: [
      { name: "recommendedAge", value: "3-8" },
      { name: "battery", value: "12V 4.5AH" },
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
      { name: "maxWeight", value: 30 },
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
    ],
  },
  {
    name: "Coche policía",
    id: "police_mustang",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [police_mustang],
    characteristics: [
      { name: "recommendedAge", value: "1-6" },
      { name: "battery", value: "12V 4.5AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*25V" },
      {
        name: "seats",
        value: {
          number: 1,
          material: null,
        },
      },
      { name: "maxSpeed", value: "3-5" },
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
    ],
  },
  {
    name: "Camión de Bomberos",
    id: "fire_truck",
    type: "electric_car",
    price: 29.99,
    discount: 69.99,
    images: [fire_truck],
    characteristics: [
      { name: "recommendedAge", value: "1-6" },
      { name: "battery", value: "12V 10AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*12V" },
      {
        name: "seats",
        value: {
          number: 1,
          material: "leather",
        },
      },
      { name: "maxSpeed", value: "5-6" }, // ?
      { name: "maxWeight", value: 35 }, // ?
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
      {
        name: "sound", // ?
        value: {
          isUsb: true,
          isBluetooth: true,
          isMp3: true,
        },
      },
    ],
  },
  {
    name: "Lamborghini Sián",
    id: "lamborghini_sian",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [lamborghini_sian],
    characteristics: [
      { name: "recommendedAge", value: "3-8" },
      { name: "battery", value: "12V 4.5AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*12V" },
      {
        name: "seats",
        value: {
          number: 1,
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
  {
    name: "Mercedes ML 350",
    id: "mercedes_ml_350",
    type: "electric_car",
    price: 29.99,
    discount: 69.99,
    images: [mercedes_ml_350],
    characteristics: [
      { name: "recommendedAge", value: "3-6" },
      { name: "battery", value: "12V 7AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*35V" },
      {
        name: "seats",
        value: {
          number: 1,
          material: "leather",
        },
      },
      { name: "maxSpeed", value: "5-6" },
      { name: "maxWeight", value: 35 },
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
    name: "INDALCHESS Jeep (Amarillo)",
    id: "jeep_yellow",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [jeep_yellow],
    characteristics: [
      { name: "recommendedAge", value: "1-6" },
      { name: "battery", value: "12V 7AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "4*12V" },
      {
        name: "seats",
        value: {
          number: 2,
          material: "leather",
        },
      },
      { name: "maxSpeed", value: "4-5" },
      { name: "maxWeight", value: 30 },
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
    ],
  },
  {
    name: "INDALCHESS Jeep (Rojo)",
    id: "jeep_red",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [jeep_red],
    characteristics: [
      { name: "recommendedAge", value: "1-6" },
      { name: "battery", value: "12V 7AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "4*12V" },
      {
        name: "seats",
        value: {
          number: 2,
          material: "leather",
        },
      },
      { name: "maxSpeed", value: "4-5" },
      { name: "maxWeight", value: 30 },
      { name: "isBelts", value: true },
      { name: "isRemoteControl", value: true },
    ],
  },
];
