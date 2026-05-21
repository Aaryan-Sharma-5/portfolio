"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, THEMES, type ThemeName } from "@/contexts/ThemeContext";

const EASE = [0.16, 1, 0.3, 1] as const;
const THEME_ENTRIES = Object.entries(THEMES) as [ThemeName, (typeof THEMES)[ThemeName]][];

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activePalette = THEMES[theme];

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Palette popup ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="rounded-2xl p-4 w-24"
            style={{
              background: "rgba(10,10,12,0.94)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow:
                "0 24px 64px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="font-mono text-[9px] uppercase tracking-[0.26em] mb-3 text-center"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Palette
            </p>

            {/* Vertical swatch column */}
            <div className="flex flex-col items-center gap-3">
              {THEME_ENTRIES.map(([name, palette]) => {
                const active = theme === name;
                return (
                  <button
                    key={name}
                    title={palette.label}
                    onClick={() => setTheme(name)}
                    className="relative flex flex-col items-center gap-1.5 outline-none group"
                  >
                    {/* 2×2 quad swatch */}
                    <div
                      className="w-10 h-10 rounded-xl overflow-hidden grid grid-cols-2 transition-all duration-200 group-hover:scale-105"
                      style={{
                        outline: active
                          ? `2.5px solid ${palette.accent}`
                          : "2.5px solid transparent",
                        outlineOffset: "2px",
                      }}
                    >
                      {palette.quad.map((c, i) => (
                        <div key={i} style={{ background: c }} />
                      ))}
                    </div>

                    {/* Active checkmark */}
                    {active && (
                      <motion.div
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center pointer-events-none"
                        style={{ background: palette.accent }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0A0A0C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Label */}
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-150"
                      style={{ color: active ? palette.accent : "rgba(255,255,255,0.30)" }}
                    >
                      {palette.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button — paint palette icon ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Switch color palette"
        className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
        style={{
          background: open
            ? `linear-gradient(135deg, var(--accent), var(--accent-2))`
            : "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: open
            ? `0 8px 28px -6px color-mix(in oklab, var(--accent) 50%, transparent)`
            : "0 4px 16px -4px rgba(0,0,0,0.5)",
        }}
      >
        {/* Artistic palette icon */}
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z"
            fill={open ? "#0A0A0C" : "rgba(255,255,255,0.80)"}
          />
          <circle cx="6.5"  cy="11.5" r="1.3" fill={open ? "#0A0A0C" : activePalette.quad[0]} />
          <circle cx="9.5"  cy="7.5"  r="1.3" fill={open ? "#0A0A0C" : activePalette.quad[1]} />
          <circle cx="14.5" cy="7.5"  r="1.3" fill={open ? "#0A0A0C" : activePalette.quad[2]} />
          <circle cx="17.5" cy="11.5" r="1.3" fill={open ? "#0A0A0C" : activePalette.quad[3]} />
        </svg>
      </motion.button>
    </div>
  );
}
