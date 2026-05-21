"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
        <SectionHeader
          index="02"
          kicker="Timeline"
          title="Where I've shipped."
          subtitle="Impact-driven roles across AI pipelines, SaaS platforms, and embedded systems."
        />

        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--accent) 50%, transparent) 20%, color-mix(in oklab, var(--accent-2) 50%, transparent) 80%, transparent)",
            }}
          />

          <motion.div
            className="space-y-8"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const isCurrent = index === 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -16 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      className="relative pl-8 sm:pl-12"
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-5 flex items-center justify-center w-[15px] sm:w-[23px]">
        {isCurrent ? (
          <span className="relative flex items-center justify-center w-3.5 h-3.5">
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: "var(--accent)" }}
            />
            <span
              className="relative w-3.5 h-3.5 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
              }}
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
        className="rounded-2xl p-6 sm:p-7 transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-[20px] text-white font-medium tracking-tight">
                {experience.role}
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
            <p className="mt-1 text-[15px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              {experience.company}
            </p>
          </div>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.16em] shrink-0"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            {experience.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-[14px] leading-[1.65] mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
          {experience.description}
        </p>

        {/* Achievements */}
        <ul className="space-y-2.5 mb-5">
          {experience.achievements.slice(0, 3).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13.5px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.60)" }}>
              <span
                className="shrink-0 font-mono text-[12px] mt-px"
                style={{ color: "var(--accent)" }}
              >
                →
              </span>
              {item}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {experience.techStack.map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
