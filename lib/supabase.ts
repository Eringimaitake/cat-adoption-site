import { createClient } from '@supabase/supabase-js'

// Status values stored in Supabase
export type CatStatus = 'available' | 'trial' | 'adopted'

export const CAT_STATUS_LABEL: Record<string, string> = {
  available: '募集中',
  trial:     'トライアル中',
  adopted:   '里親決定',
}

// Tailwind badge classes — listed explicitly so the scanner includes them at build time
export const CAT_STATUS_BADGE: Record<string, string> = {
  available: 'bg-pink-100 text-pink-600',
  trial:     'bg-orange-100 text-orange-700',
  adopted:   'bg-sage-light text-sage-dark',
}

export type Cat = {
  id: number
  name: string
  age: string
  gender: string
  description: string | null
  image_url: string | null
  tags: string[]
  emoji: string
  color_theme: string
  is_adopted: boolean
  status: CatStatus | null
  created_at: string
  // Profile
  location: string | null
  breed: string | null
  // Health
  has_vaccine: boolean | null
  is_neutered: boolean | null
  // 検査結果は boolean ではなく日本語文字列 ("陰性" / "陽性" / "未検査")。
  // 真偽値として評価すると空文字以外すべて truthy になり常に「陰性」表示になるため、
  // 表示時は必ず formatTestResult() を通すこと。
  fiv_status: string | null
  felv_status: string | null
  // Applicant conditions
  single_applicant_allowed: boolean | null
  elderly_applicant_allowed: boolean | null
  // Cover photo focal point — Supabase 側は numeric (default 0.5)。
  // PostgREST からは JSON の数値として返る (例: 0.5)。文字列ではない。
  // 0.0 = 左端/上端, 0.5 = 中央, 1.0 = 右端/下端。
  cover_focus_x: number | null
  cover_focus_y: number | null
  // Character & backstory
  personality: string | null
  rescue_story: string | null
  rescuer_name: string | null
  // 参加予定の譲渡会
  event_id: string | null
}

export type CatImage = {
  id: string
  cat_id: number
  image_url: string
  sort_order: number
  created_at: string
}

export type CatEvent = {
  id: string
  title: string
  event_date: string // "YYYY-MM-DD"
  location: string | null
  event_time: string | null
  image_url: string | null
  created_at: string
}

// ── カバー写真の表示位置 (focal point) ──
// 保護主がアプリで指定した焦点。cover_focus_x / cover_focus_y は numeric カラムで、
// PostgREST からは JSON の数値 (例: 0.5) として返る。
// 未設定 (null) や数値でない値は中央 (0.5) にフォールバックする。
export const COVER_FOCUS_DEFAULT = 0.5;

function toFocusPercent(value: number | null | undefined): number {
  const n = typeof value === "number" && Number.isFinite(value) ? value : COVER_FOCUS_DEFAULT;
  // 0〜1 の範囲外の値が入っていても CSS が壊れないようクランプする。
  const clamped = Math.min(Math.max(n, 0), 1);
  // 0.1 * 100 が 10.000000000000002 になるため小数第1位で丸める。
  return Math.round(clamped * 1000) / 10;
}

// <Image style={...}> にそのまま渡せる object-position を返す。
// 中央 (0.5, 0.5) の場合は "50% 50%" となり、これまでの表示と変わらない。
export function coverFocusStyle(
  x: number | null | undefined,
  y: number | null | undefined,
): { objectPosition: string } {
  return { objectPosition: `${toFocusPercent(x)}% ${toFocusPercent(y)}%` };
}

// ── FIV / FeLV 検査結果 ──
// Supabase の cats.fiv_status / cats.felv_status は text カラムで、
// 運営が Supabase 上で直接 "陰性" / "陽性" / "未検査" を入力している。
// 医療情報なので、値が読めない場合に「陰性」へ倒すことは絶対にしない。
export type TestResultTone = "negative" | "positive" | "unknown";

export type TestResultDisplay = {
  label: string;
  tone: TestResultTone;
};

export function formatTestResult(value: string | null | undefined): TestResultDisplay {
  const normalized = value?.trim() ?? "";
  if (normalized === "陰性") return { label: "陰性", tone: "negative" };
  if (normalized === "陽性") return { label: "陽性", tone: "positive" };
  // 未入力・null は「未検査」。想定外の値は勝手に判定せず、保存されている文字列をそのまま出す。
  if (normalized === "") return { label: "未検査", tone: "unknown" };
  return { label: normalized, tone: "unknown" };
}

// 検査結果が入力されているか（健康情報セクションの表示判定に使う）
export function hasTestResult(value: string | null | undefined): boolean {
  return (value?.trim() ?? "") !== "";
}

// "male"/"female" (stored by the app) → 日本語表示。それ以外の値はそのまま表示する。
export function formatGender(gender: string): string {
  const normalized = gender.trim().toLowerCase();
  if (normalized === "male") return "オス";
  if (normalized === "female") return "メス";
  return gender;
}

export function formatEventDateParts(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const dayOfWeek = dateObj.toLocaleDateString("ja-JP", { weekday: "short" });
  return { year, month, day, dayOfWeek };
}

export type QaEntry = {
  id: number
  question: string
  answer: string
  category: string
  display_order: number
  created_at: string
  updated_at: string
}

export type ShopProduct = {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
