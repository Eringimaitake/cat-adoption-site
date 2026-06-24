import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "譲渡の流れ",
};

const steps = [
  {
    step: "01",
    icon: "✉️",
    title: "お問い合わせ",
    body: "まずはお問い合わせフォームよりご連絡ください。気になる猫の名前や、あなたの生活環境についてざっくりと教えていただくとスムーズです。",
    color: "bg-peach-pale",
    border: "border-peach",
    num: "bg-peach text-white",
  },
  {
    step: "02",
    icon: "📋",
    title: "事前審査（面談）",
    body: "生活環境や飼育経験などについてお伺いします。怖いものではなく、猫が幸せに暮らせるかを一緒に確認するための対話です。オンライン対応も可能です。",
    color: "bg-sage-light/50",
    border: "border-sage",
    num: "bg-sage text-white",
  },
  {
    step: "03",
    icon: "🐾",
    title: "譲渡会でお顔合わせ",
    body: "近くの譲渡会にお越しいただき、実際に猫たちと触れ合ってみてください。スタッフもサポートしますので、お気軽にどうぞ。",
    color: "bg-paw-light/50",
    border: "border-paw",
    num: "bg-paw text-white",
  },
  {
    step: "04",
    icon: "🏠",
    title: "トライアル期間（約2週間）",
    body: "正式譲渡前に約2週間のトライアル期間を設けています。猫も人もお互いに慣れるための大切な時間です。不安なことがあればいつでもご相談ください。",
    color: "bg-caramel-light/50",
    border: "border-caramel",
    num: "bg-caramel text-white",
  },
  {
    step: "05",
    icon: "💕",
    title: "正式譲渡",
    body: "トライアルが無事に終われば正式なご家族のお仲間入りです。その後も何かあればいつでもご相談いただけます。長いお付き合いをよろしくお願いします！",
    color: "bg-latte-pale/50",
    border: "border-latte",
    num: "bg-latte text-white",
  },
];

const requirements = [
  "20歳以上の方",
  "賃貸住宅の場合、ペット飼育可の物件であること",
  "猫アレルギーのある方がご家族にいないこと",
  "猫が脱走しない室内環境を整えられること",
  "定期的な通院など、適切な医療を受けさせられること",
  "引っ越しや家族の変化があっても最後まで責任をもって飼えること",
];

const faqs = [
  {
    q: "一人暮らしでも里親になれますか？",
    a: "はい、可能です。日中留守にする場合でも環境さえ整っていれば問題ありません。長時間の外出が多い場合は2匹での譲渡をおすすめすることもあります。",
  },
  {
    q: "費用はかかりますか？",
    a: "医療費の一部として譲渡費用をいただいています（ワクチン・去勢避妊処置済みの費用相当）。詳細はお問い合わせ時にご説明します。",
  },
  {
    q: "シニア猫・持病のある猫はいますか？",
    a: "はい、シニア猫や療養中の猫も里親を探しています。その子ならではの事情もしっかりお伝えしますので、ご興味のある方はぜひご相談ください。",
  },
];

export default function ProcessPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-caramel-light via-ivory to-peach-pale py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10">🐾</span>
        <p className="text-caramel font-semibold text-sm mb-2">HOW TO ADOPT</p>
        <h1 className="text-3xl font-bold text-latte mb-2">譲渡の流れ</h1>
        <p className="text-latte-light text-sm">初めての方も安心してご参加いただけます</p>
      </section>

      {/* Steps */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          {steps.map(({ step, icon, title, body, color, border, num }, index) => (
            <div key={step} className="flex gap-5">
              {/* Connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-2xl ${num} flex items-center justify-center text-xl shadow-sm shrink-0`}
                >
                  {icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-caramel-light mt-2" />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-6 ${color} border-l-4 ${border} rounded-r-2xl px-5 py-4`}>
                <p className="text-xs font-bold text-latte-light mb-0.5">STEP {step}</p>
                <p className="font-bold text-latte text-lg mb-1.5">{title}</p>
                <p className="text-sm text-latte-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 px-4 bg-sage-light/30">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-caramel-light">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📋</span>
              <h2 className="text-xl font-bold text-latte">譲渡の条件</h2>
            </div>
            <ul className="space-y-3">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3 text-sm text-latte">
                  <span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center text-sage text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-latte-light leading-relaxed bg-peach-pale rounded-xl p-3">
              ※ 条件を満たしていない場合も、状況によっては柔軟に対応できる場合があります。まずはお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-peach font-semibold text-sm mb-1">FAQ</p>
            <h2 className="text-xl font-bold text-latte">よくあるご質問</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white rounded-2xl p-5 shadow-sm border border-caramel-light"
              >
                <p className="font-bold text-latte mb-2 flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-peach-light text-peach text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    Q
                  </span>
                  {q}
                </p>
                <p className="text-sm text-latte-light leading-relaxed flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-sage-light text-sage text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    A
                  </span>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-gradient-to-br from-sage-light to-peach-pale text-center">
        <div className="text-5xl mb-4 animate-float inline-block">🐾</div>
        <p className="text-latte font-bold text-xl mb-2">まずはお気軽にご連絡ください</p>
        <p className="text-latte-light text-sm mb-8">
          不安な点はスタッフが丁寧にお答えします
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
