"use client";

import Image from "next/image";
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
  const hasMultiple = images.length > 1;

  // Clamp so the index never goes out of bounds if images array is shorter
  const idx = hasImages ? Math.min(current, images.length - 1) : 0;

  return (
    <div className="w-full">
      {/* ── Main viewer ────────────────────────────────────────────── */}
      <div
        className={`
          relative h-56 sm:h-72 lg:h-96
          bg-gradient-to-br ${from} ${to}
          rounded-3xl overflow-hidden
          flex items-center justify-center
          shadow-sm
        `}
      >
        {hasImages ? (
          /*
           * key={idx} remounts <Image> on index change → re-triggers
           * animate-photo-fade CSS animation for a smooth cross-fade.
           * priority={idx === 0}: 初回 SSR 時は必ず idx=0 なので <head> に
           * <link rel="preload"> が挿入され LCP を改善する。
           * /_next/image 経由でWebP変換・デバイス幅リサイズも適用される。
           */
          <Image
            key={idx}
            fill
            src={images[idx]}
            alt={`${catName} の写真 ${idx + 1}`}
            className="object-contain animate-photo-fade"
            sizes="(max-width: 768px) calc(100vw - 32px), 736px"
            priority={idx === 0}
          />
        ) : (
          /* Emoji fallback when no image_url is stored */
          <span className="text-[9rem] drop-shadow-lg select-none">{emoji}</span>
        )}

        {/* Prev / Next arrows — only rendered for multiple images */}
        {hasMultiple && (
          <>
            <button
              onClick={() =>
                setCurrent((c) => (c - 1 + images.length) % images.length)
              }
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-white/75 hover:bg-white
                text-latte text-2xl
                flex items-center justify-center
                shadow-md transition-colors duration-150
              "
              aria-label="前の写真"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrent((c) => (c + 1) % images.length)
              }
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                w-10 h-10 rounded-full
                bg-white/75 hover:bg-white
                text-latte text-2xl
                flex items-center justify-center
                shadow-md transition-colors duration-150
              "
              aria-label="次の写真"
            >
              ›
            </button>
          </>
        )}

        {/* Photo count badge */}
        {hasMultiple && (
          <div className="
            absolute bottom-3 right-3
            bg-black/40 backdrop-blur-sm
            text-white text-xs font-medium
            px-2.5 py-1 rounded-full
          ">
            {idx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────────── */}
      {/*
       * Shown only when there are 2+ images.
       * onMouseEnter switches the main viewer instantly on hover;
       * onClick works as a fallback for touch/keyboard users.
       * サムネイルは Next.js Image のデフォルト遅延読み込みで配信する。
       */}
      {hasMultiple && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto scrollbar-none pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              onMouseEnter={() => setCurrent(i)}
              aria-label={`写真 ${i + 1}を表示`}
              className={`
                relative flex-shrink-0 rounded-2xl overflow-hidden
                w-20 h-20 sm:w-24 sm:h-24
                border-2 transition-all duration-200
                ${
                  i === idx
                    ? "border-peach shadow-md scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105 hover:shadow-md"
                }
              `}
            >
              <Image
                fill
                src={src}
                alt={`${catName} ${i + 1}`}
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
