"use client";

import { gallery } from "@/data/gallery";
import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";

const IMAGES = gallery.map((photo) => photo.image);
const IMAGE_SIZE = 310;

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);

  return (
    <section className="relative py-8 bg-acccent/5 z-30 bg-white">
      <div className="container">
        <h3 className="text-4xl lg:text-6xl text-center text-balance font-semibold mb-2">
          Galería
        </h3>
        <p className="text-center mb-8 lg:text-xl italic">
          Some very smart description
        </p>

        <RowsPhotoAlbum
          photos={IMAGES}
          targetRowHeight={IMAGE_SIZE}
          onClick={({ index: current }) => setIndex(current)}
        />

        <Lightbox
          index={index}
          slides={IMAGES}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </div>
    </section>
  );
}
