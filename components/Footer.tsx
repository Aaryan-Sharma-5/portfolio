"use client";

import { personalInfo } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-8 mt-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.30)" }}>
            © {year} {personalInfo.name}
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.25)" }}>
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
