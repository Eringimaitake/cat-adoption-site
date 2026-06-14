"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/events", label: "譲渡会情報" },
  { href: "/cats", label: "猫を探す" },
  { href: "/process", label: "譲渡の流れ" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-beige border-b-2 border-beige-dark sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-brown font-bold text-xl hover:text-sage transition-colors"
        >
          <span className="text-2xl">🐱</span>
          <span>保護猫だより</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-sage text-white"
                  : "text-brown-light hover:bg-sage-light hover:text-sage-dark"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-brown-light hover:bg-sage-light transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニューを開く"
        >
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current mb-1"></span>
          <span className="block w-5 h-0.5 bg-current"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-beige border-t border-beige-dark px-4 pb-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 mt-1 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-sage text-white"
                  : "text-brown-light hover:bg-sage-light hover:text-sage-dark"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
