"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ShopProduct } from "@/lib/supabase";

type FormState = {
  name: string;
  description: string;
  price: string;
  image_url: string;
  is_available: boolean;
  display_order: string;
};

const EMPTY: FormState = {
  name: "",
  description: "",
  price: "",
  image_url: "",
  is_available: true,
  display_order: "",
};

function formatPrice(price: number) {
  return `¥${price.toLocaleString("ja-JP")}`;
}

export default function AdminShopPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      setError("データの取得に失敗しました: " + error.message);
    } else {
      setProducts(data ?? []);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setLoading(false);
      fetchProducts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event !== "INITIAL_SESSION" && !session) {
          router.replace("/admin/login");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [router, fetchProducts]);

  function flash(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  }

  async function handleAdd() {
    if (!addForm.name.trim() || !addForm.price.trim()) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase.from("shop_products").insert({
      name: addForm.name.trim(),
      description: addForm.description.trim() || null,
      price: parseInt(addForm.price) || 0,
      image_url: addForm.image_url.trim() || null,
      is_available: addForm.is_available,
      display_order: parseInt(addForm.display_order) || 0,
    });
    if (error) {
      setError("追加に失敗しました: " + error.message);
    } else {
      setAddForm(EMPTY);
      setShowAdd(false);
      flash("商品を追加しました");
      fetchProducts();
    }
    setSaving(false);
  }

  function startEdit(product: ShopProduct) {
    setEditId(product.id);
    setEditForm({
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      image_url: product.image_url ?? "",
      is_available: product.is_available,
      display_order: String(product.display_order),
    });
  }

  async function handleUpdate(id: number) {
    if (!editForm.name.trim() || !editForm.price.trim()) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("shop_products")
      .update({
        name: editForm.name.trim(),
        description: editForm.description.trim() || null,
        price: parseInt(editForm.price) || 0,
        image_url: editForm.image_url.trim() || null,
        is_available: editForm.is_available,
        display_order: parseInt(editForm.display_order) || 0,
      })
      .eq("id", id);
    if (error) {
      setError("更新に失敗しました: " + error.message);
    } else {
      setEditId(null);
      flash("商品を更新しました");
      fetchProducts();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("この商品を削除しますか？この操作は取り消せません。")) return;
    setError(null);
    const { error } = await supabase.from("shop_products").delete().eq("id", id);
    if (error) {
      setError("削除に失敗しました: " + error.message);
    } else {
      flash("商品を削除しました");
      fetchProducts();
    }
  }

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
          <a href="/admin" className="text-xs text-latte-light hover:text-ivory transition-colors mb-0.5 inline-block">
            ← ダッシュボード
          </a>
          <h1 className="text-lg font-bold">ショップ管理</h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/shop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-latte-light hover:text-ivory transition-colors"
          >
            ショップページを確認 ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-xs bg-latte-light/20 hover:bg-latte-light/30 text-ivory px-3 py-1.5 rounded-full transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm flex items-start justify-between gap-2">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="shrink-0 text-red-400 hover:text-red-600">✕</button>
          </div>
        )}
        {success && (
          <div className="bg-sage-light border border-sage text-sage-dark px-4 py-3 rounded-xl mb-5 text-sm">
            ✓ {success}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-latte-light">
            <span className="font-bold text-latte">{products.length}</span> 件の商品
          </p>
          <button
            onClick={() => { setShowAdd(!showAdd); setEditId(null); }}
            className="bg-peach text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-peach-dark transition-colors"
          >
            + 新規追加
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="bg-white rounded-2xl border border-caramel-light shadow-sm p-6 mb-6">
            <h2 className="font-bold text-latte mb-4">新規商品追加</h2>
            <ProductForm
              form={addForm}
              onChange={setAddForm}
              onSubmit={handleAdd}
              onCancel={() => { setShowAdd(false); setAddForm(EMPTY); }}
              saving={saving}
              submitLabel="追加する"
            />
          </div>
        )}

        {/* Product list */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-caramel-light p-10 text-center text-latte-light text-sm">
            商品がまだ登録されていません。「新規追加」から追加してください。
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-caramel-light shadow-sm overflow-hidden"
              >
                {editId === product.id ? (
                  <div className="p-6">
                    <h3 className="font-bold text-latte mb-4">編集中 (ID: {product.id})</h3>
                    <ProductForm
                      form={editForm}
                      onChange={setEditForm}
                      onSubmit={() => handleUpdate(product.id)}
                      onCancel={() => setEditId(null)}
                      saving={saving}
                      submitLabel="保存する"
                    />
                  </div>
                ) : (
                  <div className="p-5 flex items-start gap-4">
                    {/* Thumbnail */}
                    {product.image_url ? (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-ivory">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-caramel-light flex items-center justify-center shrink-0 text-2xl">
                        🛍️
                      </div>
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs bg-caramel-light text-latte-light px-2 py-0.5 rounded-full">
                              順: {product.display_order}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                product.is_available
                                  ? "bg-sage-light text-sage-dark"
                                  : "bg-red-50 text-red-500"
                              }`}
                            >
                              {product.is_available ? "販売中" : "販売準備中"}
                            </span>
                            <span className="text-xs text-latte-light/60">ID: {product.id}</span>
                          </div>
                          <p className="font-semibold text-latte text-sm mb-1 leading-snug">{product.name}</p>
                          <p className="text-base font-bold text-peach mb-1">{formatPrice(product.price)}</p>
                          {product.description && (
                            <p className="text-xs text-latte-light leading-relaxed line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => { startEdit(product); setShowAdd(false); }}
                            className="text-xs bg-paw-light text-paw font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-xs bg-red-50 text-red-500 font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Product form ──────────────────────────────────────────────────────────────

function ProductForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  saving,
  submitLabel,
}: {
  form: FormState;
  onChange: (f: FormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  submitLabel: string;
}) {
  const isValid = form.name.trim().length > 0 && form.price.trim().length > 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          商品名 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="例: ねこネコ市オリジナルトートバッグ"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          説明
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          rows={4}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach resize-y"
          placeholder="商品の説明を入力してください"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          価格（円） <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => onChange({ ...form, price: e.target.value })}
          className="w-36 border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="1000"
          min="0"
          step="1"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          画像URL
        </label>
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => onChange({ ...form, image_url: e.target.value })}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          表示順（小さい数字が先に表示されます）
        </label>
        <input
          type="number"
          value={form.display_order}
          onChange={(e) => onChange({ ...form, display_order: e.target.value })}
          className="w-28 border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="10"
          min="0"
          step="1"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_available"
          checked={form.is_available}
          onChange={(e) => onChange({ ...form, is_available: e.target.checked })}
          className="w-4 h-4 accent-peach"
        />
        <label htmlFor="is_available" className="text-sm text-latte font-medium cursor-pointer">
          販売中（チェックを外すと「販売準備中」として表示）
        </label>
      </div>
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onSubmit}
          disabled={saving || !isValid}
          className="bg-peach text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-peach-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "保存中..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-latte-light font-semibold px-6 py-2.5 rounded-full text-sm border border-caramel-light hover:bg-caramel-light transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
