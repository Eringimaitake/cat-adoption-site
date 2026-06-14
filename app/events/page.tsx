import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "譲渡会情報",
  description: "保護猫譲渡会の開催日程・会場情報をご確認ください。",
};

const upcomingEvents = [
  {
    id: 1,
    title: "第34回 保護猫譲渡会",
    date: "2026年7月12日（日）",
    time: "10:00〜16:00",
    venue: "○○コミュニティセンター 第1会議室",
    address: "東京都○○区△△1-2-3",
    capacity: "先着20組",
    notes: "当日は猫が怖がるため、香水・強い匂いはご遠慮ください。",
    isNext: true,
  },
  {
    id: 2,
    title: "第35回 保護猫譲渡会",
    date: "2026年8月2日（日）",
    time: "10:00〜16:00",
    venue: "△△市民会館 会議室B",
    address: "東京都△△区○○2-5-1",
    capacity: "先着20組",
    notes: "小さなお子様連れも歓迎です。",
    isNext: false,
  },
  {
    id: 3,
    title: "特別譲渡会 〜夏の出会い〜",
    date: "2026年8月16日（土）",
    time: "11:00〜15:00",
    venue: "××ショッピングモール イベント広場",
    address: "神奈川県××市□□3-1-10",
    capacity: "予約不要・入場無料",
    notes: "通常より多くの猫が参加予定です！ぜひお越しください。",
    isNext: false,
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-sage-light py-14 px-4 text-center">
        <h1 className="text-3xl font-bold text-brown mb-2">譲渡会情報</h1>
        <p className="text-brown-light">
          開催予定の譲渡会をご確認ください
        </p>
      </section>

      {/* Events list */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-beige border border-beige-dark rounded-2xl overflow-hidden"
            >
              {event.isNext && (
                <div className="bg-orange text-white text-xs font-bold px-4 py-1.5 text-center">
                  次回開催
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-brown mb-4">
                  {event.title}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-brown-light w-12 shrink-0">📅 日時</dt>
                    <dd className="text-brown font-medium">
                      {event.date}
                      <br />
                      {event.time}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-brown-light w-12 shrink-0">📍 会場</dt>
                    <dd className="text-brown">
                      {event.venue}
                      <br />
                      <span className="text-brown-light text-xs">
                        {event.address}
                      </span>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-brown-light w-12 shrink-0">👥 定員</dt>
                    <dd className="text-brown">{event.capacity}</dd>
                  </div>
                </dl>
                {event.notes && (
                  <div className="mt-4 bg-orange-pale rounded-lg px-4 py-3 text-sm text-brown-light">
                    💡 {event.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Participation guide */}
      <section className="py-12 px-4 bg-beige">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-brown mb-6 text-center">
            譲渡会に参加するには
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "📝",
                title: "事前のお問い合わせ",
                body: "初めて参加される方は、事前にお問い合わせフォームよりご連絡ください。",
              },
              {
                icon: "🪪",
                title: "身分証明書の持参",
                body: "当日は運転免許証などの身分証明書をお持ちください。",
              },
              {
                icon: "💬",
                title: "スタッフにご相談を",
                body: "猫との相性や生活環境について、スタッフが丁寧にご案内します。",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-cream rounded-xl p-5 border border-beige-dark"
              >
                <p className="text-3xl mb-3">{icon}</p>
                <p className="font-bold text-brown mb-1">{title}</p>
                <p className="text-sm text-brown-light leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link
              href="/contact"
              className="inline-block bg-orange text-white font-bold px-8 py-3 rounded-full hover:bg-orange-light transition-colors"
            >
              参加お申し込み・お問い合わせ
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
