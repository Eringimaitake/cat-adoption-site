"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { QaEntry } from "@/lib/supabase";

type FormState = {
  question: string;
  answer: string;
  category: string;
  display_order: string;
};
const EMPTY: FormState = { question: "", answer: "", category: "", display_order: "" };

export default function AdminQaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<QaEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(EMPTY);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from("qa")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) {
      setError("データの取得に失敗しました: " + error.message);
    } else {
      setItems(data ?? []);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setLoading(false);
      fetchItems();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event !== "INITIAL_SESSION" && !session) {
          router.replace("/admin/login");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [router, fetchItems]);

  function flash(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  }

  async function handleAdd() {
    if (!addForm.question.trim() || !addForm.answer.trim()) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase.from("qa").insert({
      question: addForm.question.trim(),
      answer: addForm.answer.trim(),
      category: addForm.category.trim(),
      display_order: parseInt(addForm.display_order) || 0,
    });
    if (error) {
      setError("追加に失敗しました: " + error.message);
    } else {
      setAddForm(EMPTY);
      setShowAdd(false);
      flash("Q&Aを追加しました");
      fetchItems();
    }
    setSaving(false);
  }

  function startEdit(item: QaEntry) {
    setEditId(item.id);
    setEditForm({
      question: item.question,
      answer: item.answer,
      category: item.category ?? "",
      display_order: String(item.display_order),
    });
  }

  async function handleUpdate(id: number) {
    if (!editForm.question.trim() || !editForm.answer.trim()) return;
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("qa")
      .update({
        question: editForm.question.trim(),
        answer: editForm.answer.trim(),
        category: editForm.category.trim(),
        display_order: parseInt(editForm.display_order) || 0,
      })
      .eq("id", id);
    if (error) {
      setError("更新に失敗しました: " + error.message);
    } else {
      setEditId(null);
      flash("Q&Aを更新しました");
      fetchItems();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("このQ&Aを削除しますか？この操作は取り消せません。")) return;
    setError(null);
    const { error } = await supabase.from("qa").delete().eq("id", id);
    if (error) {
      setError("削除に失敗しました: " + error.message);
    } else {
      flash("Q&Aを削除しました");
      fetchItems();
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  // Derive unique categories from current items (preserving display_order-based order)
  const categoryOptions: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const cat = item.category ?? "";
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      categoryOptions.push(cat);
    }
  }

  // Group items by category for display
  const grouped: { label: string; items: QaEntry[] }[] = [];
  const catMap = new Map<string, QaEntry[]>();
  for (const item of items) {
    const cat = item.category ?? "未分類";
    const existing = catMap.get(cat);
    if (existing) {
      existing.push(item);
    } else {
      catMap.set(cat, [item]);
    }
  }
  for (const [label, catItems] of catMap.entries()) {
    grouped.push({ label, items: catItems });
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
      {/* ── Admin Header ── */}
      <div className="bg-latte text-ivory px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-latte-light mb-0.5">ねこネコ市保護猫譲渡会</p>
          <h1 className="text-lg font-bold">Q&A 管理</h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/qa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-latte-light hover:text-ivory transition-colors"
          >
            公開ページを確認 ↗
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
            <span className="font-bold text-latte">{items.length}</span> 件のQ&A
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
            <h2 className="font-bold text-latte mb-4">新規Q&A追加</h2>
            <QaForm
              form={addForm}
              onChange={setAddForm}
              onSubmit={handleAdd}
              onCancel={() => { setShowAdd(false); setAddForm(EMPTY); }}
              saving={saving}
              submitLabel="追加する"
              categoryOptions={categoryOptions}
            />
          </div>
        )}

        {/* Items grouped by category */}
        {grouped.length === 0 ? (
          <div className="bg-white rounded-2xl border border-caramel-light p-10 text-center text-latte-light text-sm">
            Q&Aがまだ登録されていません。「新規追加」から追加してください。
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(({ label, items: catItems }) => (
              <div key={label}>
                {/* Category heading */}
                <h2 className="text-xs font-bold text-latte-light uppercase tracking-wider mb-3 pb-2 border-b border-caramel-light">
                  {label}（{catItems.length}件）
                </h2>
                <div className="space-y-4">
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-caramel-light shadow-sm overflow-hidden"
                    >
                      {editId === item.id ? (
                        <div className="p-6">
                          <h3 className="font-bold text-latte mb-4">編集中 (ID: {item.id})</h3>
                          <QaForm
                            form={editForm}
                            onChange={setEditForm}
                            onSubmit={() => handleUpdate(item.id)}
                            onCancel={() => setEditId(null)}
                            saving={saving}
                            submitLabel="保存する"
                            categoryOptions={categoryOptions}
                          />
                        </div>
                      ) : (
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                                <span className="text-xs bg-caramel-light text-latte-light px-2 py-0.5 rounded-full">
                                  順: {item.display_order}
                                </span>
                                {item.category && (
                                  <span className="text-xs bg-paw-light text-paw-dark px-2 py-0.5 rounded-full">
                                    {item.category}
                                  </span>
                                )}
                                <span className="text-xs text-latte-light/60">ID: {item.id}</span>
                              </div>
                              <p className="font-semibold text-latte text-sm mb-2 leading-snug">
                                Q: {item.question}
                              </p>
                              <p className="text-sm text-latte-light leading-relaxed line-clamp-2">
                                A: {item.answer}
                              </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => { startEdit(item); setShowAdd(false); }}
                                className="text-xs bg-paw-light text-paw font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
                              >
                                編集
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="text-xs bg-red-50 text-red-500 font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared form component ─────────────────────────────────────────────────────

function QaForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  saving,
  submitLabel,
  categoryOptions,
}: {
  form: FormState;
  onChange: (f: FormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
  submitLabel: string;
  categoryOptions: string[];
}) {
  const isValid = form.question.trim().length > 0 && form.answer.trim().length > 0;
  const datalistId = "qa-category-options";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          カテゴリ
        </label>
        <input
          type="text"
          list={datalistId}
          value={form.category}
          onChange={(e) => onChange({ ...form, category: e.target.value })}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="例: トイレ・粗相（新しいカテゴリ名も入力可）"
        />
        <datalist id={datalistId}>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          質問 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={form.question}
          onChange={(e) => onChange({ ...form, question: e.target.value })}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach"
          placeholder="例: トイレをなかなか覚えてくれません"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-latte-light mb-1.5">
          回答 <span className="text-red-400">*</span>
        </label>
        <textarea
          value={form.answer}
          onChange={(e) => onChange({ ...form, answer: e.target.value })}
          rows={6}
          className="w-full border border-caramel-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-peach resize-y"
          placeholder="回答を入力してください"
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
        <p className="text-xs text-latte-light/70 mt-1">
          カテゴリ内の並び順を揃えるには 100番台・200番台… の採番が便利です
        </p>
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
