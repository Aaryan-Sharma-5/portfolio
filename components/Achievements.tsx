"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { achievements } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { useCallback, useEffect, useState } from "react";

// Removed decorative icon metadata — achievements render without icons

type Achievement = (typeof achievements)[0] & { image?: string };

/* ── Lightbox ───────────────────────────────────────────── */
function ImageLightbox({
  achievement,
  onClose,
}: {
  achievement: Achievement | null;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (achievement) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [achievement, handleKeyDown]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/92 backdrop-blur-md" />

          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl flex flex-col"
          >
            <div className="flex items-start justify-between mb-4 px-1">
              <div>
                <h3 className="text-white font-semibold text-[17px] leading-snug">
                  {achievement.title}
                </h3>
                <p className="text-white/45 font-mono text-[11px] uppercase tracking-widest mt-1">
                  {achievement.date}
                </p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.60)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
              >
                <X size={15} />
              </button>
            </div>

            {achievement.image && (
              <div
                className="w-full rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 32px 80px -20px rgba(0,0,0,0.8)",
                }}
              >
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  width={900}
                  height={600}
                  className="w-full h-auto block"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                  priority
                />
              </div>
            )}

            <p className="mt-4 px-1 text-white/45 text-[13px] leading-relaxed">
              {achievement.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Carousel Card ──────────────────────────────────────── */
function AwardCard({
  award,
  metaIndex,
  onClick,
}: {
  award: Achievement;
  metaIndex: number;
  onClick: () => void;
}) {
  const accent = "var(--accent)";

  return (
    <div
      onClick={onClick}
      className="group relative shrink-0 w-[320px] rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.20)";
        el.style.boxShadow = "0 20px 60px -16px rgba(0,0,0,0.70)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.09)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div className="relative h-45 overflow-hidden" style={{ background: "#0a0a0c" }}>
        {award.image ? (
          <>
            <Image
              src={award.image}
              alt={award.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              sizes="320px"
              style={{
                filter: "brightness(0.62) contrast(1.08)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

            {/* Zoom overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,0,0,0.30)" }}
            >
              <div
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.90)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <ZoomIn size={12} />
                View
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `radial-gradient(55% 70% at 50% 50%, color-mix(in oklab, ${accent} 22%, transparent), transparent 75%)` }} />
            {/* Intentionally no icon */}
          </>
        )}

        {/* Date badge */}
        <span
          className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded-md z-10"
          style={{
            color: "rgba(255,255,255,0.65)",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(8px)",
          }}
        >
          {award.date}
        </span>
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <h3
            className="font-display font-medium leading-snug tracking-tight"
            style={{ color: "rgba(255,255,255,0.90)", fontSize: "15px" }}
          >
            {award.title}
          </h3>
        </div>
        <p
          className="text-[12.5px] leading-[1.6]"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          {award.description}
        </p>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────── */
export function Achievements() {
  const [lightbox, setLightbox] = useState<Achievement | null>(null);
  const [paused, setPaused] = useState(false);

  const list = achievements as Achievement[];
  // Triple the array so the loop is seamless at any viewport width
  const track = [...list, ...list, ...list];

  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      {/* Keyframe injected inline — no globals.css change needed */}
      <style>{`
        @keyframes achievements-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${list.length} - 20px * ${list.length})); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <SectionHeader
          index="05"
          kicker="Recognition"
          title="Awards & achievements."
          subtitle="Competition placements, hackathons, and open source contributions."
        />
      </div>

      {/* Edge fades */}
      <div className="relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
        />

        {/* Track */}
        <div
          className="overflow-hidden px-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-5 w-max"
            style={{
              animation: `achievements-scroll ${list.length * 7}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {track.map((award, i) => (
              <AwardCard
                key={`${award.title}-${i}`}
                award={award}
                metaIndex={i % list.length}
                onClick={() => setLightbox(award)}
              />
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox achievement={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
