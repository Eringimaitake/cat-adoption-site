import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const noto = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ねこネコ市保護猫譲渡会",
    template: "%s | ねこネコ市保護猫譲渡会",
  },
  description:
    "保護猫の譲渡会情報・里親募集中の猫たちをご紹介。保護主の方々と里親希望の方をつなぎ、猫たちが新しい家族に出会えるようサポートしています。",
  openGraph: {
    type: "website",
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
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  verification: {
    google: "hAZeVGox1LiM2DgTFPn_NS_Ijrp4dXefywoPSnSXB4U",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${noto.className} min-h-full flex flex-col bg-ivory`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
