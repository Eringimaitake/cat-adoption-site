import { createClient } from '@supabase/supabase-js'

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
  created_at: string
  // Profile
  location: string | null
  breed: string | null
  // Health
  has_vaccine: boolean | null
  is_neutered: boolean | null
  fiv_status: boolean | null   // true = 陰性, false = 陽性
  felv_status: boolean | null  // true = 陰性, false = 陽性
  // Applicant conditions
  single_applicant_allowed: boolean | null
  elderly_applicant_allowed: boolean | null
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
  created_at: string
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

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
