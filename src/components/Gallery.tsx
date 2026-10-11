"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image, { getImageProps } from "next/image";
import { gallery } from "@/data/gallery";
import type { Messages } from "@/i18n/messages/es";
import { skeleton } from "@/lib/skeleton";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
const photos = gallery.map(({ image }) => image);
const slides = photos.map((photo) => {
  const { props } = getImageProps({ src: photo, alt: "", sizes: "100vw" });
  const srcSet = (props.srcSet ?? "")
    .split(", ")
    .map((candidate) => {
      const [src, descriptor] = candidate.split(" ");
      const width = parseInt(descriptor);
      return { src, width, height: Math.round((width * photo.height) / photo.width) };
    })
    .filter(({ width }) => width <= photo.width);
  return {
    src: props.src,
    width: photo.width,
    height: photo.height,
    srcSet,
  };
});

export function Gallery({ messages }: { messages: Messages["gallery"] }) {
  const [index, setIndex] = useState(-1);
  return (
    <>
      <div className="photo-album">
        {photos.map((photo, current) => (
          <a
            className="gallery-thumbnail"
            key={photo.src}
            href={photo.src}
            onClick={(event) => {
              event.preventDefault();
              event.currentTarget.focus({ preventScroll: true });
              setIndex(current);
            }}
          >
            <Image
              src={photo}
              alt={messages.alts[current]}
              quality={60}
              preload={current === 0}
              placeholder={skeleton(photo)}
              style={{ objectFit: "cover" }}
              sizes="(min-width: 1304px) 403px, (max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc((100vw - 80px) / 2), calc((100vw - 96px) / 3)"
            />
          </a>
        ))}
      </div>
      {index >= 0 && (
        <Lightbox
          index={index}
          slides={slides.map((slide, current) => ({
            ...slide,
            alt: messages.alts[current],
          }))}
          open
          close={() => setIndex(-1)}
          labels={{
            Close: messages.lightbox.close,
            Next: messages.lightbox.next,
            Previous: messages.lightbox.previous,
          }}
          carousel={{ finite: true }}
        />
      )}
    </>
  );
}
