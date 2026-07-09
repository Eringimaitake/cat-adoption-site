"use client";

import { useState } from "react";
import type { QaEntry } from "@/lib/supabase";
import { CATEGORY_STYLE, DEFAULT_STYLE } from "./categoryStyles";

type CategoryGroup = { label: string; items: QaEntry[] };
type Props = { groups: CategoryGroup[] };

export default function QaAccordion({ groups }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  const hasItems = groups.some((g) => g.items.length > 0);
  if (!hasItems) {
    return (
      <p className="text-center text-latte-light text-sm py-12 bg-white rounded-2xl border border-caramel-light">
        Q&Aはまだ登録されていません。
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {groups.map(({ label, items }, i) => {
        const style = CATEGORY_STYLE[label] ?? DEFAULT_STYLE;
        return (
          <div
            key={label}
            id={`cat-${i}`}
            style={{ scrollMarginTop: "80px" }}
          >
            {/* Section label */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${style.tagBg} ${style.tagText} font-semibold text-sm mb-4`}
            >
              <span>{style.icon}</span>
              <span>{label}</span>
            </div>

            {/* Accordion items */}
            <div className="space-y-3">
              {items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl overflow-hidden border-l-4 ${style.border} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                      className="w-full flex items-start gap-3 px-5 py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="w-7 h-7 rounded-xl bg-paw-light text-paw text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        Q
                      </span>
                      <span className="flex-1 font-semibold text-latte text-sm leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`text-latte-light text-lg font-light shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-xl bg-sage-light text-sage text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                            A
                          </span>
                          <p className="text-sm text-latte-light leading-relaxed whitespace-pre-wrap">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
