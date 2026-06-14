import Link from "next/link";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/events", label: "譲渡会情報" },
  { href: "/cats", label: "猫を探す" },
  { href: "/process", label: "譲渡の流れ" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="bg-brown text-beige mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <span>🐱</span>
              <span>保護猫だより</span>
            </div>
            <p className="text-sm text-beige-dark leading-relaxed max-w-xs">
              保護猫の新しい家族を探す活動をしています。
              <br />
              一匹でも多くの猫が幸せになれるよう、
              <br />
              みなさまのご支援をお願いします。
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3 text-orange-light">
              サイトマップ
            </p>
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-beige-dark hover:text-beige transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold mb-3 text-orange-light">
              お問い合わせ
            </p>
            <ul className="space-y-1 text-sm text-beige-dark">
              <li>📧 info@hogo-neko.example.jp</li>
              <li>📞 000-0000-0000</li>
              <li>🕐 受付時間 10:00〜17:00（土日祝除く）</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-brown-light text-center text-xs text-beige-dark">
          © 2026 保護猫だより. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
