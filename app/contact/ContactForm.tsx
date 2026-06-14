"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  agree: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  category: "",
  message: "",
  agree: false,
};

const fieldClass =
  "w-full border border-caramel-light bg-ivory rounded-2xl px-4 py-3 text-sm text-latte placeholder-latte-light/60 focus:outline-none focus:ring-2 focus:ring-peach/50 focus:border-peach transition-all";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.email.trim()) {
      e.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "正しいメールアドレスを入力してください";
    }
    if (!form.category) e.category = "お問い合わせ種別を選択してください";
    if (!form.message.trim()) e.message = "お問い合わせ内容を入力してください";
    if (!form.agree) e.agree = "同意が必要です";
    return e;
  };

  const handleChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-block bg-white rounded-4xl shadow-md border border-caramel-light p-10 max-w-md">
          <div className="text-6xl mb-5 animate-float inline-block">💌</div>
          <h2 className="text-2xl font-bold text-latte mb-3">
            お問い合わせを受け付けました
          </h2>
          <p className="text-latte-light text-sm leading-relaxed mb-8">
            ご連絡ありがとうございます。3営業日以内にご登録のメールアドレスへご返信いたします。
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-peach text-white font-bold px-8 py-3 rounded-full hover:bg-peach-dark transition-colors"
          >
            🏠 トップページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
        {errors.name && <p className="text-peach text-xs mt-1">{errors.name}</p>}
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
        {errors.email && <p className="text-peach text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-latte mb-1.5">
          電話番号 <span className="text-latte-light font-normal text-xs">（任意）</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          placeholder="000-0000-0000"
          className={fieldClass}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-latte mb-1.5">
          お問い合わせ種別 <span className="text-peach">*</span>
        </label>
        <select
          value={form.category}
          onChange={handleChange("category")}
          className={fieldClass}
        >
          <option value="">選択してください</option>
          <option value="里親希望">里親になりたい</option>
          <option value="譲渡会参加">譲渡会への参加について</option>
          <option value="保護相談">猫の保護相談</option>
          <option value="ボランティア">ボランティア参加</option>
          <option value="その他">その他</option>
        </select>
        {errors.category && <p className="text-peach text-xs mt-1">{errors.category}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-latte mb-1.5">
          お問い合わせ内容 <span className="text-peach">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={handleChange("message")}
          rows={5}
          placeholder="ご質問・ご要望をご記入ください"
          className={`${fieldClass} resize-none`}
        />
        {errors.message && <p className="text-peach text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Agree */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={handleChange("agree")}
            className="mt-0.5 w-4 h-4 accent-peach"
          />
          <span className="text-sm text-latte-light leading-relaxed">
            個人情報の取り扱いについて同意します。ご入力いただいた情報はお問い合わせへの回答のみに使用します。
          </span>
        </label>
        {errors.agree && <p className="text-peach text-xs mt-1 ml-7">{errors.agree}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-peach text-white font-bold py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 text-sm"
      >
        ✉️ 送信する
      </button>
    </form>
  );
}
