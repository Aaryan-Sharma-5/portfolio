"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSolidity,
  SiNeo4J,
  SiSupabase,
  SiFirebase,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPython,
  SiCplusplus,
  SiOpencv,
  SiDocker,
  SiGit,
  SiGithub,
  SiNpm,
  SiPostman,
  SiVercel,
  SiFigma,
  SiCanva,
  SiAmazonwebservices,
  SiGooglecloud,
  SiSelenium,
  SiSocketdotio,
  SiRadixui,
  SiC,
  SiOpenjdk,
  SiWebrtc,
  SiPhp,
  SiMysql,
  SiLinux,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Network, ScanText, Box, Cpu } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Skill {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface SkillCategory {
  title: string;
  mod: string;
  cols: number;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    title: "Frontend & UI",
    mod: "MOD_01",
    cols: 4,
    skills: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Charts", icon: Box, color: "#F55036" },
      { name: "Shadcn UI", icon: SiRadixui, color: "#ffffff" },
      { name: "Spline", icon: Network, color: "#7B61FF" },
    ],
  },

  {
    title: "Backend & Databases",
    mod: "MOD_02",
    cols: 4,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "WebSockets", icon: SiSocketdotio, color: "#E10098" },
      { name: "WebRTC", icon: SiWebrtc, color: "#00ADEF" },
      { name: "Solidity", icon: SiSolidity, color: "#333333" },
      { name: "Neo4j", icon: SiNeo4J, color: "#3FCF8E" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },

  {
    title: "Cloud & Infrastructure",
    mod: "MOD_03",
    cols: 4,
    skills: [
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      {name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
  {
    title: "Programming Languages",
    mod: "MOD_04",
    cols: 4,
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C", icon: SiC, color: "#5C6BC0" },
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
      {name: "PHP", icon: SiPhp, color: "#777BB4" },
    ],
  },
  {
    title: "Deep Learning & AI",
    mod: "MOD_05",
    cols: 4,
    skills: [
      { name: "LLM Orchestration", icon: Cpu, color: "#F55036" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "RAG Pipelines", icon: Network, color: "#22D3EE" },
      { name: "PyTesseract", icon: ScanText, color: "#E879F9" },
    ],
  },
  {
    title: "Tools",
    mod: "MOD_06",
    cols: 4,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#F05032" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Selenium", icon: SiSelenium, color: "#43B02A" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
    ],
  },
];

/* ── Icon tile ─────────────────────────────────────────────── */
function IconTile({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="flex flex-col items-center gap-2 cursor-default"
    >
      {/* Tile */}
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center"
        style={{ background: "#0D0D0D", border: "1px solid #1A1A1A" }}
      >
        {/* Icon wrapper — grayscale muted by default, full color on group-hover */}
        <div
          className="grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 flex items-center justify-center"
          style={{ width: "42%", height: "42%" }}
        >
          <Icon style={{ color: skill.color, width: "100%", height: "100%" }} />
        </div>
      </div>

      {/* Label */}
      <span
        className="font-mono text-center leading-tight opacity-50 transition-opacity duration-300 ease-in-out group-hover:opacity-90"
        style={{
          fontSize: "8px",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.70)",
          maxWidth: "100%",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ── Category card ─────────────────────────────────────────── */
function CategoryCard({
  category,
}: {
  category: SkillCategory;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className="group rounded-2xl p-6 flex flex-col gap-5 cursor-default transition-all duration-300"
      whileHover={{
        y: -4,
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.14), 0 20px 60px -20px rgba(0,0,0,0.6)",
      }}
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm tracking-wider uppercase text-gray-400">
          {category.title}
        </h3>
        <span
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.20em",
            color: "rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "3px 8px",
            borderRadius: "4px",
          }}
        >
          {category.mod}
        </span>
      </div>

      {/* Icon grid */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${category.cols}, minmax(0, 1fr))`,
        }}
      >
        {category.skills.map((skill) => (
          <IconTile key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────── */
export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <SectionHeader
          index="04"
          kicker="Capabilities"
          title="Stack and tooling."
          subtitle="Technologies I reach for when building scalable, production-ready systems."
        />

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.title} category={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
