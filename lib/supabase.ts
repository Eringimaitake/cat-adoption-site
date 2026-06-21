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
  fiv_status: boolean | null   // true = 陽性, false = 陰性
  felv_status: boolean | null  // true = 陽性, false = 陰性
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

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
