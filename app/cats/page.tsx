import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { supabase, formatGender, type Cat } from "@/lib/supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "里親募集中の保護猫一覧",
  description:
    "里親を募集している保護猫のプロフィール一覧です。年齢・性別・性格・健康状態など詳しい情報を掲載。ワクチン接種済み・去勢避妊済みの子も多数います。あなたにぴったりの猫が見つかったら、お気軽にお問い合わせください。定期開催の譲渡会で直接会いに来ることもできます。",
  alternates: {
    canonical: `${SITE_URL}/cats`,
  },
};

// force-dynamic ensures cats data is always fetched fresh from Supabase
export const dynamic = "force-dynamic";

// Tailwind gradient pairs — defined here so Tailwind's scanner includes the classes at build time.
// Store the key (e.g. "orange") in Supabase; the page maps it to classes.
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

export default async function CatsPage() {
  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .eq("is_adopted", false)
    .order("created_at", { ascending: false });

  const cats: Cat[] = data ?? [];

  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-paw-light via-ivory to-peach-pale py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10">🐾</span>
        <p className="text-paw font-semibold text-sm mb-2">CATS FOR ADOPTION</p>
        <h1 className="text-3xl font-bold text-latte mb-2">里親募集中の猫たち</h1>
        <p className="text-latte-light text-sm">
          {error ? (
            "データを取得できませんでした"
          ) : (
            <>
              あなたを待っている猫が
              <span className="text-peach font-bold mx-1">{cats.length}匹</span>
              います
            </>
          )}
        </p>
      </section>

      {/* Notice */}
      <div className="bg-white border-b border-caramel-light px-4 py-3 text-center text-xs text-latte-light">
        🐾 掲載情報は定期的に更新しています。最新情報は{" "}
        <Link href="/contact" className="text-peach underline hover:text-peach-dark">
          お問い合わせ
        </Link>{" "}
        ください。
      </div>

      {/* Cat grid */}
      <section className="py-12 px-4">
        {error ? (
          <p className="text-center text-latte-light py-16 text-sm">
            データの読み込みに失敗しました。しばらくしてからお試しください。
          </p>
        ) : cats.length === 0 ? (
          <p className="text-center text-latte-light py-16 text-sm">
            現在、里親募集中の猫はいません。
          </p>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cats.map((cat) => {
              const { from, to } = getTheme(cat.color_theme);
              return (
                <Link
                  key={cat.id}
                  href={`/cats/${cat.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-caramel-light block"
                >
                  {/* Image / emoji area */}
                  <div
                    className={`h-48 bg-gradient-to-br ${from} ${to} flex items-center justify-center relative overflow-hidden`}
                  >
                    {cat.image_url ? (
                      <Image
                        fill
                        src={cat.image_url}
                        alt={cat.name}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <span className="text-8xl group-hover:scale-110 transition-transform duration-500 drop-shadow">
                        {cat.emoji}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-3 text-xl opacity-20">🐾</span>
                    <span className="absolute top-2 left-2 text-base opacity-15 -rotate-12">🐾</span>
                  </div>

                  {/* Card body */}
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
                    <p className="text-xs text-latte-light leading-relaxed mb-3 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-paw-light text-paw font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-peach-pale to-paw-light text-center">
        <div className="text-4xl mb-3">💌</div>
        <p className="text-latte font-bold text-lg mb-2">気になる子がいたらお気軽にご連絡を</p>
        <p className="text-latte-light text-sm mb-6">
          譲渡会でも直接会いに来ていただけます →{" "}
          <Link href="/events" className="text-sage underline hover:text-sage-dark">
            譲渡会情報
          </Link>
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-peach text-white font-bold px-10 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          ✉️ お問い合わせはこちら
        </Link>
      </section>
    </>
  );
}
