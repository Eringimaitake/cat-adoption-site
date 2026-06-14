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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

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
    if (!form.agree) e.agree = "個人情報の取り扱いに同意してください";
    return e;
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

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">💌</p>
          <h1 className="text-2xl font-bold text-brown mb-3">
            お問い合わせを受け付けました
          </h1>
          <p className="text-brown-light mb-6 leading-relaxed">
            ご連絡いただきありがとうございます。
            <br />
            3営業日以内にご登録のメールアドレスへご返信いたします。
          </p>
          <Link
            href="/"
            className="inline-block bg-sage text-white font-bold px-8 py-3 rounded-full hover:bg-sage-dark transition-colors"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page header */}
      <section className="bg-sage-light py-14 px-4 text-center">
        <h1 className="text-3xl font-bold text-brown mb-2">お問い合わせ</h1>
        <p className="text-brown-light">
          ご不明な点はお気軽にご連絡ください
        </p>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "📧", label: "メール", value: "info@hogo-neko.example.jp" },
              { icon: "📞", label: "電話", value: "000-0000-0000" },
              { icon: "🕐", label: "受付時間", value: "10:00〜17:00（土日祝除く）" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-beige border border-beige-dark rounded-xl p-4 text-center text-sm"
              >
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-brown-light text-xs mb-0.5">{label}</p>
                <p className="text-brown font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                お名前 <span className="text-orange">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="山田 花子"
                className="w-full border border-beige-dark rounded-lg px-4 py-2.5 text-sm bg-beige placeholder-brown-light/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
              {errors.name && (
                <p className="text-orange text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                メールアドレス <span className="text-orange">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="example@mail.com"
                className="w-full border border-beige-dark rounded-lg px-4 py-2.5 text-sm bg-beige placeholder-brown-light/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
              {errors.email && (
                <p className="text-orange text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                電話番号
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="000-0000-0000"
                className="w-full border border-beige-dark rounded-lg px-4 py-2.5 text-sm bg-beige placeholder-brown-light/50 focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                お問い合わせ種別 <span className="text-orange">*</span>
              </label>
              <select
                value={form.category}
                onChange={set("category")}
                className="w-full border border-beige-dark rounded-lg px-4 py-2.5 text-sm bg-beige text-brown focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <option value="">選択してください</option>
                <option value="里親希望">里親になりたい</option>
                <option value="譲渡会参加">譲渡会への参加</option>
                <option value="保護相談">猫の保護相談</option>
                <option value="ボランティア">ボランティア参加</option>
                <option value="その他">その他</option>
              </select>
              {errors.category && (
                <p className="text-orange text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-brown mb-1">
                お問い合わせ内容 <span className="text-orange">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={set("message")}
                rows={5}
                placeholder="ご質問・ご要望をご記入ください"
                className="w-full border border-beige-dark rounded-lg px-4 py-2.5 text-sm bg-beige placeholder-brown-light/50 focus:outline-none focus:ring-2 focus:ring-sage resize-none"
              />
              {errors.message && (
                <p className="text-orange text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Agree */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer text-sm text-brown-light">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={set("agree")}
                  className="mt-0.5 accent-sage"
                />
                <span>
                  個人情報の取り扱いについて同意します。ご入力いただいた情報はお問い合わせへの回答のみに使用します。
                </span>
              </label>
              {errors.agree && (
                <p className="text-orange text-xs mt-1">{errors.agree}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange text-white font-bold py-3 rounded-full hover:bg-orange-light transition-colors text-sm"
            >
              送信する
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
