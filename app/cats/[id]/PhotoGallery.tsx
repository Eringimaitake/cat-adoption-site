"use client";

import { useState } from "react";

// Gradient classes listed explicitly so Tailwind's scanner includes them
const COLOR_THEMES: Record<string, { from: string; to: string }> = {
  orange:      { from: "from-orange-100", to: "to-peach-light" },
  sky:         { from: "from-sky-100",    to: "to-sage-light"  },
  blue:        { from: "from-blue-50",    to: "to-paw-light"   },
  amber:       { from: "from-amber-100",  to: "to-orange-50"   },
  pink:        { from: "from-pink-100",   to: "to-paw-light"   },
  rose:        { from: "from-rose-100",   to: "to-peach-light" },
  yellow:      { from: "from-yellow-100", to: "to-orange-50"   },
  amber_light: { from: "from-amber-50",   to: "to-yellow-50"   },
};

type Props = {
  images: string[];
  catName: string;
  emoji: string;
  colorTheme: string;
};

export default function PhotoGallery({ images, catName, emoji, colorTheme }: Props) {
  const [current, setCurrent] = useState(0);
  const { from, to } = COLOR_THEMES[colorTheme] ?? COLOR_THEMES.orange;
  const hasImages = images.length > 0;

  return (
    <div className="w-full">
      {/* Main display */}
      <div
        className={`relative h-72 sm:h-96 bg-gradient-to-br ${from} ${to} rounded-3xl overflow-hidden flex items-center justify-center`}
      >
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[current]}
            alt={catName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[9rem] drop-shadow select-none">{emoji}</span>
        )}

        {/* Prev / Next buttons for multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((c) => (c - 1 + images.length) % images.length)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white text-latte rounded-full w-10 h-10 flex items-center justify-center text-xl shadow transition-colors"
              aria-label="前の写真"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/75 hover:bg-white text-latte rounded-full w-10 h-10 flex items-center justify-center text-xl shadow transition-colors"
              aria-label="次の写真"
            >
              ›
            </button>
            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-peach" : "bg-white/60"
                  }`}
                  aria-label={`写真 ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip — shown only when multiple images */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                i === current ? "border-peach" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${catName} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
