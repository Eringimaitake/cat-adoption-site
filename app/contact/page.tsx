import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

const contactInfo = [
  { icon: "📧", label: "メール", value: "takonekokai@gmail.com" },
  { icon: "🕐", label: "受付時間", value: "10:00〜17:00（土日祝除く）" },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-paw-light via-ivory to-peach-pale py-16 px-4 text-center relative overflow-hidden">
        <span className="absolute top-4 right-8 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-4 left-6 text-4xl opacity-10">🐾</span>
        <p className="text-paw font-semibold text-sm mb-2">CONTACT</p>
        <h1 className="text-3xl font-bold text-latte mb-2">お問い合わせ</h1>
        <p className="text-latte-light text-sm">どんな小さなことでも、お気軽にご相談ください</p>
      </section>

      <section className="py-14 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {contactInfo.map(({ icon, label, value }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-caramel-light p-5 text-center shadow-sm"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-xs text-latte-light mb-0.5">{label}</p>
                <p className="text-sm font-medium text-latte">{value}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl shadow-md border border-caramel-light p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">💬</span>
              <h2 className="text-lg font-bold text-latte">お問い合わせフォーム</h2>
            </div>
            <ContactForm />
          </div>

          <p className="text-center text-xs text-latte-light mt-6 leading-relaxed">
            内容によっては返信にお時間をいただく場合があります。
            <br />
            3営業日を過ぎてもご返信がない場合は、お手数ですが再度メールにてご確認ください。
          </p>
        </div>
      </section>
    </>
  );
}
