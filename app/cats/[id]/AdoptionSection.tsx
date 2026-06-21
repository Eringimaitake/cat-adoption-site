"use client";

import { useState } from "react";

const ADOPTION_FORM_URL = "https://forms.gle/NExWo9rVmZTJX1wQ6";

export default function AdoptionSection({ catName }: { catName: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(catName);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch {
      // Clipboard API unavailable — form still opens; user can type the name manually
    }
  };

  return (
    <div className="text-center py-8 px-4 bg-gradient-to-r from-peach-pale to-paw-light rounded-3xl">
      <p className="text-3xl mb-3">🐾</p>
      <p className="text-latte font-semibold mb-1">
        {catName}ちゃんが気になりましたか？
      </p>
      <p className="text-latte-light text-sm mb-5">
        まずはお気軽に里親申し込みをどうぞ
      </p>
      <a
        href={ADOPTION_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-2 bg-peach text-white font-bold px-10 py-3.5 rounded-full shadow hover:bg-peach-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
      >
        この子の里親に応募する
        <span aria-hidden="true">↗</span>
      </a>

      <p className="text-latte-light text-xs mt-3 leading-relaxed">
        （外部フォームが開きます）
        <br />
        🐱 ボタンを押すと「{catName}」という名前が自動でコピーされます。
        <br />
        フォーム内の該当項目に貼り付けてご記入ください。
      </p>

      {copied && (
        <p className="text-sage-dark text-xs font-semibold mt-2 animate-fade-in">
          ✓「{catName}」をコピーしました
        </p>
      )}
    </div>
  );
}
