"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselDotArrowButtons";
import { skeleton } from "@/lib/skeleton";
import { fill } from "@/i18n/format";
import type { Messages } from "@/i18n/messages/es";
import type { Photo } from "@/lib/content";

export default function Carousel({
  slides,
  name,
  labels,
}: {
  name: string;
  slides: Photo[];
  labels: Messages["carousel"];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section
      className="product-gallery"
      aria-label={fill(labels.region, { name })}
      aria-roledescription={labels.roleDescription}
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className="embla__slide"
              role="group"
              aria-label={fill(labels.slide, { i: index + 1, n: slides.length })}
            >
              <Image
                src={slide.src}
                width={slide.width}
                height={slide.height}
                alt={fill(labels.alt, { name, i: index + 1 })}
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
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label={labels.previous}
        />
        <p aria-live="polite">
          {selectedIndex + 1} / {slides.length}
        </p>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label={labels.next}
        />
      </div>
      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <DotButton
            key={slide.src}
            className="carousel-dot"
            aria-label={fill(labels.goTo, { i: index + 1 })}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
