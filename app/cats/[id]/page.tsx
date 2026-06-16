import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase, type Cat } from "@/lib/supabase";
import PhotoGallery from "./PhotoGallery";
import AdoptionSection from "./AdoptionSection";

export const dynamic = "force-dynamic";

// Gradient classes listed explicitly so Tailwind's scanner includes them
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase
    .from("cats")
    .select("name")
    .eq("id", Number(id))
    .single();
  return { title: data?.name ?? "猫の詳細" };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-caramel-light shadow-sm overflow-hidden mb-5">
      <div className="px-6 py-3 border-b border-caramel-light/70 bg-ivory/60">
        <p className="text-xs font-semibold tracking-wide text-paw">{title}</p>
      </div>
      {children}
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-4 px-6 py-3 even:bg-ivory/40">
      <dt className="text-xs text-latte-light w-20 shrink-0">{label}</dt>
      <dd className="text-sm text-latte font-medium">{value}</dd>
    </div>
  );
}

type TriState = boolean | null;

function StatusBadge({
  value,
  trueLabel,
  falseLabel,
  trueIsGood,
}: {
  value: TriState;
  trueLabel: string;
  falseLabel: string;
  trueIsGood: boolean;
}) {
  if (value === null) {
    return (
      <span className="inline-flex items-center text-xs bg-latte-pale text-latte-light font-medium px-3 py-1 rounded-full">
        不明
      </span>
    );
  }
  const good = trueIsGood ? value : !value;
  const label = value ? trueLabel : falseLabel;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
        good
          ? "bg-sage-light text-sage-dark"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {good ? "✓" : "–"} {label}
    </span>
  );
}

function ConditionBadge({ value }: { value: TriState }) {
  if (value === null) {
    return (
      <span className="inline-flex items-center text-xs bg-latte-pale text-latte-light font-medium px-3 py-1 rounded-full">
        不明
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
        value
          ? "bg-sage-light text-sage-dark"
          : "bg-peach-light text-peach-dark"
      }`}
    >
      {value ? "✓ 可" : "✕ 不可"}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function CatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) notFound();

  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .eq("id", numId)
    .single();

  if (error || !data) notFound();

  const cat = data as Cat;
  const images = cat.image_url ? [cat.image_url] : [];
  const { from, to } = COLOR_THEMES[cat.color_theme] ?? COLOR_THEMES.orange;

  const hasProfile = cat.breed !== null || cat.location !== null;
  const hasHealth =
    cat.has_vaccine !== null ||
    cat.is_neutered !== null ||
    cat.fiv_status !== null ||
    cat.felv_status !== null;
  const hasConditions =
    cat.single_applicant_allowed !== null ||
    cat.elderly_applicant_allowed !== null;

  return (
    <>
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Link
          href="/cats"
          className="inline-flex items-center gap-1 text-sm text-latte-light hover:text-peach transition-colors"
        >
          ← 猫一覧に戻る
        </Link>
      </div>

      {/* Photo gallery — wider than content for desktop impact */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <PhotoGallery
          images={images}
          catName={cat.name}
          emoji={cat.emoji}
          colorTheme={cat.color_theme}
        />
      </div>

      <section className="max-w-2xl mx-auto px-4 py-8">
        {/* ── Name header ── */}
        <div className="mb-5">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <h1 className="text-3xl font-bold text-latte">{cat.name}</h1>
            <span className="bg-caramel-light text-latte text-sm font-medium px-3 py-1 rounded-full">
              {cat.age}
            </span>
            <span
              className={`bg-gradient-to-r ${from} ${to} text-latte text-sm font-medium px-3 py-1 rounded-full`}
            >
              {cat.gender}
            </span>
            {cat.location && (
              <span className="flex items-center gap-1 text-sm text-latte-light">
                <span>📍</span>
                {cat.location}
              </span>
            )}
          </div>

          {/* Tags */}
          {cat.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-paw-light text-paw font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Profile info ── */}
        {hasProfile && (
          <SectionCard title="プロフィール">
            <dl className="divide-y divide-caramel-light/40">
              <ProfileRow label="種類" value={cat.breed} />
              <ProfileRow label="所在地" value={cat.location} />
            </dl>
          </SectionCard>
        )}

        {/* ── Health info ── */}
        {hasHealth && (
          <SectionCard title="健康情報">
            <div className="grid grid-cols-2 gap-px bg-caramel-light/40 divide-caramel-light/40">
              {/* has_vaccine */}
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">ワクチン</p>
                <StatusBadge
                  value={cat.has_vaccine}
                  trueLabel="接種済み"
                  falseLabel="未接種"
                  trueIsGood={true}
                />
              </div>

              {/* is_neutered */}
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">去勢・避妊</p>
                <StatusBadge
                  value={cat.is_neutered}
                  trueLabel="手術済み"
                  falseLabel="未手術"
                  trueIsGood={true}
                />
              </div>

              {/* fiv_status */}
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">猫エイズ (FIV)</p>
                <StatusBadge
                  value={cat.fiv_status}
                  trueLabel="陽性"
                  falseLabel="陰性"
                  trueIsGood={false}
                />
              </div>

              {/* felv_status */}
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">猫白血病 (FeLV)</p>
                <StatusBadge
                  value={cat.felv_status}
                  trueLabel="陽性"
                  falseLabel="陰性"
                  trueIsGood={false}
                />
              </div>
            </div>
          </SectionCard>
        )}

        {/* ── Description ── */}
        {cat.description && (
          <SectionCard title="自己紹介">
            <p className="px-6 py-5 text-latte text-sm leading-relaxed whitespace-pre-wrap">
              {cat.description}
            </p>
          </SectionCard>
        )}

        {/* ── Applicant conditions ── */}
        {hasConditions && (
          <SectionCard title="応募条件">
            <div className="grid grid-cols-2 gap-px bg-caramel-light/40">
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">単身者の応募</p>
                <ConditionBadge value={cat.single_applicant_allowed} />
              </div>
              <div className="bg-white px-5 py-4">
                <p className="text-xs text-latte-light mb-2">高齢者の応募</p>
                <ConditionBadge value={cat.elderly_applicant_allowed} />
              </div>
            </div>
          </SectionCard>
        )}

        {/* ── Adoption CTA ── */}
        <AdoptionSection catName={cat.name} catId={cat.id} />
      </section>
    </>
  );
}
