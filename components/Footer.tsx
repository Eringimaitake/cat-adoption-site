import Link from "next/link";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/events", label: "譲渡会情報" },
  { href: "/cats", label: "猫を探す" },
  { href: "/process", label: "譲渡の流れ" },
  { href: "/donate", label: "ご支援のお願い" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="bg-latte text-ivory mt-20">
      {/* Wave top */}
      <div className="h-8 bg-ivory" style={{ clipPath: "ellipse(55% 100% at 50% 0%)" }} />

      <div className="max-w-5xl mx-auto px-4 pt-4 pb-10">
        <div className="flex flex-col md:flex-row gap-10 justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <span>🐱</span>
              <span className="text-peach-light">ねこネコ市保護猫譲渡会</span>
            </div>
            <p className="text-sm text-latte-light leading-relaxed">
              保護主の方々の活動を支援し、保護された猫たちが新しい家族と出会えるようサポートしています。一匹でも多くの猫が幸せな生活を送れますように。
            </p>
            <div className="flex gap-3 mt-4 text-xl">
              <span title="保護猫">🐾</span>
              <span title="里親">🏠</span>
              <span title="猫">🐱</span>
              <span title="愛情">💕</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold text-peach-light uppercase tracking-wider mb-3">
              ページ
            </p>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-latte-light hover:text-ivory transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-xs text-peach">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-peach-light uppercase tracking-wider mb-3">
              お問い合わせ
            </p>
            <ul className="space-y-2.5 text-sm text-latte-light">
              <li className="flex items-start gap-2">
                <span>📧</span>
                <span>takonekokai@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🕐</span>
                <span>10:00〜17:00<br />（土日祝除く）</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-latte-light/30 text-center text-xs text-latte-light">
          © 2026 ねこネコ市保護猫譲渡会. All rights reserved. 🐾
        </div>
      </div>
    </footer>
  );
}
