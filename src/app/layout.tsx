import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Antelu: Alquiler de Vehículos Infantiles - Coches, Motos y Caballitos",
  description:
    "ANTELU ofrece una selección diversa de vehículos para que los más pequeños disfruten en cualquier evento: cumpleaños, bodas o por diversión.",
  keywords:
    "alquiler de coches infantiles, alquiler de motos para niños, alquiler de caballitos, entretenimiento para fiestas infantiles, juegos para eventos infantiles, atracciones para cumpleaños, juguetes para alquilar en eventos, vehículos divertidos para niños, servicios de alquiler para fiestas, alquiler seguro para niños",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
