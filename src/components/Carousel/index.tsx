"use client";

import Image, { StaticImageData } from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton, useDotButton } from "./CarouselDotButton";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselDotArrowButtons";
import { cn } from "@/lib/utils";

export default function Carousel({
  slides,
  name,
  className,
}: {
  name: string;
  slides: StaticImageData[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={cn("embla max-h-screen", className)} ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div key={slide.src} className="embla__slide overflow-hidden">
            <Image
              src={slide}
              alt={name}
              priority={index === 0}
              className="object-contain  overflow-hidden"
            />
          </div>
        ))}
      </div>
      <div className="embla__controls md:grid">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
