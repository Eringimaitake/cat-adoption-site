import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/cats`,          lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/events`,        lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/guide`,         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/process`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/qa`,            lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/donate`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`,       lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const [{ data: cats }, { data: events }] = await Promise.all([
    supabase.from("cats").select("id, created_at").eq("is_adopted", false),
    supabase.from("events").select("id, created_at"),
  ]);

  const catEntries: MetadataRoute.Sitemap = (cats ?? []).map((cat) => ({
    url: `${BASE_URL}/cats/${cat.id}`,
    lastModified: new Date(cat.created_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const eventEntries: MetadataRoute.Sitemap = (events ?? []).map((ev) => ({
    url: `${BASE_URL}/events/${ev.id}`,
    lastModified: new Date(ev.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...catEntries, ...eventEntries];
}
