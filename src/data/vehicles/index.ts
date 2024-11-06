import mercedes_csl_350_amg from "./images/mercedes_csl_350_amg.jpg";
import lamborghini_aventador_svj from "./images/lamborghini_aventador_svj.jpg";

export const vehicles = [
  {
    name: "Mercedes CLS 350 AMG",
    id: "mercedes_csl_350_amg",
    type: "car",
    price: 69,
    discount: 30,
    images: [mercedes_csl_350_amg],
    characteristics: {
      recommendedAge: "1-6",
      battery: "12V 4.5AH",
      isOpeningDoors: true,
      motor: "2*25V",
      seats: {
        number: 1,
        material: "leather",
      },
      maxSpeed: "4-5",
      maxWeight: 30,
      isBelts: true,
      isRemoteControl: true,
      sound: {
        isUsb: true,
        isBluetooth: true,
        isMp3: true,
      },
      isOriginal: true,
    },
  },
  {
    name: "Lamborghini Aventador SVJ",
    id: "lamborghini_aventador_svj",
    type: "car",
    price: 30,
    discount: null,
    images: [lamborghini_aventador_svj],
    characteristics: {
      recommendedAge: "3-8",
      battery: "12V 7AH",
      isOpeningDoors: true,
      motor: "2*35V",
      seats: {
        number: 2,
        material: null,
      },
      maxSpeed: "3-5",
      maxWeight: 25,
      isBelts: true,
      isRemoteControl: true,
      sound: {
        isUsb: true,
        isBluetooth: true,
        isMp3: true,
      },
      isOriginal: true,
    },
  },
];
