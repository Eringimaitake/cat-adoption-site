"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ShopProduct } from "@/lib/supabase";

function formatPrice(price: number) {
  return `¥${price.toLocaleString("ja-JP")}`;
}

export default function ShopPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("shop_products")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        setError("商品の取得に失敗しました。");
      } else {
        setProducts(data ?? []);
      }
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-latte-light text-sm">読み込み中...</p>
      </div>
    );
  }

  return (
    <>
      {/* Notice banner — admin only */}
      <div className="bg-latte/10 border-b border-caramel-light px-4 py-2 text-center">
        <p className="text-xs text-latte-light">
          🔒 このページは現在非公開です（管理者のみ閲覧可）
          <Link href="/admin/shop" className="ml-3 text-peach hover:underline">
            商品を管理する →
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-peach-pale via-ivory to-paw-light py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🛍️</span>
        <span className="absolute bottom-4 left-8 text-4xl opacity-10">🐾</span>
        <p className="text-peach font-semibold text-sm mb-2">SHOP</p>
        <h1 className="text-3xl font-bold text-latte mb-2">ショップ</h1>
        <p className="text-latte-light text-sm">猫グッズ・支援グッズをご紹介します</p>
      </section>

      {/* Products */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          {error ? (
            <p className="text-center text-latte-light py-16 text-sm">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-latte-light py-16 text-sm">
              現在販売中の商品はありません。
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-caramel-light flex flex-col"
                >
                  {/* Image area */}
                  <div className="relative w-full aspect-square bg-ivory">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        🛍️
                      </div>
                    )}
                    {/* Unavailable overlay */}
                    {!product.is_available && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="bg-white/90 text-latte text-xs font-bold px-3 py-1.5 rounded-full">
                          販売準備中
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="font-bold text-latte text-base mb-1 leading-snug">{product.name}</p>
                    <p className="text-xl font-bold text-peach mb-2">{formatPrice(product.price)}</p>
                    {product.description && (
                      <p className="text-xs text-latte-light leading-relaxed flex-1">
                        {product.description}
                      </p>
                    )}
                    {!product.is_available && (
                      <p className="text-xs text-latte-light/60 mt-3">※ 現在販売準備中です</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
