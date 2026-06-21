"use client";

import { useState } from "react";

export default function CopyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — value remains visible to copy manually
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="text-xs text-latte-light mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-latte break-all">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 ${
          copied
            ? "bg-sage text-white"
            : "bg-caramel-light text-latte hover:bg-peach hover:text-white"
        }`}
      >
        {copied ? "✓ コピー済み" : "コピー"}
      </button>
    </div>
  );
}
