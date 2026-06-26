import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "里親・保護ガイド",
  description:
    "猫を迎えたい方・猫を保護されている方それぞれへの専用ガイドページです。",
};

const adoptChecklist = [
  "室内で飼える環境がある",
  "賃貸の場合、ペット可物件である",
  "猫アレルギーがない（家族全員）",
  "最後まで責任をもって飼育できる",
  "定期的な動物病院への通院ができる",
  "脱走防止対策ができる",
];

const adoptPreparations = [
  { icon: "🚽", label: "猫用トイレ", note: "猫の頭数＋1個が理想" },
  { icon: "🍽️", label: "食器・フード", note: "ウェット・ドライを用意" },
  { icon: "🛏️", label: "寝床・ベッド", note: "静かな場所に設置" },
  { icon: "🎒", label: "キャリーバッグ", note: "通院・移動用に必須" },
  { icon: "🎪", label: "キャットタワー", note: "縄張り・運動のために" },
  { icon: "🐟", label: "おもちゃ", note: "ストレス発散・絆づくり" },
];

const rescueFlow = [
  {
    step: "01",
    icon: "✉️",
    title: "まずはご相談",
    body: "保護した猫の状況（場所・健康状態・年齢の目安）を教えてください。メールにてご相談を受け付けています。",
  },
  {
    step: "02",
    icon: "📋",
    title: "掲載に向けた準備",
    body: "ワクチン接種や健康状態など、サイト掲載に必要な情報を一緒に整理します。必要に応じて動物病院や他団体のご紹介も行います。",
  },
  {
    step: "03",
    icon: "🐾",
    title: "サイト掲載・里親探しのサポート",
    body: "猫のプロフィールを当サイトに掲載し、里親希望の方とのマッチングや譲渡会への参加をサポートします。",
  },
];

const rescueCases = [
  { icon: "🌿", text: "野良猫を保護したが飼えない" },
  { icon: "🏥", text: "怪我・病気の猫を見つけた" },
  { icon: "👨‍👩‍👧", text: "事情により飼い続けられなくなった" },
  { icon: "🏠", text: "多頭飼育で里親を探したい" },
  { icon: "👶", text: "野良猫が子猫を産んでしまった" },
  { icon: "🚗", text: "交通事故猫を保護した" },
];

