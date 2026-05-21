import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Powered-By", value: "Caffeine and LLMs" },
          { key: "X-Hire-Me", value: "aaryansharmaa23@gmail.com" },
          { key: "X-Stack", value: "Next.js, React 19, PostgreSQL, Redis, Gemini AI" },
          { key: "X-Easter-Egg", value: "You found the headers. Now try the terminal." },
          { key: "X-Source", value: "https://github.com/Aaryan-Sharma-5" },
        ],
      },
    ];
  },
};

export default nextConfig;
