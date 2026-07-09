export type CategoryStyle = {
  icon: string;
  tagBg: string;
  tagText: string;
  border: string;
};

export const CATEGORY_STYLE: Record<string, CategoryStyle> = {
  "トイレ・粗相":   { icon: "🚽", tagBg: "bg-sage-light",    tagText: "text-sage-dark",    border: "border-sage" },
  "食事・食欲":    { icon: "🍽️", tagBg: "bg-orange-100",    tagText: "text-orange-700",   border: "border-orange-300" },
  "夜鳴き・行動":  { icon: "🌙", tagBg: "bg-paw-light",     tagText: "text-paw-dark",     border: "border-paw" },
  "先住猫との関係": { icon: "🐈", tagBg: "bg-caramel-light", tagText: "text-caramel-dark", border: "border-caramel" },
  "健康・病気":    { icon: "💊", tagBg: "bg-peach-light",   tagText: "text-peach-dark",   border: "border-peach" },
};

export const DEFAULT_STYLE: CategoryStyle = {
  icon: "❓",
  tagBg: "bg-caramel-light",
  tagText: "text-caramel-dark",
  border: "border-paw",
};
