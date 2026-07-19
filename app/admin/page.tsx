"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const MENU_ITEMS = [
  {
    href: "/admin/qa",
    icon: "💬",
    title: "Q&A 管理",
    description: "よくある質問の追加・編集・削除",
    accent: "bg-paw-light border-paw",
    textAccent: "text-paw-dark",
  },
  {
    href: "/admin/shop",
    icon: "🛍️",
    title: "ショップ管理",
    description: "販売商品の登録・編集・削除",
    accent: "bg-peach-pale border-peach",
    textAccent: "text-peach-dark",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setEmail(session.user.email ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event !== "INITIAL_SESSION" && !session) {
          router.replace("/admin/login");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-latte-light text-sm">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Admin header */}
      <div className="bg-latte text-ivory px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-latte-light mb-0.5">ねこネコ市保護猫譲渡会</p>
          <h1 className="text-lg font-bold">管理ダッシュボード</h1>
        </div>
        <div className="flex items-center gap-4">
          {email && (
            <span className="text-xs text-latte-light hidden sm:block">{email}</span>
          )}
          <button
            onClick={handleLogout}
            className="text-xs bg-latte-light/20 hover:bg-latte-light/30 text-ivory px-3 py-1.5 rounded-full transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-sm text-latte-light mb-8">管理する項目を選択してください。</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MENU_ITEMS.map(({ href, icon, title, description, accent, textAccent }) => (
            <Link
              key={href}
              href={href}
              className={`block bg-white rounded-2xl border-2 ${accent} p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
            >
              <div className="text-3xl mb-3">{icon}</div>
              <p className={`font-bold text-base mb-1 ${textAccent}`}>{title}</p>
              <p className="text-xs text-latte-light leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>

        {/* Site preview links */}
        <div className="mt-10 pt-8 border-t border-caramel-light">
          <p className="text-xs font-semibold text-latte-light uppercase tracking-wider mb-3">
            公開ページを確認
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/", label: "トップ" },
              { href: "/qa", label: "Q&A" },
              { href: "/shop", label: "ショップ（非公開）" },
              { href: "/events", label: "譲渡会情報" },
              { href: "/cats", label: "猫を探す" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-latte-light hover:text-peach transition-colors border border-caramel-light px-3 py-1.5 rounded-full hover:border-peach"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
