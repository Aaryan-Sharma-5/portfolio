"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { ProjectModal } from "./ProjectModal";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT_CYCLE = ["var(--accent)", "var(--accent-2)", "var(--accent)", "var(--accent-2)"];

/* ─── Card ─────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const accentVar = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  const stackFlat = project.stack.flatMap((g) => g.items).slice(0, 5);
  const impactItems = project.impact ?? [];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl cursor-pointer h-full"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        transition: "border-color 0.4s, transform 0.4s",
      }}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.20)" } as never}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(80% 50% at 50% 0%, color-mix(in oklab, ${accentVar} 14%, transparent), transparent 70%)`,
        }}
      />

      {/* Browser chrome + image */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,87,0.7)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(254,188,46,0.7)" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "rgba(40,200,64,0.7)" }} />
          <div className="flex-1 mx-4 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        <div className="relative w-full h-52 overflow-hidden" style={{ background: "rgba(10,10,12,0.8)" }}>
          <Image
            src={project.media.cover}
            alt={`${project.title} preview`}
            fill
            unoptimized={project.id === "thermoaq"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Timeline badge */}
        <div className="absolute top-12 right-4">
          <span
            className="px-2 py-1 rounded-md font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{
              color: "rgba(255,255,255,0.70)",
              background: "rgba(0,0,0,0.40)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.timeline}
          </span>
        </div>

        {/* Role badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: accentVar, boxShadow: `0 0 8px ${accentVar}` }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.55)" }}>
            {project.role.split(",")[0].trim()}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <h3 className="font-display text-[24px] text-white font-medium tracking-tight">
            {project.title}
          </h3>
          <span className="text-[12px] font-mono" style={{ color: "rgba(255,255,255,0.40)" }}>·</span>
          <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>{project.tagline}</span>
        </div>

        <p className="text-[14px] leading-[1.65] mb-5 max-w-[58ch]" style={{ color: "rgba(255,255,255,0.55)" }}>
          {project.summary}
        </p>

        {/* Impact metrics */}
        {impactItems.length > 0 && (
          <div className="flex flex-wrap gap-5 mb-5 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {impactItems.slice(0, 3).map((m, i) => (
              <div key={i}>
                <div
                  className="font-display text-[20px] font-medium tracking-tight"
                  style={{ color: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.85)" }}
                >
                  {m.value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] mt-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {stackFlat.map((s) => (
            <span key={s} className="tech-pill">{s}</span>
          ))}
        </div>

        {/* Actions */}
        <div
          className="flex items-center justify-between pt-5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "white"; el.style.borderColor = "rgba(255,255,255,0.30)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.borderColor = "rgba(255,255,255,0.10)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "white"; el.style.borderColor = "rgba(255,255,255,0.30)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.55)"; el.style.borderColor = "rgba(255,255,255,0.10)"; }}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 text-[13px] transition-colors font-display"
            style={{ color: "rgba(255,255,255,0.65)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
          >
            <span style={{ color: accentVar }}>→</span>
            <span>Case study</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <SectionHeader
          index="01"
          kicker="Selected Work"
          title="Systems that don't break under load."
          subtitle="Production-leaning prototypes spanning AI pipelines, payment ledgers, and real-time telemetry."
        />

        {/* ── Featured grid ── */}
        {featured.length > 0 && (
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelectedProject(p)} />
            ))}
          </motion.div>
        )}

        {/* ── More projects (collapsible) ── */}
        {rest.length > 0 && (
          <>
            <AnimatePresence>
              {showAll && (
                <motion.div
                  key="rest-grid"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <motion.div
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5"
                  >
                    {rest.map((p, i) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        index={featured.length + i}
                        onClick={() => setSelectedProject(p)}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-mono uppercase tracking-widest transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.60)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.22)";
                  el.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.10)";
                  el.style.color = "rgba(255,255,255,0.60)";
                }}
              >
                <motion.span
                  animate={{ rotate: showAll ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.span>
                {showAll ? `Hide more projects` : `View more projects`}
              </button>
            </div>
          </>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
