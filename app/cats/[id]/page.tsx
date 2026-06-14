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

      {/* Photo gallery */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <PhotoGallery
          images={images}
          catName={cat.name}
          emoji={cat.emoji}
          colorTheme={cat.color_theme}
        />
      </div>

      {/* Cat info */}
      <section className="max-w-2xl mx-auto px-4 py-8">
        {/* Name + badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h1 className="text-3xl font-bold text-latte">{cat.name}</h1>
          <span className="bg-caramel-light text-latte text-sm font-medium px-3 py-1 rounded-full">
            {cat.age}
          </span>
          <span
            className={`bg-gradient-to-r ${from} ${to} text-latte text-sm font-medium px-3 py-1 rounded-full`}
          >
            {cat.gender}
          </span>
        </div>

        {/* Tags */}
        {cat.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Description */}
        {cat.description && (
          <div className="bg-white rounded-3xl border border-caramel-light p-6 shadow-sm mb-8">
            <p className="text-xs font-semibold text-paw mb-3">自己紹介</p>
            <p className="text-latte text-sm leading-relaxed whitespace-pre-wrap">
              {cat.description}
            </p>
          </div>
        )}

        {/* Adoption CTA + modal */}
        <AdoptionSection catName={cat.name} catId={cat.id} />
      </section>
    </>
  );
}
