import React, { ComponentPropsWithRef, useCallback, useSyncExternalStore } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const subscribe = useCallback(
    (listener: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("reInit", listener).on("select", listener);
      return () => {
        emblaApi.off("reInit", listener).off("select", listener);
      };
    },
    [emblaApi],
  );
  const prevBtnDisabled = useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollPrev(),
    () => true,
  );
  const nextBtnDisabled = useSyncExternalStore(
    subscribe,
    () => !emblaApi?.canScrollNext(),
    () => true,
  );

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="icon-button"
      type="button"
      aria-label="Foto anterior"
      {...restProps}
    >
      <ArrowLeft size={20} aria-hidden="true" />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="icon-button"
      type="button"
      aria-label="Foto siguiente"
      {...restProps}
    >
      <ArrowRight size={20} aria-hidden="true" />
      {children}
    </button>
  );
};
