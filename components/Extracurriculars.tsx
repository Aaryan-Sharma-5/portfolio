"use client";

import { motion } from "framer-motion";
import { extracurriculars } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Extracurriculars() {
  return (
    <section id="extracurriculars" className="relative py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <SectionHeader
          index="03"
          kicker="Community"
          title="Beyond the code."
          subtitle="Design leadership, team building, and open source contributions."
        />

        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-1.75 sm:left-2.75 top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--accent) 50%, transparent) 20%, color-mix(in oklab, var(--accent-2) 50%, transparent) 80%, transparent)",
            }}
          />

          <motion.div
            className="space-y-6"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {extracurriculars.map((item, i) => (
              <ExtracurricularCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExtracurricularCard({
  item,
  index,
}: {
  item: (typeof extracurriculars)[0];
  index: number;
}) {
  const isCurrent = item.period.toLowerCase().includes("present");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -16 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      className="relative pl-6 sm:pl-8"
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-5 flex items-center justify-center w-3.75 sm:w-5.75">
        {isCurrent ? (
          <span className="relative flex items-center justify-center w-3.5 h-3.5">
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="relative w-3.5 h-3.5 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
            />
          </span>
        ) : (
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.15)" }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.20)" } as never}
        className="rounded-2xl p-4 sm:p-5 transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 12px 36px -16px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-[18px] text-white font-medium tracking-tight">
                {item.role}
              </h3>
              {isCurrent && (
                <span
                  className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    color: "var(--accent)",
                    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
                  }}
                >
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              {item.organization}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] shrink-0" style={{ color: "rgba(255,255,255,0.40)" }}>
            {item.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-[1.5] mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
          {item.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-1.5 mb-4">
          {item.achievements.slice(0, 2).map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-[1.4]" style={{ color: "rgba(255,255,255,0.60)" }}>
              <span className="shrink-0 font-mono text-[12px] mt-px" style={{ color: "var(--accent)" }}>
                →
              </span>
              {a}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1">
          {item.techStack.map((tech) => (
            <span key={tech} className="tech-pill text-sm px-2 py-0.5">{tech}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
