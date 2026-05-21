"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Github, ExternalLink, ArrowRight, Layers, Code2, BookOpen, Zap, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";

interface Project {
  id: string;
  title: string;
  tagline?: string;
  summary: string;
  role?: string;
  timeline?: string;
  impact: { label: string; value: string; detail?: string }[];
  stack: { label: string; items: string[] }[];
  highlights?: string[];
  caseStudy?: {
    problem?: string;
    solution?: string;
    architecture?: string[];
    challenge?: {
      title?: string;
      problem?: string;
      options?: string;
      decision?: string;
    };
  };
  media?: {
    cover?: string;
  };
  links?: {
    github?: string | null;
    live?: string | null;
  };
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type Tab = "overview" | "deep-dive" | "stack";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "deep-dive", label: "Deep Dive", icon: Layers },
  { id: "stack", label: "Stack", icon: Code2 },
];

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const architecture = project?.caseStudy?.architecture ?? [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-card-border rounded-2xl overflow-hidden flex flex-col md:flex-row z-10"
            style={{ boxShadow: "0 40px 120px -20px rgba(0,0,0,0.9)" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-200"
            >
              <X size={16} />
            </button>

            {/* ── Left Column ── */}
            <div className="md:w-[42%] shrink-0 flex flex-col overflow-hidden border-r border-card-border">

              {/* Cover image with gradient overlay */}
              {project.media?.cover && (
                <div className="relative w-full h-52 shrink-0 overflow-hidden">
                  <Image
                    src={project.media.cover}
                    alt={`${project.title} preview`}
                    fill
                    unoptimized={project.id === "thermoaq"}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
                  {project.timeline && (
                    <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/70 bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md">
                      {project.timeline}
                    </span>
                  )}
                </div>
              )}

              {/* Impact metrics */}
              {project.impact.length > 0 && (
                <div
                  className="grid border-b border-card-border shrink-0"
                  style={{ gridTemplateColumns: `repeat(${Math.min(project.impact.length, 3)}, 1fr)` }}
                >
                  {project.impact.slice(0, 3).map((m, i) => (
                    <div
                      key={m.label}
                      className="px-4 py-4 flex flex-col items-center text-center border-r border-card-border last:border-r-0"
                    >
                      <div
                        className="text-[22px] font-bold tracking-tight leading-none"
                        style={{ color: i === 0 ? "var(--accent)" : "rgba(255,255,255,0.85)" }}
                      >
                        {m.value}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-muted mt-1.5 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture flow */}
              {architecture.length > 0 && (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="kicker mb-0.5">Architecture</h4>
                      <p className="text-[11px] text-foreground/45">System flow</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted px-2 py-1 rounded-full border border-card-border">
                      {architecture.length} stages
                    </span>
                  </div>

                  <div className="relative">
                    {/* Connecting line */}
                    <div
                      className="absolute left-[15px] top-5 bottom-5 w-px"
                      style={{ background: "linear-gradient(to bottom, var(--accent), rgba(255,255,255,0.06))" }}
                    />

                    <div className="space-y-2.5">
                      {architecture.map((step, index) => (
                        <motion.div
                          key={`${step}-${index}`}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.07, ease: "easeOut" }}
                          className="flex items-center gap-3 relative"
                        >
                          <div
                            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[10px] font-mono font-medium relative z-10"
                            style={{
                              background: index === 0 ? "var(--accent)" : "var(--card-bg)",
                              border: `1px solid ${index === 0 ? "var(--accent)" : "rgba(255,255,255,0.10)"}`,
                              color: index === 0 ? "var(--background)" : "rgba(255,255,255,0.60)",
                              boxShadow: index === 0 ? "0 0 12px color-mix(in oklab, var(--accent) 40%, transparent)" : "none",
                            }}
                          >
                            {index + 1}
                          </div>
                          <div
                            className="flex-1 rounded-xl px-3 py-2 text-[13px]"
                            style={{
                              border: `1px solid ${index === 0 ? "color-mix(in oklab, var(--accent) 25%, transparent)" : "rgba(255,255,255,0.07)"}`,
                              background: index === 0 ? "color-mix(in oklab, var(--accent) 8%, transparent)" : "rgba(255,255,255,0.03)",
                              color: index === 0 ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)",
                            }}
                          >
                            {step}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right Column ── */}
            <div className="md:w-[58%] flex flex-col overflow-hidden">

              {/* Header */}
              <div className="px-7 pt-7 pb-5 border-b border-card-border shrink-0">
                <h3 className="text-[22px] font-semibold tracking-tight text-foreground leading-tight mb-1">
                  {project.title}
                </h3>
                {project.tagline && (
                  <p className="text-accent text-[13px] font-medium mb-3">
                    {project.tagline}
                  </p>
                )}
                {project.role && (
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-4">
                    Role: {project.role}
                  </p>
                )}

                <div className="flex gap-2.5">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/12 rounded-lg text-[13px] text-foreground hover:border-accent hover:text-accent transition-all duration-200"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg text-[13px] font-medium hover:opacity-90 transition-all duration-200"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-card-border shrink-0 px-7">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="relative flex items-center gap-1.5 px-1 mr-6 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors duration-200"
                    style={{ color: activeTab === id ? "var(--accent)" : "rgba(255,255,255,0.35)" }}
                  >
                    <Icon size={11} />
                    {label}
                    {activeTab === id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: "var(--accent)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto px-7 py-6">
                <AnimatePresence mode="wait">

                  {/* Overview tab */}
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {project.caseStudy?.problem && (
                        <div>
                          <h4 className="kicker mb-2.5">Problem</h4>
                          <p className="text-[13px] text-foreground/60 leading-relaxed">
                            {project.caseStudy.problem}
                          </p>
                        </div>
                      )}

                      {project.caseStudy?.solution && (
                        <div>
                          <h4 className="kicker mb-2.5">Solution</h4>
                          <p className="text-[13px] text-foreground/60 leading-relaxed">
                            {project.caseStudy.solution}
                          </p>
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div>
                          <h4 className="kicker mb-2.5">Key Achievements</h4>
                          <ul className="space-y-2.5">
                            {project.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/65 leading-relaxed">
                                <ArrowRight size={11} className="mt-1 shrink-0" style={{ color: "var(--accent)" }} />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Deep-dive tab */}
                  {activeTab === "deep-dive" && (
                    <motion.div
                      key="deep-dive"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      {project.caseStudy?.challenge && (
                        <>
                          {/* Challenge header */}
                          <div className="flex items-start gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)" }}
                            >
                              <Zap size={14} style={{ color: "var(--accent)" }} />
                            </div>
                            <div>
                              <h4 className="kicker mb-0.5">Hardest Technical Challenge</h4>
                              {project.caseStudy.challenge.title && (
                                <p className="text-[13px] text-foreground/80 font-medium">
                                  {project.caseStudy.challenge.title}
                                </p>
                              )}
                            </div>
                          </div>

                          {project.caseStudy.challenge.problem && (
                            <p className="text-[13px] text-foreground/60 leading-relaxed">
                              {project.caseStudy.challenge.problem}
                            </p>
                          )}

                          {project.caseStudy.challenge.options && (
                            <div
                              className="rounded-xl p-4 text-[12px] text-foreground/55 leading-relaxed"
                              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                            >
                              <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">Options Considered</span>
                              {project.caseStudy.challenge.options}
                            </div>
                          )}

                          {project.caseStudy.challenge.decision && (
                            <div
                              className="rounded-xl p-4 text-[13px] leading-relaxed"
                              style={{
                                background: "color-mix(in oklab, var(--accent) 7%, transparent)",
                                border: "1px solid color-mix(in oklab, var(--accent) 22%, transparent)",
                                color: "rgba(255,255,255,0.70)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <ChevronRight size={12} style={{ color: "var(--accent)" }} />
                                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--accent)" }}>Decision</span>
                              </div>
                              {project.caseStudy.challenge.decision}
                            </div>
                          )}

                          {/* Impact detail cards */}
                          {project.impact.length > 0 && (
                            <div>
                              <h4 className="kicker mb-3 mt-2">Impact Breakdown</h4>
                              <div className="space-y-2.5">
                                {project.impact.map((m) => (
                                  <div
                                    key={m.label}
                                    className="flex items-start gap-3 rounded-xl px-4 py-3"
                                    style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                                  >
                                    <div className="shrink-0 text-right min-w-[52px]">
                                      <div className="text-[18px] font-bold leading-none" style={{ color: "var(--accent)" }}>
                                        {m.value}
                                      </div>
                                      <div className="font-mono text-[9px] uppercase tracking-wider text-muted mt-1">
                                        {m.label}
                                      </div>
                                    </div>
                                    <div className="w-px self-stretch bg-card-border mx-1 shrink-0" />
                                    {m.detail && (
                                      <p className="text-[12px] text-foreground/55 leading-relaxed pt-0.5">
                                        {m.detail}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* Stack tab */}
                  {activeTab === "stack" && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      {project.stack.map((group) => (
                        <div key={group.label}>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-muted mb-2.5">
                            {group.label}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="font-mono text-[11px] px-2.5 py-1.5 rounded-lg text-foreground/70 uppercase tracking-wider transition-colors duration-200 hover:text-foreground"
                                style={{
                                  background: "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
