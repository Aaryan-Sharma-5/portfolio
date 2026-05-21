"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, Twitter } from "lucide-react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

const socials = [
  { key: "github", label: "GitHub", href: personalInfo.github },
  { key: "linkedin", label: "LinkedIn", href: personalInfo.linkedin },
  { key: "leetcode", label: "LeetCode", href: personalInfo.leetcode },
  { key: "codechef", label: "CodeChef", href: personalInfo.codechef },
  { key: "twitter", label: "Twitter", href: personalInfo.twitter },
  { key: "instagram", label: "Instagram", href: personalInfo.instagram || "https://instagram.com/" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10">
        <SectionHeader
          index="06"
          kicker="Contact"
          title="Let's build something."
          subtitle="Open to internships, freelance projects, and full-time opportunities. Drop a line."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
          }}
        >
          {/* Email row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-7 mb-7"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                <Mail size={16} style={{ color: "#0A0A0C" }} />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "rgba(255,255,255,0.40)" }}>
                  Email
                </p>
                <p className="text-white text-[15px] font-medium">{personalInfo.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
                style={{
                  background: copied ? "var(--accent)" : "rgba(255,255,255,0.07)",
                  border: `1px solid ${copied ? "var(--accent)" : "rgba(255,255,255,0.12)"}`,
                  color: copied ? "#0A0A0C" : "rgba(255,255,255,0.75)",
                }}
              >
                {copied ? "Copied!" : "Copy email"}
              </button>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
                style={{
                  color: "#0A0A0C",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                }}
              >
                Send mail
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Socials grid */}
            <div className="flex items-center justify-center gap-4 w-full" style={{ paddingTop: 6 }}>
            {socials.map(({ key, label, href }, i) => (
              <motion.a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                  title={label}
                  initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                  transition={{ duration: 0.32, ease: EASE, delay: i * 0.04 }}
                  whileHover={{ y: -4, scale: 1.04 } as never}
                className="group inline-flex items-center justify-center rounded-md transition-transform"
                  style={{
                    width: 48,
                    height: 48,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                aria-label={label}
              >
                {key === "twitter" ? (
                    <Twitter size={22} style={{ color: "white" }} />
                ) : (
                  <Image
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/${key}.svg`}
                    alt={`${label} logo`}
                      width={22}
                      height={22}
                    unoptimized
                    style={{ objectFit: "contain", filter: "invert(1) brightness(2)" }}
                  />
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
