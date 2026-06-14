import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "保護猫だより | ホーム",
  description:
    "保護猫の譲渡会情報と里親募集中の猫たちをご紹介。あなたと運命の猫との出会いを大切に。",
};

const featuredCats = [
  {
    id: 1,
    name: "みかん",
    age: "3歳",
    gender: "女の子",
    personality: "甘えん坊",
    color: "bg-orange-pale",
    emoji: "🧡",
  },
  {
    id: 2,
    name: "そら",
    age: "1歳",
    gender: "男の子",
    personality: "活発・遊び好き",
    color: "bg-sage-light",
    emoji: "💚",
  },
  {
    id: 3,
    name: "ゆき",
    age: "5歳",
    gender: "女の子",
    personality: "穏やか・おっとり",
    color: "bg-beige-dark",
    emoji: "🤍",
  },
];

const processSteps = [
  { step: "01", label: "お問い合わせ", icon: "✉️" },
  { step: "02", label: "事前審査", icon: "📋" },
  { step: "03", label: "譲渡会参加", icon: "🐾" },
  { step: "04", label: "トライアル", icon: "🏠" },
  { step: "05", label: "正式譲渡", icon: "💕" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sage-light py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-5xl mb-4">🐱</p>
          <h1 className="text-3xl md:text-4xl font-bold text-brown leading-tight mb-4">
            あなたを待っている
            <br />
            猫がいます。
          </h1>
          <p className="text-brown-light text-lg mb-8 leading-relaxed">
            保護猫だよりは、保護された猫たちが新しい家族と
            <br className="hidden sm:block" />
            出会えるよう活動している団体です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cats"
              className="inline-block bg-orange text-white font-bold px-8 py-3 rounded-full hover:bg-orange-light transition-colors"
            >
              猫を探す
            </Link>
            <Link
              href="/events"
              className="inline-block bg-white text-sage-dark font-bold px-8 py-3 rounded-full border-2 border-sage hover:bg-beige transition-colors"
            >
              次回の譲渡会を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-beige">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { value: "230+", label: "保護した猫の数" },
            { value: "180+", label: "譲渡した猫の数" },
            { value: "3年", label: "活動年数" },
          ].map(({ value, label }) => (
            <div key={label} className="py-4">
              <p className="text-3xl font-bold text-sage">{value}</p>
              <p className="text-sm text-brown-light mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next event */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown mb-6 text-center">
            次回の譲渡会
          </h2>
          <div className="bg-beige border border-beige-dark rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="text-center bg-orange text-white rounded-xl px-6 py-4 min-w-[120px]">
              <p className="text-xs font-semibold">2026年</p>
              <p className="text-4xl font-bold leading-none">7/12</p>
              <p className="text-sm mt-1">日曜日</p>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-bold text-lg text-brown">
                第34回 保護猫譲渡会
              </p>
              <p className="text-brown-light mt-1">🕙 10:00〜16:00</p>
              <p className="text-brown-light">
                📍 ○○コミュニティセンター 第1会議室
              </p>
              <Link
                href="/events"
                className="inline-block mt-3 text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
              >
                詳細を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured cats */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown mb-2 text-center">
            里親募集中の猫たち
          </h2>
          <p className="text-center text-brown-light text-sm mb-8">
            一緒に暮らす家族を待っています
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredCats.map((cat) => (
              <div
                key={cat.id}
                className="bg-beige rounded-2xl overflow-hidden border border-beige-dark hover:shadow-md transition-shadow"
              >
                <div
                  className={`${cat.color} h-40 flex items-center justify-center text-6xl`}
                >
                  {cat.emoji}
                </div>
                <div className="p-4">
                  <p className="font-bold text-brown text-lg">{cat.name}</p>
                  <p className="text-sm text-brown-light">
                    {cat.age} / {cat.gender}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-orange-pale text-orange font-semibold px-2 py-0.5 rounded-full">
                    {cat.personality}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/cats"
              className="inline-block bg-sage text-white font-bold px-8 py-3 rounded-full hover:bg-sage-dark transition-colors"
            >
              すべての猫を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Process overview */}
      <section className="py-16 px-4 bg-beige">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brown mb-2 text-center">
            譲渡の流れ
          </h2>
          <p className="text-center text-brown-light text-sm mb-10">
            初めての方もご安心ください
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {processSteps.map(({ step, label, icon }, index) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center w-20">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center text-xl mb-1">
                    {icon}
                  </div>
                  <p className="text-xs text-sage font-bold">{step}</p>
                  <p className="text-xs text-brown leading-tight mt-0.5">
                    {label}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <span className="text-beige-dark font-bold hidden sm:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/process"
              className="inline-block text-sm font-semibold text-sage hover:text-sage-dark transition-colors"
            >
              詳しく見る →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-orange-pale text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-3xl mb-3">💕</p>
          <h2 className="text-2xl font-bold text-brown mb-3">
            ご不明な点はお気軽に
          </h2>
          <p className="text-brown-light mb-6">
            猫の里親になることに不安がある方も、
            <br />
            まずはお気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange text-white font-bold px-10 py-3 rounded-full hover:bg-orange-light transition-colors"
          >
            お問い合わせはこちら
          </Link>
        </div>
      </section>
    </>
  );
}
