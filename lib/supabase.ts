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
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
