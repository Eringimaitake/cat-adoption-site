import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "譲渡会情報",
};

const events = [
  {
    id: 1,
    title: "第34回 保護猫譲渡会",
    month: "7月",
    day: "12",
    dayOfWeek: "日",
    time: "10:00〜16:00",
    venue: "○○コミュニティセンター 第1会議室",
    address: "東京都○○区△△1-2-3",
    capacity: "先着20組",
    note: "香水・強い匂いはご遠慮ください。当日は身分証明書をお持ちください。",
    isNext: true,
    accent: "bg-peach",
  },
  {
    id: 2,
    title: "第35回 保護猫譲渡会",
    month: "8月",
    day: "2",
    dayOfWeek: "日",
    time: "10:00〜16:00",
    venue: "△△市民会館 会議室B",
    address: "東京都△△区○○2-5-1",
    capacity: "先着20組",
    note: "小さなお子様連れも歓迎です。",
    isNext: false,
    accent: "bg-sage",
  },
  {
    id: 3,
    title: "特別譲渡会 〜夏の出会い〜",
    month: "8月",
    day: "16",
    dayOfWeek: "土",
    time: "11:00〜15:00",
    venue: "××ショッピングモール イベント広場",
    address: "神奈川県××市□□3-1-10",
    capacity: "予約不要・入場無料",
    note: "通常より多くの猫が参加予定！ぜひご家族でお越しください。",
    isNext: false,
    accent: "bg-paw",
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-sage-light via-ivory to-peach-pale py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-4 left-8 text-4xl opacity-10">🐾</span>
        <p className="text-sage font-semibold text-sm mb-2">EVENTS</p>
        <h1 className="text-3xl font-bold text-latte mb-2">譲渡会情報</h1>
        <p className="text-latte-light text-sm">保護猫たちに会いに来てください</p>
      </section>

      {/* Events list */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-caramel-light"
            >
              {ev.isNext && (
                <div className="bg-peach text-white text-xs font-bold text-center py-1.5 tracking-wider">
                  🎉 次回開催
                </div>
              )}
              <div className={`h-1.5 ${ev.accent}`} />
              <div className="p-6 flex flex-col sm:flex-row gap-6">
                {/* Date badge */}
                <div className={`${ev.accent} text-white rounded-2xl text-center px-5 py-4 min-w-[90px] self-start shadow-sm`}>
                  <p className="text-xs opacity-80">2026年</p>
                  <p className="text-xs opacity-80">{ev.month}</p>
                  <p className="text-4xl font-bold leading-none">{ev.day}</p>
                  <p className="text-sm mt-1">({ev.dayOfWeek})</p>
                </div>
                {/* Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-latte mb-3">{ev.title}</h2>
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-latte-light w-6">🕙</dt>
                      <dd className="text-latte">{ev.time}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-latte-light w-6">📍</dt>
                      <dd className="text-latte">
                        {ev.venue}
                        <span className="block text-xs text-latte-light">{ev.address}</span>
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-latte-light w-6">👥</dt>
                      <dd className="text-latte">{ev.capacity}</dd>
                    </div>
                  </dl>
                  {ev.note && (
                    <div className="mt-4 bg-peach-pale border-l-4 border-peach rounded-r-xl px-4 py-2.5 text-xs text-latte-light leading-relaxed">
                      💡 {ev.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Participation guide */}
      <section className="py-14 px-4 bg-sage-light/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-latte mb-8 text-center">
            譲渡会に参加するには
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "📝",
                title: "事前のお問い合わせ",
                body: "初めて参加される方は、お問い合わせフォームよりご一報いただけるとスムーズです。",
              },
              {
                icon: "🪪",
                title: "身分証をご持参",
                body: "運転免許証や健康保険証など、ご本人確認できるものをお持ちください。",
              },
              {
                icon: "💬",
                title: "スタッフに何でも相談",
                body: "猫との相性や生活環境について、スタッフが丁寧にご案内いたします。",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-3xl p-6 shadow-sm border border-caramel-light hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-sage-light rounded-2xl flex items-center justify-center text-2xl mb-4">
                  {icon}
                </div>
                <p className="font-bold text-latte mb-1.5">{title}</p>
                <p className="text-xs text-latte-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-peach text-white font-bold px-8 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              ✉️ 参加お申し込み・お問い合わせ
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
