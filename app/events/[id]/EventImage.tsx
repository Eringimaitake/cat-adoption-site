"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

type Props = {
  src: string;
  alt: string;
};

export default function EventImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm bg-ivory cursor-zoom-in block group"
        aria-label="画像を拡大表示"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        {/* Zoom hint badge */}
        <span className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          🔍 タップで拡大
        </span>
      </button>

      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}
