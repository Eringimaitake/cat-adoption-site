import type { Metadata } from "next";
import Link from "next/link";
import { supabase, formatEventDateParts, type CatEvent } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "譲渡会情報",
};

// force-dynamic ensures events data is always fetched fresh from Supabase
export const dynamic = "force-dynamic";

const ACCENTS = ["bg-peach", "bg-sage", "bg-paw"];

export default async function EventsPage() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  const events: CatEvent[] = data ?? [];

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
          {error ? (
            <p className="text-center text-latte-light py-16 text-sm">
              データの読み込みに失敗しました。しばらくしてからお試しください。
            </p>
          ) : events.length === 0 ? (
            <p className="text-center text-latte-light py-16 text-sm">
              現在開催予定の譲渡会はありません。
            </p>
          ) : (
            events.map((ev, index) => {
              const { year, month, day, dayOfWeek } = formatEventDateParts(ev.event_date);
              const accent = ACCENTS[index % ACCENTS.length];
              const isNext = index === 0;

              return (
                <Link
                  key={ev.id}
                  href={`/events/${ev.id}`}
                  className="block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-caramel-light"
                >
                  {isNext && (
                    <div className="bg-peach text-white text-xs font-bold text-center py-1.5 tracking-wider">
                      🎉 次回開催
                    </div>
                  )}
                  <div className={`h-1.5 ${accent}`} />
                  <div className="p-6 flex flex-col sm:flex-row gap-6">
                    {/* Date badge */}
                    <div className={`${accent} text-white rounded-2xl text-center px-5 py-4 min-w-[90px] self-start shadow-sm`}>
                      <p className="text-xs opacity-80">{year}年</p>
                      <p className="text-xs opacity-80">{month}月</p>
                      <p className="text-4xl font-bold leading-none">{day}</p>
                      <p className="text-sm mt-1">({dayOfWeek})</p>
                    </div>
                    {/* Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-latte mb-3">{ev.title}</h2>
                      <dl className="space-y-1.5 text-sm">
                        <div className="flex gap-2">
                          <dt className="text-latte-light w-6">🕙</dt>
                          <dd className="text-latte">{ev.event_time ?? "時間未定"}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-latte-light w-6">📍</dt>
                          <dd className="text-latte">{ev.location ?? "場所未定"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
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
