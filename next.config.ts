import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdoxkjpdwsiplupofxqq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    qualities: [60, 75, 85],
    minimumCacheTTL: 2678400, // 31日: 猫画像はURLが変わらない限り内容が変わらないため長期キャッシュ
  },
};

export default nextConfig;
