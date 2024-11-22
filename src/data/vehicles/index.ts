import mercedes_csl_350_amg from "./images/mercedes_csl_350_amg.jpg";
import mercedes_csl_350_amg_1 from "./images/mercedes_csl_350_amg_1.jpg";
import mercedes_csl_350_amg_2 from "./images/mercedes_csl_350_amg_2.jpg";
import mercedes_csl_350_amg_3 from "./images/mercedes_csl_350_amg_3.jpg";
import lamborghini_aventador_svj from "./images/lamborghini_aventador_svj.jpg";
import lamborghini_aventador_svj_1 from "./images/lamborghini_aventador_svj_1.jpg";
import lamborghini_aventador_svj_2 from "./images/lamborghini_aventador_svj_2.jpg";
import lamborghini_aventador_svj_3 from "./images/lamborghini_aventador_svj_3.jpg";
import lamborghini_aventador_svj_4 from "./images/lamborghini_aventador_svj_4.jpg";
import jeep_wragler from "./images/jeep_wragler.jpg";
import jeep_wragler_1 from "./images/jeep_wragler_1.jpg";
import jeep_wragler_2 from "./images/jeep_wragler_2.jpg";
import jeep_wragler_3 from "./images/jeep_wragler_3.jpg";
import jeep_wragler_4 from "./images/jeep_wragler_4.jpg";
import police_car from "./images/police_car.jpg";
import police_car_1 from "./images/police_car_1.jpg";
import police_car_2 from "./images/police_car_2.jpg";
import police_car_3 from "./images/police_car_3.jpg";
import mercedes_ml_350 from "./images/mercedes_ml_350.jpg";
import mercedes_ml_350_1 from "./images/mercedes_ml_350_1.jpg";
import mercedes_ml_350_2 from "./images/mercedes_ml_350_2.jpg";
import mercedes_ml_350_3 from "./images/mercedes_ml_350_3.jpg";
import mercedes_ml_350_4 from "./images/mercedes_ml_350_4.jpg";
import fire_truck from "./images/fire_truck.jpg";
import fire_truck_1 from "./images/fire_truck_1.jpg";
import jeep_yellow from "./images/jeep_yellow.jpg";
import jeep_yellow_1 from "./images/jeep_yellow_1.jpg";
import jeep_yellow_2 from "./images/jeep_yellow_2.jpg";
import jeep_yellow_3 from "./images/jeep_yellow_3.jpg";
import jeep_yellow_4 from "./images/jeep_yellow_4.jpg";
import jeep_red from "./images/jeep_red.jpg";
import jeep_red_1 from "./images/jeep_red_1.jpg";
import jeep_red_2 from "./images/jeep_red_2.jpg";
import jeep_red_3 from "./images/jeep_red_3.jpg";
import jeep_red_4 from "./images/jeep_red_4.jpg";
import lamborghini_sian from "./images/lamborghini_sian.jpg";
import lamborghini_sian_1 from "./images/lamborghini_sian_1.jpg";

export const vehicles = [
  {
    name: "Mercedes CLS 350 AMG",
    id: "mercedes_csl_350_amg",
    type: "electric_car",
    price: 29.99,
    discount: 69.99,
    images: [
      mercedes_csl_350_amg,
      mercedes_csl_350_amg_1,
      mercedes_csl_350_amg_2,
      mercedes_csl_350_amg_3,
    ],
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
    images: [
      lamborghini_aventador_svj,
      lamborghini_aventador_svj_1,
      lamborghini_aventador_svj_2,
      lamborghini_aventador_svj_3,
      lamborghini_aventador_svj_4,
    ],
    characteristics: [
      { name: "recommendedAge", value: "3-8" },
      { name: "battery", value: "12V 7AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*35V" },
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
    name: "HOMCOM Jeep Wragler",
    id: "jeep_wragler",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [
      jeep_wragler,
      jeep_wragler_1,
      jeep_wragler_2,
      jeep_wragler_3,
      jeep_wragler_4,
    ],
    characteristics: [
      { name: "recommendedAge", value: "3-8" },
      { name: "battery", value: "12V 4.5AH" },
      { name: "isOpeningDoors", value: true },
      { name: "motor", value: "2*35V" },
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
    ],
  },
  {
    name: "Coche policía",
    id: "police_car",
    type: "electric_car",
    price: 29.99,
    discount: null,
    images: [police_car, police_car_1, police_car_2, police_car_3],
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
    images: [fire_truck, fire_truck_1],
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
    images: [lamborghini_sian, lamborghini_sian_1],
    characteristics: [
      { name: "recommendedAge", value: "0-6" },
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
    images: [
      mercedes_ml_350,
      mercedes_ml_350_1,
      mercedes_ml_350_2,
      mercedes_ml_350_3,
      mercedes_ml_350_4,
    ],
    characteristics: [
      { name: "recommendedAge", value: "0-6" },
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
    images: [
      jeep_yellow,
      jeep_yellow_1,
      jeep_yellow_2,
      jeep_yellow_3,
      jeep_yellow_4,
    ],
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
    images: [jeep_red, jeep_red_1, jeep_red_2, jeep_red_3, jeep_red_4],
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
