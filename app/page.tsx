import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
import {
  supabase,
  formatEventDateParts,
  formatGender,
  type Cat,
  type CatEvent,
} from "@/lib/supabase";

export const metadata: Metadata = {
  title: { absolute: "保護猫だより | 保護猫譲渡会" },
  description:
    "保護主の方々と里親希望の方をつなぐ保護猫譲渡会サイト。里親募集中の猫の紹介・譲渡会情報・里親になる流れをご案内します。",
  openGraph: {
    title: "保護猫だより | 保護猫譲渡会",
    description:
      "保護主の方々と里親希望の方をつなぐ保護猫譲渡会サイト。里親募集中の猫の紹介・譲渡会情報・里親になる流れをご案内します。",
    url: "/",
  },
};

// force-dynamic ensures "today" and the latest cats/events are always evaluated fresh
export const dynamic = "force-dynamic";

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

function getTheme(key: string): { from: string; to: string } {
  return COLOR_THEMES[key] ?? COLOR_THEMES.orange;
}

const steps = [
  { icon: "✉️", label: "お申込み",   step: "01" },
  { icon: "🐈", label: "トライアル", step: "02" },
  { icon: "📝", label: "正式譲渡",   step: "03" },
];

export default async function HomePage() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const { data: nextEventData } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  const nextEvent = nextEventData as CatEvent | null;
  const nextEventDate = nextEvent ? formatEventDateParts(nextEvent.event_date) : null;

  const { data: featuredCatsData } = await supabase
    .from("cats")
    .select("*")
    .eq("is_adopted", false)
    .order("created_at", { ascending: false })
    .limit(3);

  const featuredCats: Cat[] = featuredCatsData ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-peach-pale via-ivory to-paw-light py-16 md:py-20">
        <span className="absolute top-6 left-6 text-5xl opacity-10 rotate-12 select-none">🐾</span>
        <span className="absolute top-16 right-10 text-7xl opacity-10 -rotate-12 select-none">🐾</span>
        <span className="absolute bottom-10 left-20 text-4xl opacity-10 rotate-6 select-none">🐾</span>
        <span className="absolute bottom-6 right-24 text-3xl opacity-10 -rotate-6 select-none">🐾</span>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Photo banner with heading overlaid on top */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[2.2/1] rounded-3xl overflow-hidden shadow-xl mb-8">
            <Image
              src="/top_picture.jpg"
              alt="保護された子猫たち"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-5 sm:pb-8">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                あなたと出会うのを
                <br />
                <span className="text-peach-light">待っている猫がいます。</span>
              </h1>
            </div>
          </div>

          <p className="text-latte-light text-base md:text-lg mb-10 leading-relaxed max-w-md mx-auto">
            ねこネコ市保護猫譲渡会は、保護主の方々と里親希望の方をつなぎ、保護された猫たちが新しい家族と出会えるよう支援しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cats" className="inline-flex items-center gap-2 bg-peach text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              🐾 猫を探す
            </Link>
            <Link href="/events" className="inline-flex items-center gap-2 bg-white text-caramel font-bold px-8 py-3.5 rounded-full border-2 border-caramel-light shadow-sm hover:bg-caramel-light hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              📅 次回の譲渡会を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ── Two-path Navigator ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-latte-light text-sm mb-2">あなたはどちらですか？</p>
          <h2 className="text-center text-2xl font-bold text-latte mb-8">お探しのページへ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Adopter */}
            <Link
              href="/guide#adopt"
              className="group flex flex-col items-center text-center bg-gradient-to-br from-sage-light to-ivory rounded-3xl p-8 border-2 border-sage-light hover:border-sage hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <span className="text-6xl mb-4 group-hover:animate-float-sm inline-block">🏠</span>
              <p className="font-bold text-xl text-sage-dark mb-2">猫を迎えたい方へ</p>
              <p className="text-sm text-latte-light leading-relaxed mb-5">
                里親になって保護猫を家族に迎えたい方のための情報をまとめています。
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-sage group-hover:text-sage-dark transition-colors">
                里親ガイドを見る <span>→</span>
              </span>
            </Link>

            {/* Rescuer */}
            <Link
              href="/guide#rescue"
              className="group flex flex-col items-center text-center bg-gradient-to-br from-peach-pale to-ivory rounded-3xl p-8 border-2 border-peach-light hover:border-peach hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <span className="text-6xl mb-4 group-hover:animate-float-sm inline-block">🐾</span>
              <p className="font-bold text-xl text-peach-dark mb-2">猫を保護されている方へ</p>
              <p className="text-sm text-latte-light leading-relaxed mb-5">
                保護した猫の里親探しや、活動のサポートについてはこちらへ。
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-peach group-hover:text-peach-dark transition-colors">
                保護主向けサポートを見る <span>→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-ivory py-10 px-4">
        <div className="max-w-md mx-auto grid grid-cols-2 divide-x divide-caramel-light text-center">
          {[
            { value: "160+", label: "新しい家族へ", icon: "🏠" },
            { value: "4年",  label: "活動実績",   icon: "💕" },
          ].map(({ value, label, icon }) => (
            <div key={label} className="py-4 px-2">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-2xl md:text-3xl font-bold text-peach">{value}</p>
              <p className="text-xs text-latte-light mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Next Event ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">📅</span>
            <h2 className="text-2xl font-bold text-latte">次回の譲渡会</h2>
          </div>
          {nextEvent && nextEventDate ? (
            <div className="bg-ivory rounded-3xl shadow-md overflow-hidden border border-caramel-light hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-peach to-peach-dark h-1.5" />
              <div className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                <div className="text-center bg-peach text-white rounded-2xl px-6 py-5 min-w-[110px] shadow">
                  <p className="text-xs opacity-80">{nextEventDate.year}年</p>
                  <p className="text-5xl font-bold leading-none my-1">
                    {nextEventDate.month}/{nextEventDate.day}
                  </p>
                  <p className="text-sm">{nextEventDate.dayOfWeek}曜日</p>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-block bg-peach-pale text-peach text-xs font-bold px-3 py-1 rounded-full mb-2">次回開催</span>
                  <p className="font-bold text-xl text-latte mb-2">{nextEvent.title}</p>
                  <p className="text-latte-light text-sm">🕙 {nextEvent.event_time ?? "時間未定"}</p>
                  <p className="text-latte-light text-sm mt-0.5">📍 {nextEvent.location ?? "場所未定"}</p>
                  <Link href="/events" className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-peach hover:text-peach-dark transition-colors">
                    詳細を見る <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-ivory rounded-3xl border border-caramel-light p-8 text-center">
              <p className="text-latte-light text-sm mb-3">現在、開催予定の譲渡会はありません。</p>
              <Link href="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-peach hover:text-peach-dark transition-colors">
                譲渡会情報を見る <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Cats ── */}
      <section className="py-16 px-4 bg-peach-pale">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-peach font-semibold text-sm mb-1">CATS FOR ADOPTION</p>
            <h2 className="text-2xl font-bold text-latte">里親を募集中の猫たち</h2>
            <p className="text-latte-light text-sm mt-2">一緒に暮らす家族を待っています</p>
          </div>
          {featuredCats.length === 0 ? (
            <p className="text-center text-latte-light text-sm py-10">
              現在、里親募集中の猫の登録がありません。
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {featuredCats.map((cat) => {
                const { from, to } = getTheme(cat.color_theme);
                return (
                  <Link
                    key={cat.id}
                    href={`/cats/${cat.id}`}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group block"
                  >
                    <div className={`h-44 bg-gradient-to-br ${from} ${to} flex items-center justify-center relative overflow-hidden`}>
                      {cat.image_url ? (
                        <Image
                          fill
                          src={cat.image_url}
                          alt={cat.name}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                          {cat.emoji}
                        </span>
                      )}
                      <span className="absolute bottom-2 right-3 text-xl opacity-20 select-none">🐾</span>
                      <span className="absolute top-3 left-2 text-sm opacity-15 select-none">🐾</span>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-latte text-lg mb-1.5">{cat.name}</p>
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-xs text-latte-light bg-caramel-light px-2 py-0.5 rounded-full">
                          {cat.age}
                        </span>
                        <span className="text-xs text-latte-light bg-caramel-light px-2 py-0.5 rounded-full">
                          {formatGender(cat.gender)}
                        </span>
                      </div>
                      {cat.tags.length > 0 && (
                        <span className="inline-block bg-paw-light text-paw text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {cat.tags[0]}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/cats" className="inline-flex items-center gap-2 bg-peach text-white font-bold px-8 py-3 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              🐱 すべての猫を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ── Q&A Teaser ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-paw font-semibold text-sm mb-1">CAT Q&A</p>
            <h2 className="text-2xl font-bold text-latte">猫のお悩みQ&A</h2>
            <p className="text-latte-light text-sm mt-2">よくある疑問にやさしくお答えします</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { q: "トイレを覚えてくれない…",  icon: "🚽", color: "bg-sage-light" },
              { q: "夜鳴きがひどくて眠れない", icon: "🌙", color: "bg-paw-light" },
              { q: "先住猫と仲良くなれる？",   icon: "🐈", color: "bg-caramel-light" },
            ].map(({ q, icon, color }) => (
              <Link
                key={q}
                href="/qa"
                className={`${color} rounded-2xl p-5 flex items-start gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
              >
                <span className="text-3xl shrink-0">{icon}</span>
                <p className="text-sm font-medium text-latte leading-snug">{q}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/qa" className="inline-flex items-center gap-2 text-sm font-semibold text-paw hover:text-paw-dark transition-colors">
              💬 Q&Aをもっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process Overview ── */}
      <section className="py-16 px-4 bg-ivory">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sage font-semibold text-sm mb-1">HOW IT WORKS</p>
            <h2 className="text-2xl font-bold text-latte">譲渡の流れ</h2>
            <p className="text-latte-light text-sm mt-2">初めての方もご安心ください</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            {steps.map(({ icon, label, step }, index) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center w-20 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center text-2xl shadow-sm mb-2">{icon}</div>
                  <p className="text-xs font-bold text-sage">{step}</p>
                  <p className="text-xs text-latte leading-tight mt-0.5">{label}</p>
                </div>
                {index < steps.length - 1 && (
                  <span className="text-caramel-light text-xl font-bold hidden sm:block pb-4">›</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/process" className="text-sm font-semibold text-sage hover:text-sage-dark transition-colors">
              詳しく見る →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 bg-gradient-to-br from-paw-light to-peach-pale text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4 animate-float inline-block">💕</div>
          <h2 className="text-2xl font-bold text-latte mb-3">ご不明な点はお気軽に</h2>
          <p className="text-latte-light mb-8 leading-relaxed">
            里親になることに不安がある方も、まずはお気軽にお問い合わせください。スタッフが丁寧にご案内します。
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-latte text-ivory font-bold px-10 py-3.5 rounded-full shadow-md hover:bg-latte-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            ✉️ お問い合わせはこちら
          </Link>
        </div>
      </section>

      {/* Organization 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "保護猫だより（ねこネコ市保護猫譲渡会）",
            url: SITE_URL,
            email: "takonekokai@gmail.com",
            description:
              "保護主の方々と里親希望の方をつなぎ、保護された猫たちが新しい家族と出会えるようサポートする保護猫譲渡会です。",
            areaServed: "JP",
          }),
        }}
      />
    </>
  );
}
