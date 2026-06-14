import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "猫を探す",
};

const cats = [
  {
    id: 1,
    name: "みかん",
    age: "3歳",
    gender: "女の子",
    tags: ["甘えん坊", "おとなしい"],
    emoji: "🧡",
    from: "from-orange-100",
    to: "to-peach-light",
    intro: "膝の上でゴロゴロするのが大好き。先住猫とも仲良くできます。",
  },
  {
    id: 2,
    name: "そら",
    age: "1歳",
    gender: "男の子",
    tags: ["活発", "遊び好き"],
    emoji: "💙",
    from: "from-sky-100",
    to: "to-sage-light",
    intro: "おもちゃが大好きで元気いっぱい。人懐っこくてすぐ慣れます。",
  },
  {
    id: 3,
    name: "ゆき",
    age: "5歳",
    gender: "女の子",
    tags: ["穏やか", "おっとり"],
    emoji: "🤍",
    from: "from-blue-50",
    to: "to-paw-light",
    intro: "静かで落ち着いた性格。一人暮らしの方にもおすすめです。",
  },
  {
    id: 4,
    name: "チョコ",
    age: "2歳",
    gender: "男の子",
    tags: ["人懐っこい", "好奇心旺盛"],
    emoji: "🍫",
    from: "from-amber-100",
    to: "to-orange-50",
    intro: "初対面でもすぐ近づいてくる超フレンドリーな男の子。",
  },
  {
    id: 5,
    name: "はな",
    age: "7ヶ月",
    gender: "女の子",
    tags: ["子猫", "元気"],
    emoji: "🌸",
    from: "from-pink-100",
    to: "to-paw-light",
    intro: "何にでも興味津々。一緒に成長できる家族を待っています。",
  },
  {
    id: 6,
    name: "くり",
    age: "4歳",
    gender: "男の子",
    tags: ["のんびり", "マイペース"],
    emoji: "🌰",
    from: "from-amber-50",
    to: "to-yellow-50",
    intro: "自分のペースで過ごすのが好き。静かな環境が合っています。",
  },
  {
    id: 7,
    name: "もも",
    age: "1歳半",
    gender: "女の子",
    tags: ["甘えん坊", "遊び好き"],
    emoji: "🍑",
    from: "from-rose-100",
    to: "to-peach-light",
    intro: "抱っこ大好き！遊ぶときは全力でじゃれかかってきます。",
  },
  {
    id: 8,
    name: "たいよう",
    age: "3歳",
    gender: "男の子",
    tags: ["おっとり", "温和"],
    emoji: "☀️",
    from: "from-yellow-100",
    to: "to-orange-50",
    intro: "日向ぼっこが大好きなのんびり屋さん。先住猫と暮らせます。",
  },
];

export default function CatsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-paw-light via-ivory to-peach-pale py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10">🐾</span>
        <p className="text-paw font-semibold text-sm mb-2">CATS FOR ADOPTION</p>
        <h1 className="text-3xl font-bold text-latte mb-2">里親募集中の猫たち</h1>
        <p className="text-latte-light text-sm">
          あなたを待っている猫が
          <span className="text-peach font-bold mx-1">{cats.length}匹</span>
          います
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-caramel-light"
            >
              {/* Image area */}
              <div
                className={`h-48 bg-gradient-to-br ${cat.from} ${cat.to} flex items-center justify-center relative overflow-hidden`}
              >
                <span className="text-8xl group-hover:scale-110 transition-transform duration-500 drop-shadow">
                  {cat.emoji}
                </span>
                <span className="absolute bottom-2 right-3 text-xl opacity-20">🐾</span>
                <span className="absolute top-2 left-2 text-base opacity-15 -rotate-12">🐾</span>
              </div>

              {/* Card body */}
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-bold text-latte text-lg">{cat.name}</p>
                  <p className="text-xs text-latte-light bg-caramel-light px-2 py-0.5 rounded-full">
                    {cat.age}・{cat.gender}
                  </p>
                </div>
                <p className="text-xs text-latte-light leading-relaxed mb-3 line-clamp-2">
                  {cat.intro}
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
            </div>
          ))}
        </div>
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
