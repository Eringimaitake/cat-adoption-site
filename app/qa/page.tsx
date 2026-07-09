import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { baseOG } from "@/lib/og";
import { CATEGORY_STYLE, DEFAULT_STYLE } from "./categoryStyles";
import QaAccordion from "./QaAccordion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "保護猫・新米里親のよくある質問Q&A｜飼育トラブル解決・トイレのしつけ・夜鳴き対策など",
  description:
    "保護猫を迎えた新米里親さんや、猫の飼育に悩む方のためのQ&Aページです。トイレのしつけ・夜鳴き・先住猫との関係・脱走防止・健康管理など、よくあるお悩みにわかりやすくお答えします。猫との生活が少しでも楽しくなるヒントが見つかれば幸いです。",
  openGraph: {
    ...baseOG,
    title: "猫の飼育Q&A｜飼育トラブル解決集",
    description:
      "保護猫を迎えた新米里親さんや、猫の飼育に悩む方のためのQ&Aページ。トイレのしつけ・夜鳴き・先住猫との関係・脱走防止など、よくあるお悩みにわかりやすくお答えします。猫との生活が楽しくなるヒントが満載です。",
  },
  alternates: {
    canonical: `${SITE_URL}/qa`,
  },
};

export default async function QaPage() {
  const { data } = await supabase
    .from("qa")
    .select("id, question, answer, category, display_order, created_at, updated_at")
    .order("display_order", { ascending: true });

  const items = data ?? [];

  // Group by category preserving display_order-based category order
  const grouped: { label: string; items: typeof items }[] = [];
  const catMap = new Map<string, typeof items>();
  for (const item of items) {
    const cat = item.category ?? "未分類";
    const existing = catMap.get(cat);
    if (existing) {
      existing.push(item);
    } else {
      catMap.set(cat, [item]);
    }
  }
  for (const [label, catItems] of catMap.entries()) {
    grouped.push({ label, items: catItems });
  }

  // JSON-LD uses all items regardless of category grouping (Task 4)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

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

      {/* ── Category navigation tags ── */}
      {grouped.length > 0 && (
        <section className="py-8 px-4 bg-white border-b border-caramel-light">
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {grouped.map(({ label }, i) => {
              const style = CATEGORY_STYLE[label] ?? DEFAULT_STYLE;
              return (
                <a
                  key={label}
                  href={`#cat-${i}`}
                  className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full ${style.tagBg} ${style.tagText} font-semibold text-sm hover:opacity-75 transition-opacity`}
                >
                  <span>{style.icon}</span>
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Q&A Accordion ── */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <QaAccordion groups={grouped} />
        </div>
      </section>

      {/* FAQPage 構造化データ（全件・カテゴリ問わず） */}
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ── CTA ── */}
      <section className="py-12 px-4 bg-gradient-to-br from-paw-light to-peach-pale text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4 animate-float inline-block">🐱</div>
          <h2 className="text-xl font-bold text-latte mb-3">解決しない場合はご相談を</h2>
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
