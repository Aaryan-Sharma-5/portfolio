"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  kicker?: string;
  index?: string;
  align?: "left" | "center";
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionHeader({
  title,
  subtitle,
  kicker,
  index,
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`max-w-[820px] mb-12 ${isCentered ? "mx-auto text-center" : ""}`}
    >
      {/* Index + kicker row */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 8 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
        className={`flex items-center gap-3 mb-4 ${isCentered ? "justify-center" : ""}`}
      >
        {index && (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
            {index}
          </span>
        )}
        <span
          className="h-px"
          style={{
            width: "32px",
            background: "linear-gradient(to right, color-mix(in oklab, var(--accent) 70%, transparent), transparent)",
          }}
        />
        {kicker && (
          <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.55)" }}>
            {kicker}
          </span>
        )}
      </motion.div>

      {/* Heading */}
      <div className="overflow-hidden">
        <motion.h2
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.05 } },
          }}
          className="font-display text-white font-medium leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.25 } },
          }}
          className={`mt-5 text-[16px] leading-[1.7] max-w-[58ch] ${isCentered ? "mx-auto" : ""}`}
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
