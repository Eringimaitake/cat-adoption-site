"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** 表示する画像。1枚だけの場合はインジケーターと矢印を出さない。 */
  images: string[];
  /** 画像の説明。複数枚のときは末尾に枚数を付けて読み上げる。 */
  alt: string;
  /** クリックされた画像から開始する。範囲外の値はクランプする。 */
  startIndex?: number;
  onClose: () => void;
};

// スワイプと判定する最小移動量 (px)
const SWIPE_THRESHOLD = 50;

export default function Lightbox({ images, alt, startIndex = 0, onClose }: Props) {
  const total = images.length;

  const [index, setIndex] = useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(total - 1, 0)),
  );

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // 先頭/末尾で止まる (ループしない)
  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (total <= 1) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [total, goPrev, goNext]);

  // ── スワイプ (スマホ) ──
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || total <= 1) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // 縦方向の動きが優勢な場合はスワイプ扱いしない
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  if (total === 0) return null;

  const hasMultiple = total > 1;
  const imageAlt = hasMultiple ? `${alt} ${index + 1}` : alt;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="画像の拡大表示"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl flex items-center justify-center transition-colors"
        aria-label="閉じる"
      >
        ✕
      </button>

      {/* Prev / Next — 複数枚のときだけ表示。端では disabled にして止める (ループしない) */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            disabled={index === 0}
            className="
              absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 sm:w-12 sm:h-12 rounded-full
              bg-white/20 hover:bg-white/30 text-white text-2xl
              flex items-center justify-center transition-colors
              disabled:opacity-25 disabled:cursor-default disabled:hover:bg-white/20
            "
            aria-label="前の写真"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            disabled={index === total - 1}
            className="
              absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
              w-11 h-11 sm:w-12 sm:h-12 rounded-full
              bg-white/20 hover:bg-white/30 text-white text-2xl
              flex items-center justify-center transition-colors
              disabled:opacity-25 disabled:cursor-default disabled:hover:bg-white/20
            "
            aria-label="次の写真"
          >
            ›
          </button>
        </>
      )}

      {/* Image container — stopPropagation so clicking image doesn't close */}
      <div
        className="relative w-[min(90vw,1024px)] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={index}
          src={images[index]}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="90vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Indicator — 複数枚のときだけ「3 / 5」形式で表示 */}
      {hasMultiple && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3.5 py-1.5 rounded-full"
          aria-live="polite"
        >
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
}
