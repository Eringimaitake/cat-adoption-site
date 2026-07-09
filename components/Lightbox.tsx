"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function Lightbox({ src, alt, onClose }: Props) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, []);

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
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 text-white text-xl flex items-center justify-center transition-colors"
        aria-label="閉じる"
      >
        ✕
      </button>

      {/* Image container — stopPropagation so clicking image doesn't close */}
      <div
        className="relative w-[min(90vw,1024px)] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}
