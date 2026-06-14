import type { Metadata } from "next";
import Link from "next/link";
import QaAccordion from "./QaAccordion";
import { categories } from "./data";

export const metadata: Metadata = {
  title: "猫のお悩みQ&A",
  description:
    "新米里親さん・猫の飼育に悩む方へ。よくあるお悩みにやさしく回答します。",
};

export default function QaPage() {
  return (
    <>
      {/* ── Page header ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-paw-light via-ivory to-peach-pale py-16 px-4 text-center">
        <span className="absolute top-4 right-8 text-5xl opacity-10 select-none">💬</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10 select-none">🐾</span>
        <p className="text-paw font-semibold text-sm mb-2">CAT Q&A</p>
        <h1 className="text-3xl font-bold text-latte mb-3">猫のお悩みQ&A</h1>
        <p className="text-latte-light text-sm max-w-sm mx-auto leading-relaxed">
          新米里親さんから経験者まで、
          <br />
          よくあるお悩みにやさしくお答えします。
        </p>
      </section>

      {/* ── Category quick-nav ── */}
      <section className="py-4 px-4 bg-white border-b border-caramel-light sticky top-16 z-40">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className={`shrink-0 inline-flex items-center gap-1.5 ${cat.tagBg} ${cat.tagText} text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity whitespace-nowrap`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Q&A Accordion ── */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <QaAccordion />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-4 bg-gradient-to-br from-paw-light to-peach-pale text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4 animate-float inline-block">🐱</div>
          <h2 className="text-xl font-bold text-latte mb-3">
            解決しない場合はご相談を
          </h2>
          <p className="text-latte-light text-sm leading-relaxed mb-7">
            ここに載っていない場合や、もっと詳しく相談したい場合は、お気軽にお問い合わせください。スタッフが丁寧にお答えします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-latte text-ivory font-bold px-8 py-3 rounded-full shadow hover:bg-latte-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              ✉️ お問い合わせ
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 bg-white text-latte-light font-bold px-8 py-3 rounded-full border border-caramel-light hover:bg-caramel-light hover:-translate-y-0.5 transition-all duration-200"
            >
              📖 里親・保護ガイドを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
