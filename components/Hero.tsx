"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Terminal } from "./Terminal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const first = personalInfo.name.split(" ")[0];
  const last  = personalInfo.name.split(" ")[1];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-20 items-center">

          {/* Left: Identity */}
          <div className="relative">

            {/* Name */}
            <h1
              className="font-display leading-[0.9] tracking-[-0.045em] font-bold"
              style={{ fontSize: "clamp(56px, 8vw, 124px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                  className="inline-block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, white 0%, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0.55) 100%)" }}
                >
                  {first}
                </motion.span>
              </span>
              <span className="block overflow-hidden mt-[-0.06em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                  className="inline-block bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, white 0%, var(--accent) 50%, var(--accent-2) 100%)" }}
                >
                  {last}.
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="mt-5 text-[18px] sm:text-[19px] leading-[1.55] max-w-[42ch] font-medium tracking-[-0.005em]"
              style={{ color: "#9ca3af" }}
            >
              Software Engineer. AI pipelines, real-time systems, production backends.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.72 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              {/* Primary */}
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-semibold tracking-tight transition-shadow duration-500"
                style={{
                  color: "#0A0A0C",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.1) inset, 0 10px 30px -10px color-mix(in oklab, var(--accent) 70%, transparent)",
                }}
              >
                <span>View Projects</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Resume */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-medium transition-all duration-200"
                style={{
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.85)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.08)";
                  el.style.borderColor = "rgba(255,255,255,0.20)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.10)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Resume
              </a>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.92 }}
              className="mt-6 max-w-[48ch]"
            >
                <p style={{ color: "#a3a3a3", fontSize: "0.85rem", lineHeight: "1.75" }}>
                  Engineering fault-tolerant systems and high-concurrency backends. Experience architecting{" "}
                  <span style={{ color: "white", fontWeight: 500 }}>exactly-once payment ledgers</span>
                  {" "}with{" "}
                  <span style={{ color: "white", fontWeight: 500 }}>PostgreSQL serializable isolation</span>
                  {" "}and asynchronous processing pipelines on{" "}
                  <span style={{ color: "white", fontWeight: 500 }}>Google Cloud Run</span>
                </p>
            </motion.div>
          </div>

          {/* ── Right: Terminal ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="relative"
          >
            {/* Glow behind terminal */}
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--accent) 25%, transparent), transparent 70%)",
                opacity: 0.6,
              }}
            />
            <div className="relative">
              <Terminal />
            </div>
          </motion.div>

        </div>

      </div>

      {/* Scroll hint — pinned to section bottom, always in viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-6 sm:left-10 hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
        style={{ color: "rgba(255,255,255,0.30)" }}
      >
        <span className="w-8 h-px" style={{ background: "rgba(255,255,255,0.20)" }} />
        Scroll to explore
      </motion.div>
    </section>
  );
}
