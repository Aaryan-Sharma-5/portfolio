"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const NAV_LINKS = [
  { href: "#home",         label: "Home" },
  { href: "#projects",     label: "Projects" },
  { href: "#experience",   label: "Experience" },
  { href: "#skills",       label: "Stack" },
  { href: "#achievements", label: "Awards" },
  { href: "#contact",      label: "Contact" },
];

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Active section via single IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    clickCount.current++;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 800);
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[min(1020px,calc(100%-32px))]">
        <nav
          className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.6)",
          }}
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group bg-transparent border-none cursor-pointer"
          >
            <span
              className="relative w-8 h-8 rounded-lg overflow-visible flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
            >
              <span
                className="absolute rounded-[7px] flex items-center justify-center"
                style={{ inset: "1px", background: "rgba(10,10,12,0.85)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Image src="/favicon.png" alt="Aaryan" width={32} height={32} className="w-7 h-7 rounded-[6px]" />
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px rgba(74,222,128,0.9)", border: "1px solid rgba(10,10,12,0.9)" }}
              />
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em] hidden sm:block"
              style={{ color: "var(--accent)" }}
            >
              Available
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="relative px-3 py-1.5 text-[13px] rounded-lg transition-colors duration-200 font-mono"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.50)" }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)";
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.65)" }}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileOpen
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 md:hidden flex flex-col pt-24 px-10 py-8"
            style={{ background: "rgba(10,10,12,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Profile row */}
            <div
              className="flex items-center gap-3 mb-8 pb-6"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="relative">
                <div
                  className="absolute -inset-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
                />
                <div className="relative w-10 h-10 rounded-full overflow-hidden" style={{ border: "2px solid #0A0A0C" }}>
                  <Image src="/profile.jpg" alt={personalInfo.name} fill className="object-cover object-top" sizes="40px" />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400"
                  style={{ border: "2px solid #0A0A0C" }}
                />
              </div>
              <div>
                <p className="text-white text-[14px] font-medium font-display">{personalInfo.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  Available for work
                </p>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => {
                const isActive = activeSection === l.href.slice(1);
                return (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={closeMobile}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.2em]"
                    style={{ color: isActive ? "white" : "rgba(255,255,255,0.50)" }}
                  >
                    {isActive && (
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }}
                      />
                    )}
                    {l.label}
                  </motion.a>
                );
              })}

              {/* Email CTA — separate from nav, distinct purpose */}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.05 }}
                className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.2em] mt-3 pt-5"
                style={{ color: "var(--accent)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Say hello
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
