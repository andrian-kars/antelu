"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gallery } from "@/data/gallery";
import { skeleton } from "@/lib/skeleton";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
const photos = gallery.map(({ image, alt }) => ({ ...image, alt }));

export function Gallery() {
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
              alt={photo.alt}
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
          slides={photos}
          open
          close={() => setIndex(-1)}
          labels={{ Close: "Cerrar", Next: "Siguiente", Previous: "Anterior" }}
          carousel={{ finite: true }}
        />
      )}
    </>
  );
}
