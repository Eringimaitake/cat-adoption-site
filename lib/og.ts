/** Shared openGraph base fields — spread into each page's openGraph to keep siteName / type / images consistent. */
export const baseOG = {
  type: "website" as const,
  locale: "ja_JP",
  siteName: "ねこネコ市保護猫譲渡会",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "ねこネコ市保護猫譲渡会 – 保護猫の里親募集サイト",
    },
  ],
};
