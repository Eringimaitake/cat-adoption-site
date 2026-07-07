import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, formatGender, type Cat, type CatEvent } from "@/lib/supabase";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-dynamic";

// Tailwind gradient pairs — defined here so Tailwind's scanner includes the classes at build time.
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

function formatDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.toLocaleDateString("ja-JP", { weekday: "short" });
  return `${year}年${month}月${day}日（${dayOfWeek}）`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("events")
    .select("title, event_date, location, event_time")
    .eq("id", id)
    .single();

  const title = data?.title ?? "譲渡会の詳細";
  const desc = data
    ? `${data.event_date}開催「${data.title}」。場所：${data.location ?? "未定"}、時間：${data.event_time ?? "未定"}。保護猫たちに会いに来てください。`
    : "保護猫の譲渡会情報です。";

  return {
    title,
    description: desc,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: eventData, error: eventError }, { data: catRows }] = await Promise.all([
    supabase.from("events").select("*").eq("id", id).single(),
    supabase
      .from("cats")
      .select("*")
      .eq("event_id", id)
      .eq("is_adopted", false)
      .order("created_at", { ascending: false }),
  ]);

  if (eventError || !eventData) notFound();

  const event = eventData as CatEvent;
  const cats: Cat[] = catRows ?? [];

  return (
    <>
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-sm text-latte-light hover:text-peach transition-colors"
        >
          ← 譲渡会一覧に戻る
        </Link>
      </div>

      {/* Header banner */}
      <section className="max-w-3xl mx-auto px-4 mt-4">
        <div className="bg-gradient-to-br from-peach to-paw rounded-3xl p-8 text-white shadow-sm">
          <p className="text-sm font-medium opacity-90 mb-1">🐾 譲渡会</p>
          <h1 className="text-2xl font-bold leading-relaxed">{event.title}</h1>
        </div>
      </section>

      {/* Event info */}
      <section className="max-w-3xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl border border-caramel-light shadow-sm divide-y divide-caramel-light/40">
          <div className="flex items-center gap-4 px-6 py-4">
            <span className="text-latte-light w-6 text-center">📅</span>
            <div>
              <p className="text-xs text-latte-light">開催日</p>
              <p className="text-sm font-semibold text-latte">{formatDate(event.event_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <span className="text-latte-light w-6 text-center">🕙</span>
            <div>
              <p className="text-xs text-latte-light">開催時間</p>
              <p className="text-sm font-semibold text-latte">{event.event_time ?? "時間未定"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-6 py-4">
            <span className="text-latte-light w-6 text-center">📍</span>
            <div>
              <p className="text-xs text-latte-light">開催場所</p>
              <p className="text-sm font-semibold text-latte">{event.location ?? "場所未定"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            startDate: event.event_date,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: event.location ?? "場所未定",
            },
            organizer: {
              "@type": "Organization",
              name: "保護猫だより",
              url: SITE_URL,
            },
            url: `${SITE_URL}/events/${event.id}`,
            ...(event.event_time && {
              description: `開催時間：${event.event_time}`,
            }),
          }),
        }}
      />

      {/* Participating cats */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-latte mb-6">
          参加予定の猫たち
          {cats.length > 0 && (
            <span className="text-sm font-normal text-latte-light ml-2">{cats.length}匹</span>
          )}
        </h2>

        {cats.length === 0 ? (
          <p className="text-center text-latte-light py-12 text-sm bg-white rounded-3xl border border-caramel-light">
            参加予定の猫はまだ登録されていません。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cats.map((cat) => {
              const { from, to } = getTheme(cat.color_theme);
              return (
                <Link
                  key={cat.id}
                  href={`/cats/${cat.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-caramel-light block"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${from} ${to} flex items-center justify-center relative overflow-hidden`}
                  >
                    {cat.image_url ? (
                      <Image
                        fill
                        src={cat.image_url}
                        alt={cat.name}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-500 drop-shadow">
                        {cat.emoji}
                      </span>
                    )}
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
                    <p className="text-xs text-latte-light leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
