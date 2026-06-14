"use client";

import { useEffect, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  reason: string;
};

const initial: FormState = { name: "", email: "", phone: "", reason: "" };

const fieldClass =
  "w-full border border-caramel-light bg-ivory rounded-2xl px-4 py-3 text-sm text-latte placeholder-latte-light/60 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all";

export default function AdoptionSection({
  catName,
}: {
  catName: string;
  catId: number;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [showToast, setShowToast] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const validate = (): Partial<Record<keyof FormState, string>> => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.email.trim()) {
      e.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "正しいメールアドレスを入力してください";
    }
    if (!form.reason.trim()) e.reason = "お迎えしたい理由を入力してください";
    return e;
  };

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setOpen(false);
    setForm(initial);
    setErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  return (
    <>
      {/* CTA card */}
      <div className="text-center py-8 px-4 bg-gradient-to-r from-peach-pale to-paw-light rounded-3xl">
        <p className="text-3xl mb-3">🐾</p>
        <p className="text-latte font-semibold mb-1">{catName}ちゃんが気になりましたか？</p>
        <p className="text-latte-light text-sm mb-5">
          まずはお気軽に里親申し込みをどうぞ
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-peach text-white font-bold px-10 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        >
          この子の里親に応募する
        </button>
      </div>

      {/* Modal backdrop */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-caramel-light">
              <div>
                <h2
                  id="modal-title"
                  className="font-bold text-latte text-lg"
                >
                  里親申し込みフォーム
                </h2>
                <p className="text-xs text-latte-light mt-0.5">
                  {catName}ちゃんの里親に応募する
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-latte-light hover:text-latte text-2xl leading-none w-9 h-9 flex items-center justify-center rounded-full hover:bg-caramel-light transition-colors"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-latte mb-1.5">
                  お名前 <span className="text-peach">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="山田 花子"
                  className={fieldClass}
                />
                {errors.name && (
                  <p className="text-peach text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-latte mb-1.5">
                  メールアドレス <span className="text-peach">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="example@mail.com"
                  className={fieldClass}
                />
                {errors.email && (
                  <p className="text-peach text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-latte mb-1.5">
                  電話番号{" "}
                  <span className="text-latte-light font-normal text-xs">
                    （任意）
                  </span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="000-0000-0000"
                  className={fieldClass}
                />
              </div>

              {/* Reason / environment */}
              <div>
                <label className="block text-sm font-semibold text-latte mb-1.5">
                  お迎えしたい理由・飼育環境{" "}
                  <span className="text-peach">*</span>
                </label>
                <textarea
                  value={form.reason}
                  onChange={handleChange("reason")}
                  rows={4}
                  placeholder="お迎えしたい理由や、現在の飼育環境についてお聞かせください"
                  className={`${fieldClass} resize-none`}
                />
                {errors.reason && (
                  <p className="text-peach text-xs mt-1">{errors.reason}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-peach text-white font-bold py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-sm"
              >
                申し込みを送信する
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white border border-caramel-light rounded-2xl shadow-xl px-6 py-4 flex items-start gap-3 w-80">
            <span className="text-2xl mt-0.5">🐾</span>
            <div>
              <p className="font-bold text-latte text-sm">
                申し込みが完了しました！
              </p>
              <p className="text-latte-light text-xs mt-1 leading-relaxed">
                保護主からの連絡をお待ちください。
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
