import type { Metadata } from "next";
import CopyField from "./CopyField";

export const metadata: Metadata = {
  title: "ご支援のお願い",
  description:
    "保護猫活動を継続するための寄付金（銀行振込）・支援物資（Amazonウィッシュリスト）のご案内です。",
};

// ── 仮データ（正式な情報が決まったらここを書き換えてください） ──────────
const BANK_NAME = "○○銀行";
const BANK_BRANCH = "△△支店";
const ACCOUNT_TYPE = "普通";
const ACCOUNT_NUMBER = "1234567";
const ACCOUNT_HOLDER = "シャ）ネコノタスケアイ";
const AMAZON_WISHLIST_URL = "https://www.amazon.co.jp/hz/wishlist/ls/仮のID";
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
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* 寄付金（銀行振込） */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-caramel-light flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-sage-light flex items-center justify-center text-2xl shrink-0">
                💰
              </div>
              <div>
                <p className="text-xs font-bold text-sage uppercase tracking-wider">
                  Donation
                </p>
                <h2 className="text-lg font-bold text-latte">寄付金（銀行振込）</h2>
              </div>
            </div>
            <p className="text-sm text-latte-light leading-relaxed mb-5">
              いただいたご寄付は、保護猫の医療費・ワクチン接種・フード代などの活動費として活用させていただきます。
            </p>

            <div className="bg-ivory rounded-2xl px-4 divide-y divide-caramel-light/50">
              <CopyField label="銀行名" value={BANK_NAME} />
              <CopyField label="支店名" value={BANK_BRANCH} />
              <CopyField label="口座種別" value={ACCOUNT_TYPE} />
              <CopyField label="口座番号" value={ACCOUNT_NUMBER} />
              <CopyField label="口座名義" value={ACCOUNT_HOLDER} />
            </div>

            <p className="text-xs text-latte-light mt-4 leading-relaxed">
              ※ お振込の際は、お名前の前に「キフ」とご記入いただけますと助かります。
            </p>
          </div>

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
        <div className="max-w-3xl mx-auto mt-8 text-center bg-gradient-to-r from-sage-light/40 to-peach-pale rounded-3xl p-6">
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
