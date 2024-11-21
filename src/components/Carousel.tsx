"use client";

import { CircleChevronLeft } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Carousel({
  slides,
  name,
}: {
  name: string;
  slides: StaticImageData[];
}) {
  const [current, setCurrent] = useState(0);
  const isSingleItem = slides.length === 1;

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [current]);

  return (
    <div className={"overflow-hidden relative"}>
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => {
          return <Image key={index} src={s} alt={name} />;
        })}
      </div>

      {!isSingleItem && (
        <>
          <div className="absolute top-0 h-full w-full justify-between items-center flex text-white text-3xl">
            <Button
              size="icon"
              onClick={previousSlide}
              className="rounded-full"
              variant="secondary"
            >
              <CircleChevronLeft />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="rounded-full"
              variant="secondary"
            >
              <CircleChevronLeft className="rotate-180 shadow-xl" />
            </Button>
          </div>

          <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
            {slides.map((s, i) => {
              return (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCurrent(i);
                  }}
                  key={"circle" + i}
                  className={`rounded-full h-1 cursor-pointer  ${
                    i == current ? "bg-black" : "bg-red-600"
                  }`}
                ></Button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
