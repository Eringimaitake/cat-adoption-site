"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/guide", label: "ガイド" },
  { href: "/events", label: "譲渡会情報" },
  { href: "/cats", label: "猫を探す" },
  { href: "/qa", label: "Q&A" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-caramel-light shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="text-2xl group-hover:animate-float-sm transition-all">🐱</span>
          <span className="font-bold text-lg text-caramel group-hover:text-peach transition-colors">
            保護猫だより
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive(href)
                  ? "bg-peach text-white shadow-sm"
                  : "text-latte-light hover:bg-peach-pale hover:text-peach"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-latte-light hover:bg-peach-pale transition-colors shrink-0"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-ivory border-t border-caramel-light px-4 py-3 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-peach text-white"
                  : "text-latte-light hover:bg-peach-pale hover:text-peach"
              }`}
            >
              <span className="text-base">🐾</span>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
