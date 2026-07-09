import type { Metadata } from "next";
import { baseOG } from "@/lib/og";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "保護猫活動へのご支援・Amazonウィッシュリストで支援物資の寄付をお願いします",
  description:
    "ねこネこ市保護猫譲渡会の活動を応援していただける方へ。猫たちの日常に必要なフードやケア用品など、Amazonウィッシュリストから支援物資をお届けいただけます。継続的な保護活動を支えるため、皆さまのあたたかいご支援をよろしくお願いいたします。",
  openGraph: {
    ...baseOG,
    title: "保護猫活動への物資支援のお願い",
    description:
      "ねこネコ市保護猫譲渡会の活動を応援していただける方へ。猫の日常に必要なフードやケア用品をAmazonウィッシュリストからお届けいただけます。継続的な保護活動を支えるため、皆さまのあたたかいご支援をよろしくお願いします。",
  },
  alternates: {
    canonical: `${SITE_URL}/donate`,
  },
};

// ── 仮データ（正式な情報が決まったらここを書き換えてください） ──────────
const AMAZON_WISHLIST_URL = "https://www.amazon.jp/hz/wishlist/ls/8JO8SKJJM5E5?ref_=wl_share";
// ──────────────────────────────────────────────────────────────

export default function DonatePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-peach-pale via-ivory to-sage-light py-16 px-4 text-center">
        <span className="absolute top-4 right-8 text-5xl opacity-10 select-none">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10 select-none">💕</span>
        <p className="text-caramel font-semibold text-sm mb-2">SUPPORT US</p>
        <h1 className="text-3xl font-bold text-latte mb-3">ご支援のお願い</h1>
        <p className="text-latte-light text-sm max-w-md mx-auto leading-relaxed">
          皆さまからのご支援が、保護猫たちの医療費や日々のお世話、そして新しい家族との出会いを支えています。
        </p>
      </section>

      {/* ── Cards ── */}
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* 支援物資（Amazonウィッシュリスト） */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-caramel-light flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-peach-light flex items-center justify-center text-2xl shrink-0">
                📦
              </div>
              <div>
                <p className="text-xs font-bold text-peach uppercase tracking-wider">
                  Wishlist
                </p>
                <h2 className="text-lg font-bold text-latte">支援物資（Amazon）</h2>
              </div>
            </div>
            <p className="text-sm text-latte-light leading-relaxed mb-5">
              フード・トイレ用品・タオルなど、保護施設で必要な物資をAmazonウィッシュリストにまとめています。
            </p>

            <div className="flex-1 flex flex-col items-center justify-center bg-peach-pale rounded-2xl px-4 py-8 text-center mb-5">
              <span className="text-5xl mb-3">🎁</span>
              <p className="text-sm text-latte-light">
                欲しいものリストから、無理のない範囲でお選びいただけます
              </p>
            </div>

            <a
              href={AMAZON_WISHLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-peach text-white font-bold px-6 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              🛒 Amazonウィッシュリストを見る ↗
            </a>
          </div>
        </div>

        {/* Thanks note */}
        <div className="max-w-md mx-auto mt-8 text-center bg-gradient-to-r from-sage-light/40 to-peach-pale rounded-3xl p-6">
          <p className="text-2xl mb-2">🐾💕</p>
          <p className="text-latte text-sm leading-relaxed">
            少しのご支援でも、猫たちにとって大きな力になります。
            <br />
            いつも温かいお気持ちをありがとうございます。
          </p>
        </div>
      </section>
    </>
  );
}
