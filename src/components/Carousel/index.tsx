"use client";

import Image, { type StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselDotArrowButtons";
import { skeleton } from "@/lib/skeleton";

export default function Carousel({
  slides,
  name,
}: {
  name: string;
  slides: StaticImageData[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section
      className="product-gallery"
      aria-label={`Fotos de ${name}`}
      aria-roledescription="carrusel"
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className="embla__slide"
              role="group"
              aria-label={`Foto ${index + 1} de ${slides.length}`}
            >
              <Image
                src={slide}
                alt={`${name}, vista ${index + 1}`}
                preload={index === 0}
                placeholder={skeleton(slide)}
                style={{ objectFit: "contain" }}
                sizes="(max-width: 800px) calc(100vw - 32px), (max-width: 1300px) 55vw, 680px"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <p aria-live="polite">
          {selectedIndex + 1} / {slides.length}
        </p>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <DotButton
            key={slide.src}
            className="carousel-dot"
            aria-label={`Ir a la foto ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
