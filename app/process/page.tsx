import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "譲渡の流れ",
  description: "保護猫の里親になるまでの流れをご説明します。",
};

const steps = [
  {
    step: "01",
    icon: "✉️",
    title: "お問い合わせ",
    body: "まずはお問い合わせフォームまたはお電話でご連絡ください。気になる猫の名前や、あなたの生活環境についてざっくりと教えていただけると助かります。",
  },
  {
    step: "02",
    icon: "📋",
    title: "事前審査",
    body: "生活環境や飼育経験などについてヒアリングします。審査といっても怖いものではなく、猫が幸せに暮らせるかを一緒に確認するための対話です。",
  },
  {
    step: "03",
    icon: "🐾",
    title: "譲渡会でお顔合わせ",
    body: "近くの譲渡会にお越しいただき、実際に猫たちと触れ合ってみてください。猫との相性は実際に会ってみないとわかりません。スタッフもサポートします。",
  },
  {
    step: "04",
    icon: "🏠",
    title: "トライアル期間（約2週間）",
    body: "正式譲渡前に約2週間のトライアル期間を設けています。猫も人もお互いに慣れるための大切な時間です。不安なことがあればいつでも相談できます。",
  },
  {
    step: "05",
    icon: "💕",
    title: "正式譲渡",
    body: "トライアルが無事に終われば正式なご家族のお仲間入りです。譲渡後も何かあればいつでもご相談ください。長いお付き合いをよろしくお願いします。",
  },
];

const requirements = [
  "20歳以上の方",
  "賃貸住宅の場合、ペット飼育可の物件であること",
  "猫アレルギーのある方がご家族にいないこと",
  "猫が脱走しない環境を整えられること",
  "定期的な通院など、適切な医療を受けさせられること",
  "引っ越しや家族構成の変化があっても最後まで責任をもって飼えること",
];

const faqs = [
  {
    q: "一人暮らしでも里親になれますか？",
    a: "はい、可能です。仕事で日中留守にしている場合も、環境さえ整っていれば問題ありません。ただし長時間留守にする場合は2匹での譲渡をおすすめすることもあります。",
  },
  {
    q: "費用はかかりますか？",
    a: "譲渡費用として医療費の一部をご負担いただいています（ワクチン・去勢避妊済み）。詳細はお問い合わせ時にご説明します。",
  },
  {
    q: "高齢の猫や持病のある猫はいますか？",
    a: "はい、シニア猫や療養中の猫も里親を探しています。その子ならではの事情もしっかりお伝えしますので、ご興味のある方はご相談ください。",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-beige py-14 px-4 text-center">
        <h1 className="text-3xl font-bold text-brown mb-2">譲渡の流れ</h1>
        <p className="text-brown-light">
          はじめての方も安心してご参加いただけます
        </p>
      </section>

      {/* Steps */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map(({ step, icon, title, body }, index) => (
            <div key={step} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center text-2xl shrink-0">
                  {icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-beige-dark mt-2"></div>
                )}
              </div>
              <div className="pb-8">
                <p className="text-xs text-sage font-bold mb-0.5">
                  STEP {step}
                </p>
                <p className="font-bold text-brown text-lg mb-2">{title}</p>
                <p className="text-sm text-brown-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 px-4 bg-beige">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-brown mb-6 text-center">
            譲渡を受けていただける条件
          </h2>
          <ul className="space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex gap-3 text-sm text-brown">
                <span className="text-sage font-bold shrink-0">✓</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-brown-light leading-relaxed">
            ※ 条件を満たしていない場合でも、状況によっては柔軟に対応できる場合があります。まずはお気軽にご相談ください。
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-brown mb-8 text-center">
            よくあるご質問
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-beige border border-beige-dark rounded-xl p-5"
              >
                <p className="font-bold text-brown mb-2">
                  <span className="text-orange mr-2">Q.</span>
                  {q}
                </p>
                <p className="text-sm text-brown-light leading-relaxed">
                  <span className="text-sage font-semibold mr-2">A.</span>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-sage-light text-center">
        <p className="text-brown font-bold text-lg mb-2">
          まずはお気軽にご連絡ください
        </p>
        <p className="text-brown-light text-sm mb-6">
          不安な点はスタッフが丁寧にお答えします
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange text-white font-bold px-10 py-3 rounded-full hover:bg-orange-light transition-colors"
        >
          お問い合わせはこちら
        </Link>
      </section>
    </>
  );
}