export default function GuidePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-peach-pale via-ivory to-sage-light py-16 px-4 text-center">
        <span className="absolute top-4 right-8 text-5xl opacity-10 select-none">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10 select-none">🐾</span>
        <p className="text-caramel font-semibold text-sm mb-2">GUIDE</p>
        <h1 className="text-3xl font-bold text-latte mb-3">
          猫と関わるすべての人へ
        </h1>
        <p className="text-latte-light text-sm max-w-sm mx-auto leading-relaxed">
          「猫を迎えたい方」「猫を保護されている方」、
          <br />
          どちらもまずはこのページをご覧ください。
        </p>
      </section>

      {/* ── Path Selector ── */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href="#adopt"
            className="group flex flex-col items-center text-center bg-gradient-to-br from-sage-light to-ivory rounded-3xl p-8 border-2 border-sage-light hover:border-sage hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <span className="text-6xl mb-4 group-hover:animate-float-sm inline-block">🏠</span>
            <p className="font-bold text-xl text-sage-dark mb-2">猫を迎えたい方へ</p>
            <p className="text-sm text-latte-light leading-relaxed mb-5">
              里親として保護猫を家族に迎えたい方のための情報をまとめています。
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-sage group-hover:text-sage-dark">
              里親ガイドへ ↓
            </span>
          </a>

          <a
            href="#rescue"
            className="group flex flex-col items-center text-center bg-gradient-to-br from-peach-pale to-ivory rounded-3xl p-8 border-2 border-peach-light hover:border-peach hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <span className="text-6xl mb-4 group-hover:animate-float-sm inline-block">🐾</span>
            <p className="font-bold text-xl text-peach-dark mb-2">猫を保護されている方へ</p>
            <p className="text-sm text-latte-light leading-relaxed mb-5">
              ご自身で保護された猫の里親探しや、活動のサポートについてはこちらへ。
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-peach group-hover:text-peach-dark">
              保護主向けサポートへ ↓
            </span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 1: 里親さん向け
      ══════════════════════════════════════ */}
      <section id="adopt" className="scroll-mt-20 pt-14 pb-4 px-4 bg-sage-light/20">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-sage flex items-center justify-center text-xl text-white shadow-sm">
              🏠
            </div>
            <div>
              <p className="text-xs font-bold text-sage uppercase tracking-wider">For Adopters</p>
              <h2 className="text-2xl font-bold text-latte">猫を迎えたい方へ</h2>
            </div>
          </div>
          <p className="text-latte-light text-sm leading-relaxed">
            保護猫を家族に迎えることは、その猫の一生を変える素晴らしい選択です。準備から申し込みまで、一緒に確認しましょう。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 pb-14">
          {/* Checklist */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-light flex items-center justify-center text-base">✅</span>
              迎える前の確認リスト
            </h3>
            <ul className="space-y-2.5">
              {adoptChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-latte">
                  <span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center text-sage text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-latte-light bg-peach-pale rounded-xl p-3">
              ※ 条件を完全に満たしていない場合もご相談ください。状況によっては柔軟に対応します。
            </p>
          </div>

          {/* Preparation */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-light flex items-center justify-center text-base">🛒</span>
              迎える前に準備するもの
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {adoptPreparations.map(({ icon, label, note }) => (
                <div key={label} className="bg-sage-light/30 rounded-2xl p-3 text-center">
                  <p className="text-3xl mb-1">{icon}</p>
                  <p className="text-sm font-semibold text-latte">{label}</p>
                  <p className="text-xs text-latte-light mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-light flex items-center justify-center text-base">📋</span>
              里親になる流れ
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {[
                { step: "1", label: "お申込み",   icon: "✉️" },
                { step: "2", label: "トライアル", icon: "🐈" },
                { step: "3", label: "正式譲渡",   icon: "📝" },
              ].map(({ step, label, icon }, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex flex-col items-center w-16 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center text-xl mb-1 shadow-sm">
                      {icon}
                    </div>
                    <p className="text-xs font-bold text-sage">{step}</p>
                    <p className="text-xs text-latte leading-tight">{label}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-caramel-light font-bold hidden sm:block pb-4">›</span>
                  )}
                </div>
              ))}
            </div>
            <Link href="/process" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-sage hover:text-sage-dark transition-colors">
              詳しい流れを見る →
            </Link>
          </div>

          {/* Adopter CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/cats" className="flex-1 inline-flex items-center justify-center gap-2 bg-sage text-white font-bold px-6 py-3.5 rounded-full shadow hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              🐱 里親募集中の猫を見る
            </Link>
            <Link href="/events" className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-sage-dark font-bold px-6 py-3.5 rounded-full border-2 border-sage-light hover:bg-sage-light hover:-translate-y-0.5 transition-all duration-200">
              📅 次回の譲渡会を確認
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 2: 保護主さん向け
      ══════════════════════════════════════ */}
      <section id="rescue" className="scroll-mt-20 pt-14 pb-4 px-4 bg-peach-pale/40">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-peach flex items-center justify-center text-xl text-white shadow-sm">
              🐾
            </div>
            <div>
              <p className="text-xs font-bold text-peach uppercase tracking-wider">For Rescuers</p>
              <h2 className="text-2xl font-bold text-latte">猫を保護されている方へ</h2>
            </div>
          </div>
          <p className="text-latte-light text-sm leading-relaxed">
            野良猫の保護や、保護した猫の里親探しなど、様々な場面でサポートいたします。一人で抱え込まずに、まずはご連絡ください。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6 pb-14">
          {/* Cases */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-peach-light flex items-center justify-center text-base">💬</span>
              こんな場合はご相談ください
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rescueCases.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-peach-pale rounded-2xl px-4 py-3">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <p className="text-sm text-latte">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rescue Flow */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-peach-light flex items-center justify-center text-base">📋</span>
              サポートの流れ
            </h3>
            <div className="space-y-5">
              {rescueFlow.map(({ step, icon, title, body }, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-peach text-white flex items-center justify-center text-xl shadow-sm shrink-0">
                      {icon}
                    </div>
                    {index < rescueFlow.length - 1 && (
                      <div className="w-0.5 flex-1 bg-peach-light mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4 bg-peach-pale border-l-4 border-peach rounded-r-2xl px-4 py-3">
                    <p className="text-xs font-bold text-peach mb-0.5">STEP {step}</p>
                    <p className="font-bold text-latte mb-1">{title}</p>
                    <p className="text-sm text-latte-light leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light">
            <h3 className="font-bold text-latte text-lg mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-peach-light flex items-center justify-center text-base">💡</span>
              保護前に確認してほしいこと
            </h3>
            <ul className="space-y-3">
              {[
                "その猫は本当に野良猫ですか？首輪がないか、近くに飼い主がいないか確認を。",
                "猫が元気な子猫の場合、近くにお母さん猫がいる可能性があります。しばらく様子を見てください。",
                "緊急の外傷・病気がある場合は、まず動物病院へ。その後ご相談ください。",
                "サイトへの掲載やマッチングのサポートには、状況によりお時間をいただく場合があります。ご了承ください。",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-latte">
                  <span className="w-5 h-5 rounded-full bg-peach-light flex items-center justify-center text-peach text-xs font-bold shrink-0 mt-0.5">
                    !
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Rescuer CTAs */}
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-peach text-white font-bold px-8 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 w-full"
          >
            ✉️ 保護相談・お問い合わせはこちら
          </Link>
          <p className="text-center text-xs text-latte-light">
            📧 お急ぎの場合もまずはメールにてご相談ください：takonekokai@gmail.com
            <br />受付時間 10:00〜17:00（土日祝除く）
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 px-4 bg-gradient-to-br from-ivory to-peach-pale text-center">
        <p className="text-latte font-bold text-lg mb-2">それでも迷ったら…</p>
        <p className="text-latte-light text-sm mb-6">
          どちらに該当するか分からない場合も、お気軽にお問い合わせください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-latte text-ivory font-bold px-8 py-3 rounded-full hover:bg-latte-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
            ✉️ お問い合わせ
          </Link>
          <Link href="/qa" className="inline-flex items-center gap-2 bg-white text-latte-light font-bold px-8 py-3 rounded-full border border-caramel-light hover:bg-caramel-light hover:-translate-y-0.5 transition-all duration-200">
            💬 Q&Aを見る
          </Link>
        </div>
      </section>
    </>
  );
}
