"use client";

import { useState } from "react";
import { categories } from "./data";

export default function QaAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.id} id={cat.id} className="scroll-mt-20">
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-11 h-11 rounded-2xl ${cat.tagBg} flex items-center justify-center text-2xl shadow-sm`}
            >
              {cat.icon}
            </div>
            <h2 className="text-xl font-bold text-latte">{cat.label}</h2>
            <span
              className={`text-xs font-semibold ${cat.tagBg} ${cat.tagText} px-2.5 py-0.5 rounded-full`}
            >
              {cat.items.length}件
            </span>
          </div>

          {/* Accordion items */}
          <div className="space-y-3">
            {cat.items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl overflow-hidden border-l-4 ${cat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start gap-3 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl ${cat.tagBg} ${cat.tagText} text-xs font-black flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      Q
                    </span>
                    <span className="flex-1 font-semibold text-latte text-sm leading-snug">
                      {item.q}
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
                        <p className="text-sm text-latte-light leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
