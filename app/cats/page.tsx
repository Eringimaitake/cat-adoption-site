import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "猫を探す",
  description: "里親募集中の保護猫たちをご紹介します。",
};

const cats = [
  {
    id: 1,
    name: "みかん",
    age: "3歳",
    gender: "女の子",
    tags: ["甘えん坊", "おとなしい"],
    color: "bg-orange-pale",
    emoji: "🧡",
    intro: "膝の上でゴロゴロするのが大好き。先住猫とも仲良くできます。",
  },
  {
    id: 2,
    name: "そら",
    age: "1歳",
    gender: "男の子",
    tags: ["活発", "遊び好き"],
    color: "bg-sage-light",
    emoji: "💚",
    intro: "おもちゃが大好きで毎日元気いっぱい。人懐っこくてすぐ慣れます。",
  },
  {
    id: 3,
    name: "ゆき",
    age: "5歳",
    gender: "女の子",
    tags: ["穏やか", "おっとり"],
    color: "bg-beige-dark",
    emoji: "🤍",
    intro: "静かで落ち着いた性格。一人暮らしの方にもおすすめです。",
  },
  {
    id: 4,
    name: "チョコ",
    age: "2歳",
    gender: "男の子",
    tags: ["人懐っこい", "好奇心旺盛"],
    color: "bg-orange-pale",
    emoji: "🍫",
    intro: "初対面でもすぐ近づいてくる超フレンドリーな男の子。",
  },
  {
    id: 5,
    name: "はな",
    age: "7ヶ月",
    gender: "女の子",
    tags: ["子猫", "元気"],
    color: "bg-sage-light",
    emoji: "🌸",
    intro: "何にでも興味津々。一緒に成長できる家族を待っています。",
  },
  {
    id: 6,
    name: "くり",
    age: "4歳",
    gender: "男の子",
    tags: ["のんびり", "マイペース"],
    color: "bg-beige-dark",
    emoji: "🌰",
    intro: "自分のペースで過ごすのが好き。静かな環境が合っています。",
  },
  {
    id: 7,
    name: "もも",
    age: "1歳半",
    gender: "女の子",
    tags: ["甘えん坊", "遊び好き"],
    color: "bg-orange-pale",
    emoji: "🍑",
    intro: "抱っこ大好き！でも遊ぶときは全力でじゃれます。",
  },
  {
    id: 8,
    name: "たいよう",
    age: "3歳",
    gender: "男の子",
    tags: ["おっとり", "温和"],
    color: "bg-sage-light",
    emoji: "☀️",
    intro: "日向ぼっこが大好きなのんびり屋さん。先住猫と暮らせます。",
  },
];

export default function CatsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-orange-pale py-14 px-4 text-center">
        <h1 className="text-3xl font-bold text-brown mb-2">
          里親募集中の猫たち
        </h1>
        <p className="text-brown-light">
          あなたを待っている猫が {cats.length} 匹います
        </p>
      </section>

      {/* Note */}
      <div className="bg-beige border-b border-beige-dark px-4 py-3 text-center text-sm text-brown-light">
        🐾 掲載情報は定期的に更新しています。最新情報は{" "}
        <Link href="/contact" className="text-sage underline">
          お問い合わせ
        </Link>{" "}
        ください。
      </div>

      {/* Cats grid */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="bg-beige border border-beige-dark rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div
                className={`${cat.color} h-44 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.emoji}
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-bold text-brown text-lg">{cat.name}</p>
                  <p className="text-xs text-brown-light">
                    {cat.age} / {cat.gender}
                  </p>
                </div>
                <p className="text-xs text-brown-light leading-relaxed mb-3">
                  {cat.intro}
                </p>
                <div className="flex flex-wrap gap-1">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-sage-light text-sage-dark font-medium px-2 py-0.5 rounded-full"
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
      <section className="py-12 px-4 bg-beige text-center">
        <p className="text-brown-light mb-4">
          気になる子がいたら、まずはお気軽にご連絡ください
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange text-white font-bold px-10 py-3 rounded-full hover:bg-orange-light transition-colors"
        >
          お問い合わせはこちら
        </Link>
        <p className="mt-4 text-sm text-brown-light">
          譲渡会でも直接会いに来ていただけます →{" "}
          <Link href="/events" className="text-sage underline">
            譲渡会情報
          </Link>
        </p>
      </section>
    </>
  );
}
