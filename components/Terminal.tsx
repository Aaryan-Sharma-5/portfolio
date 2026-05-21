"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo, skills } from "@/lib/data";
import { useTheme, type ThemeName } from "@/contexts/ThemeContext";
import { onTerminalEvent } from "@/lib/terminalBus";

// ── Types ──────────────────────────────────────────────
interface HistoryEntry {
  command: string;
  output: string | string[];
  isError?: boolean;
}

// ── Command handlers ───────────────────────────────────
interface CommandContext {
  currentTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
  cmdHistory?: string[];
}

function processCommand(raw: string, ctx?: CommandContext): HistoryEntry & { sudoStrike?: boolean } {
  const trimmed = raw.trim().toLowerCase();
  const command = raw.trim();

  if (!trimmed) {
    return { command: "", output: "" };
  }

  // Handle theme <name> command
  if (trimmed.startsWith("theme ") && trimmed !== "theme toggle") {
    const themeName = trimmed.split(" ")[1] as ThemeName;
    const validThemes: ThemeName[] = ["ocean", "forest", "violet", "ember", "teal", "crimson", "gold", "midnight"];
    if (validThemes.includes(themeName)) {
      if (ctx) ctx.setTheme(themeName);
      return {
        command,
        output: [
          `  \u2728 Theme switched to ${themeName}.`,
          "",
          `  Palette applied across all components.`,
        ],
      };
    }
    return {
      command,
      output: [
        `  Unknown theme: "${themeName}"`,
        "",
        "  Available: ocean · forest · violet · ember · teal · crimson · gold · midnight",
      ],
      isError: true,
    };
  }

  switch (trimmed) {
    case "help":
      return {
        command,
        output: [
          "Available commands:",
          "",
          "  whoami          — Who is Aaryan Sharma?",
          "  skills          — Core tech stack",
          "  projects        — Featured projects",
          "  experience      — Work experience",
          "  education       — Academic background",
          "  contact         — Get in touch",
          "  cat resume.txt  — Print resume here",
          "  neofetch        — System info",
          "  ls              — List files",
          "  history         — Command history",
          "  clear           — Clear terminal  (or Ctrl+L)",
          "",
          "  Easter eggs: matrix · coffee · fortune · git log",
          "               ping · vim · cowsay · banner · date",
          "  Themes: theme <ocean|forest|violet|ember|teal|crimson|gold|midnight>",
          "  Hire:   hire me",
          "",
          "  Tip: ↑ / ↓ to navigate command history",
        ],
      };

    case "whoami":
      return {
        command,
        output: [
          `${personalInfo.name} — ${personalInfo.title}`,
          "",
          "Full-Stack + AI Developer building scalable, design-first applications with React, Node, PostgreSQL, and LLM APIs.",
          "",
          `Software Engineering Intern @Almanet · GSSoC '24 · ${personalInfo.education.cgpa} CGPA`,
        ],
      };

    case "skills":
      return {
        command,
        output: [
          "─── Languages ───",
          `  ${skills.languages.join(" · ")}`,
          "",
          "─── Frontend ────",
          `  ${skills.frontend.slice(0, 5).join(" · ")}`,
          "",
          "─── Backend ─────",
          `  ${skills.backend.slice(0, 5).join(" · ")}`,
          "",
          "─── Databases ───",
          `  ${skills.databases.slice(0, 4).join(" · ")}`,
          "",
          "─── AI / ML ─────",
          `  ${skills.ai.slice(0, 4).join(" · ")}`,
          "",
          '  Type "projects" to see what I built with these.',
        ],
      };

    case "projects":
      // Scroll to projects section
      if (typeof window !== "undefined") {
        const el = document.getElementById("projects");
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
        }
      }
      return {
        command,
        output: [
          "Featured Projects:",
          "",
          "  ● NOVA            — AI-powered Analytatical Insights Dashboard",
          "  ● Kuber           — Idempotent payment ledger (ACID)",
          "  ● ThermoAQ        — Real-time environmental monitoring",
          "  ● Slot Swapper    — Concurrency-safe P2P scheduling",
          "",
          "  ↓ Scrolling to projects section...",
        ],
      };

    case "experience":
      return {
        command,
        output: [
          "Work Experience:",
          "",
          "  ▸ Almanet Professional Services",
          "    Software Engineering Intern · Dec 2025 - Present",
          "",
          "  ▸ Mining Roots",
          "    Software Engineering Intern · Jul - Nov 2025",
          "",
          "  ▸ Smowcode",
          "    Embedded Systems Intern · Jun - Jul 2025",
        ],
      };

    case "education":
      return {
        command,
        output: [
          `${personalInfo.education.institution}`,
          `${personalInfo.education.degree} · ${personalInfo.education.duration}`,
          `CGPA: ${personalInfo.education.cgpa}`,
        ],
      };

    case "contact":
      return {
        command,
        output: [
          "Get in touch:",
          "",
          `  ✉  ${personalInfo.email}`,
          `  ⌘  github.com/Aaryan-Sharma-5`,
          `  ◆  linkedin.com/in/aaryan-sharmaa25`,
          "",
          "  Or scroll down to the Contact section.",
        ],
      };

    case "clear":
      return { command: "__CLEAR__", output: "" };

    case "sudo":
      return {
        command,
        output: "Permission denied. This incident will be reported. 🚨",
        isError: true,
        sudoStrike: true,
      };

    case "sudo su":
      return {
        command,
        output: [
          "User aaryan is not in the sudoers file.",
          "This incident will be reported to... nobody,",
          "because I built this. 🔧",
        ],
        isError: true,
        sudoStrike: true,
      };

    case "rm -rf /":
    case "sudo rm -rf /":
      return {
        command,
        output: [
          "Nice try. I deployed this on Vercel,",
          "you can't hurt me here. 😎",
        ],
        isError: true,
      };
    case "matrix":
      return {
        command,
        output: [
          "\u001b[32m  \u30DE \u30C8 \u30EA \u30AF \u30B9  \u30DE \u30C8 \u30EA",
          "",
          "  01001000 01100101 01101100 01101100",
          "  01101111 00100000 01010111 01101111",
          "  01110010 01101100 01100100 00100001",
          "",
          "  > Wake up, Neo...",
          "  > The Matrix has you.",
          '  > Follow the white rabbit. \uD83D\uDC07',
          "",
          "  (decoded: Hello World!)",
        ],
      };

    case "theme":
    case "theme toggle": {
      const current = ctx?.currentTheme ?? "ocean";
      const all: ThemeName[] = ["ocean", "forest", "violet", "ember", "teal", "crimson", "gold", "midnight"];
      const lines = all.map((t) => {
        const marker = t === current ? "\u25CF" : "\u25CB";
        const label = t === current ? `${t}   \u2500 active` : t;
        return `  ${marker} ${label}`;
      });
      return {
        command,
        output: [
          "\u2728 Available themes:",
          "",
          ...lines,
          "",
          "  Usage: theme <name>",
        ],
      };
    }

    case "hire":
    case "hire me":
      if (typeof window !== "undefined") {
        const el = document.getElementById("contact");
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
        }
      }
      return {
        command,
        output: [
          "\u2764\uFE0F  Great choice! Let's talk.",
          "",
          "  \u2192 Scrolling to contact section...",
          "  \u2192 Or email me directly: aaryansharmaa23@gmail.com",
          "",
          "  Available for full-time roles & freelance projects.",
        ],
      };

    case "history":
      if (ctx?.cmdHistory && ctx.cmdHistory.length > 0) {
        return {
          command,
          output: [...ctx.cmdHistory].reverse().map((cmd, i) => `  ${i + 1}  ${cmd}`),
        };
      }
      return {
        command,
        output: ['  (no commands yet \u2014 try "help" to get started)'],
      };

    case "uptime":
      return {
        command,
        output: [
          `  up ${Math.floor((Date.now() - new Date("2005-08-25").getTime()) / 86400000)} days (since Aug, 25 2005)`,
          "  load average: coffee, code, repeat",
        ],
      };

    case "cat /etc/passion":
    case "cat passion":
      return {
        command,
        output: [
          "  Building things that matter.",
          "  Breaking things that don't.",
          "  Shipping fast. Learning faster.",
        ],
      };

    case "cat resume.txt":
    case "cat resume":
      return {
        command,
        output: [
          "╔══════════════════════════════════════════╗",
          "║          AARYAN SHARMA                   ║",
          "║    Full-Stack + AI Developer             ║",
          "╚══════════════════════════════════════════╝",
          "",
          "# EDUCATION",
          "  K. J. Somaiya College of Engineering",
          "  B.Tech · 2023-2027 · CGPA: 8.60",
          "",
          "# EXPERIENCE",
          "  ▸ Almanet Professional Services",
          "    AI/ML + Full Stack Intern · Dec 2025 – Present",
          "  ▸ Mining Roots",
          "    SWE Intern · Jul – Nov 2025",
          "  ▸ Smowcode",
          "    Embedded Systems Intern · Jun – Jul 2025",
          "",
          "# PROJECTS",
          "  ● NOVA — AI-powered Analytatical Insights Dashboard",
          "  ● Kuber — ACID-compliant payment ledger",
          "  ● ThermoAQ — Real-time IoT monitoring",
          "  ● Slot Swapper — Concurrency-safe P2P scheduler",
          "",
          "# SKILLS",
          "  Languages  → TypeScript · Python · Java · C++",
          "  Frontend   → React · Next.js · Tailwind · Framer Motion",
          "  Backend    → Node.js · Express · FastAPI · PostgreSQL",
          "  AI/ML      → Gemini · OpenCV · LangChain · RAG",
          "  DevOps     → Docker · Redis · Git · Vercel",
          "",
          "  📧  aaryansharmaa23@gmail.com",
          "  🔗  github.com/Aaryan-Sharma-5",
          "  🔗  linkedin.com/in/aaryan-sharmaa25",
        ],
      };

    case "ls":
    case "ls -la":
    case "ls -a":
      return {
        command,
        output: [
          "drwxr-xr-x  aaryan  staff  projects/",
          "drwxr-xr-x  aaryan  staff  experience/",
          "drwxr-xr-x  aaryan  staff  skills/",
          "-rw-r--r--  aaryan  staff  resume.txt",
          "-rw-r--r--  aaryan  staff  .env.secrets  (nice try)",
          "-rw-r--r--  aaryan  staff  README.md",
        ],
      };

    case "pwd":
      return {
        command,
        output: "/home/aaryan/portfolio",
      };

    case "neofetch": {
      const themeLabel = ctx?.currentTheme
        ? ctx.currentTheme.charAt(0).toUpperCase() + ctx.currentTheme.slice(1)
        : "Ocean";
      return {
        command,
        output: [
          "        ╭──────────────────╮",
          "   🖥️  │  AaryanOS v1.0.0  │",
          "        ╰──────────────────╯",
          "",
          "  OS      AaryanOS (Next.js 16 / Turbopack)",
          "  Shell   portfolio-bash 1.0",
          "  DE      React 19 + Framer Motion",
          `  Theme   ${themeLabel} Dark`,
          "  Font    Geist Sans / Geist Mono",
          `  Uptime  ${Math.floor((Date.now() - new Date("2005-08-25").getTime()) / 86400000)} days`,
          "  Coffee  ████████████████  99%",
          "  Code    ████████████████  ∞",
        ],
      };
    }

    case "cat .env":
    case "cat .env.secrets":
    case "cat .env.local":
      return {
        command,
        output: [
          "DATABASE_URL=postgresql://nice-try:***@localhost/portfolio",
          "SECRET_KEY=you-thought-id-leave-this-here",
          "GEMINI_API_KEY=ask-me-in-the-interview",
          "",
          "  (No real secrets were harmed in this portfolio.)",
        ],
      };

    case "curl localhost":
    case "curl":
      return {
        command,
        output: [
          "HTTP/1.1 200 OK",
          "X-Powered-By: Caffeine and LLMs",
          "X-Hire-Me: aaryansharmaa23@gmail.com",
          "Content-Type: impressive/portfolio",
          "",
          '  Hint: Check the real HTTP headers in DevTools → Network tab.',
        ],
      };

    case "whoami --verbose":
      return {
        command,
        output: [
          "  uid=1000(aaryan) gid=1000(dev) groups=1000(dev),27(sudo-ish)",
          "  Shell: /bin/portfolio-bash",
          "  Home:  /home/aaryan/portfolio",
          "  Motto: \"Ship it, then optimize.\"",
        ],
      };

    case "about":
      return {
        command,
        output: [
          `${personalInfo.name} — ${personalInfo.title}`,
          "",
          "Full-Stack + AI Developer building scalable, design-first applications with React, Node, PostgreSQL, and LLM APIs.",
          "",
          `Software Engineering Intern @Almanet · GSSoC '24 · ${personalInfo.education.cgpa} CGPA`,
        ],
      };

    case "coffee":
      return {
        command,
        output: [
          "  ☕ Brewing...",
          "",
          "        ( (   ",
          "         ) )  ",
          "      .______.",
          "      |      |]",
          "      \\      / ",
          "       `----'  ",
          "",
          "  Ready. Now let's ship something.",
        ],
      };

    case "date":
      return {
        command,
        output: [`  ${new Date().toDateString()} · ${new Date().toLocaleTimeString()}`],
      };

    case "git log":
    case "git log --oneline":
      return {
        command,
        output: [
          "commit a4f2c1d (HEAD → main, origin/main)",
          "  feat: ship portfolio v2 with terminal easter eggs",
          "",
          "commit 9b3e7a2",
          "  fix: remove console.log('wtf is this') from prod",
          "",
          "commit 3d1c8f0",
          "  feat: add coffee command (highest priority)",
          "",
          "commit b8a1e3c",
          "  chore: delete node_modules and cry",
          "",
          "commit 0000000",
          "  init: stared at blank screen for 20 minutes",
        ],
      };

    case "vim":
    case "vim .":
      return {
        command,
        output: [
          "  vim: this is a portfolio, not a text editor.",
          "",
          "  But since you tried: to exit, type :q!",
          "  You're welcome.",
        ],
      };

    case "nano":
    case "emacs":
      return {
        command,
        output: [
          `  ${trimmed}: command not found in portfolio-bash.`,
          "  Try 'help' for what's actually here.",
        ],
      };

    case "fortune": {
      const quotes = [
        `"First, solve the problem. Then, write the code." — John Johnson`,
        `"Debugging is twice as hard as writing the code in the first place." — Brian Kernighan`,
        `"Any fool can write code that a computer can understand.\n  Good programmers write code that humans can understand." — Martin Fowler`,
        `"The best code is no code at all." — Jeff Atwood`,
        `"Make it work, make it right, make it fast." — Kent Beck`,
        `"It works on my machine." — Every developer, ever`,
        `"99 little bugs in the code. Take one down, patch it around.\n  127 little bugs in the code." — Anonymous`,
      ];
      return {
        command,
        output: ["  " + quotes[Math.floor(Math.random() * quotes.length)]],
      };
    }

    case "ping":
    case "ping google.com":
    case "ping 8.8.8.8":
      return {
        command,
        output: [
          "  PING google.com (8.8.8.8): 56 bytes of data",
          "  64 bytes from 8.8.8.8: icmp_seq=0 ttl=118 time=4.2 ms",
          "  64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=3.8 ms",
          "  64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=4.1 ms",
          "",
          "  --- google.com ping statistics ---",
          "  3 packets transmitted, 3 received, 0.0% packet loss",
          "  round-trip min/avg/max = 3.8/4.0/4.2 ms",
        ],
      };

    case "open resume":
    case "resume":
      if (typeof window !== "undefined") {
        const el = document.getElementById("contact");
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
      return {
        command,
        output: [
          "  → Scrolling to contact section...",
          "  → Or type 'cat resume.txt' to print it here.",
        ],
      };

    case "cowsay":
    case "cowsay hello":
      return {
        command,
        output: [
          "  _______",
          " < hello >",
          "  -------",
          "         \\   ^__^",
          "          \\  (oo)\\_______",
          "             (__)\\       )\\/\\",
          "                 ||----w |",
          "                 ||     ||",
        ],
      };

    case "banner":
      return {
        command,
        output: [
          "   ___   ___  ____  _  _  ___   __  _  _",
          "  / _ \\ / _ \\|  _ \\| || ||_ _| / / | || |",
          " | (_) | | | | |_) | || |_| | / /  | || |_",
          "  \\__,_|_| |_|____/|__  _|__|/_/   |__  _|",
          "                      |_|              |_|  ",
          "",
          `  ${personalInfo.name} · ${personalInfo.title}`,
        ],
      };

    default:
      // Handle echo
      if (trimmed.startsWith("echo ")) {
        return { command, output: raw.trim().slice(5) };
      }
      return {
        command,
        output: `command not found: ${trimmed}. Type "help" for available commands.`,
        isError: true,
      };
  }
}

// ── ASCII art generator ────────────────────────────────
// Dense-to-sparse palette: dark pixel → dense char, bright pixel → sparse/space.
// This produces the Matrix silhouette effect on a dark terminal background.
const ASCII_PALETTE = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

function useAsciiArt(src: string, maxCols: number, maxRows: number): string[] | null {
  const [lines, setLines] = useState<string[] | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.onload = () => {
      // Geist Mono at 0.5rem + lineHeight 1.1: ~8.8px tall, ~5px wide → aspect ≈ 1.76
      const charAspect = 1.76;
      const imgAspect = img.height / img.width; // h/w of the source image

      // Fit inside both maxCols × maxRows while preserving the photo's aspect ratio.
      // First try filling width; if that overflows height, scale down from height instead.
      let cols = maxCols;
      let rows = Math.round(cols * imgAspect / charAspect);
      if (rows > maxRows) {
        rows = maxRows;
        cols = Math.round(rows * charAspect / imgAspect);
      }

      const canvas = document.createElement("canvas");
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, cols, rows);
      const { data } = ctx.getImageData(0, 0, cols, rows);
      const result: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const raw = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // Sigmoid k=10: hard separation between background (#) and face detail
          const lum = 1 / (1 + Math.exp(-10 * (raw - 0.5)));
          // (1-lum) maps bright→index 0 ('$' dense) and dark→index end (' ' sparse)
          const ci = Math.min(ASCII_PALETTE.length - 1, Math.floor((1 - lum) * ASCII_PALETTE.length));
          line += ASCII_PALETTE[ci];
        }
        result.push(line);
      }
      setLines(result);
    };
    img.src = src;
  }, [src, maxCols, maxRows]);
  return lines;
}

// ── Boot sequence lines ────────────────────────────────
const BOOT_LINES = [
  "[    0.000] Loading kernel...",
  "[    0.034] Mounting AaryanOS v1.0.0...",
  "[    0.089] Initializing React 19 runtime...",
  "[    0.112] Starting portfolio daemon...",
  "[    0.150] All systems go.",
];

// ── Terminal Component ─────────────────────────────────
export function Terminal() {
  const [booting, setBooting] = useState(true);
  const [bootIndex, setBootIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ASCII art — rendered directly in JSX, no state mutation needed
  // maxRows=46: fits inside terminal (540px - padding - welcome text - input) at 8.8px/row
  const asciiArt = useAsciiArt("/profile1.jpg", 90, 90);

  // Command history navigation
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputDraftRef = useRef("");

  // Sudo lockdown state
  const sudoCountRef = useRef(0);
  const [lockdown, setLockdown] = useState(false);

  // Theme context — enables theme switching via terminal commands
  const { theme: currentTheme, setTheme } = useTheme();


  // ── Subscribe to global terminal event bus ──
  useEffect(() => {
    const unsubscribe = onTerminalEvent((event) => {
      setHistory((prev) => [
        ...prev,
        {
          command: event.command,
          output: event.output,
          isError: event.isError,
        },
      ]);
    });
    return unsubscribe;
  }, []);

  // Boot sequence — reveal lines one by one, then switch to interactive
  useEffect(() => {
    if (!booting) return;

    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootIndex((i) => i + 1);
      }, 90 + Math.random() * 60); // slight jitter for realism
      return () => clearTimeout(timer);
    }

    // Boot complete — transition to interactive
    const done = setTimeout(() => {
      setBooting(false);
      setHistory([
        {
          command: "",
          output: [
            "AaryanOS v1.0.0 — Portfolio Terminal",
            'Type "help" to see available commands.',
          ],
        },
      ]);
    }, 300);
    return () => clearTimeout(done);
  }, [booting, bootIndex]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Focus management — click anywhere in terminal → focus input
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-focus when mouse enters the terminal
  const handleMouseEnter = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIdx === -1) inputDraftRef.current = input;
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        if (newIdx !== historyIdx) {
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx <= 0) {
          setHistoryIdx(-1);
          setInput(inputDraftRef.current);
        } else {
          const newIdx = historyIdx - 1;
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setHistory([]);
      } else if (e.key === "c" && e.ctrlKey && !input.trim()) {
        e.preventDefault();
        setInput("");
        setHistoryIdx(-1);
      }
    },
    [historyIdx, input, cmdHistory]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const result = processCommand(input, { currentTheme, setTheme, cmdHistory });

      if (result.command === "__CLEAR__") {
        setHistory([{
          command: "",
          output: [
            "AaryanOS v1.0.0 — Portfolio Terminal",
            'Type "help" to see available commands.',
          ],
        }]);
      } else if (result.command !== "" || result.output !== "") {
        setHistory((prev) => [...prev, result]);
      }

      // ── Sudo lockdown logic ──
      if (result.sudoStrike) {
        sudoCountRef.current += 1;
        if (sudoCountRef.current >= 3) {
          sudoCountRef.current = 0;
          setLockdown(true);
          // Append lockdown message
          setHistory((prev) => [
            ...prev,
            {
              command: "",
              output: [
                "",
                "  ██████████████████████████████████████████",
                "  █                                        █",
                "  █   ⚠  SYSTEM LOCKDOWN INITIATED  ⚠     █",
                "  █                                        █",
                "  █   UNAUTHORIZED ACCESS DETECTED         █",
                "  █   TRACING IP ADDRESS...                █",
                "  █   ALERTING AUTHORITIES...              █",
                "  █                                        █",
                "  ██████████████████████████████████████████",
                "",
              ],
              isError: true,
            },
          ]);
          // Revert after 2 seconds
          setTimeout(() => {
            setLockdown(false);
            setHistory((prev) => [
              ...prev,
              {
                command: "",
                output: [
                  "  Just kidding. 😄",
                  "  But seriously, stop trying sudo.",
                  "",
                ],
              },
            ]);
          }, 2000);
        }
      }

      if (input.trim()) {
        setCmdHistory((prev) => [input.trim(), ...prev]);
        setHistoryIdx(-1);
        inputDraftRef.current = "";
      }
      setInput("");
    },
    [input, currentTheme, setTheme, cmdHistory]
  );

  return (
    <div
      onClick={focusInput}
      onMouseEnter={handleMouseEnter}
      className="relative cursor-text"
      role="application"
      aria-label="Interactive terminal"
    >
      {/* ── Sudo lockdown overlay ── */}
      <AnimatePresence>
        {lockdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-20 rounded-lg overflow-hidden pointer-events-none"
          >
            {/* Red glitch flash */}
            <div className="absolute inset-0 bg-red-600/20 mix-blend-screen" />
            <div className="absolute inset-0 border-2 border-red-500/60 rounded-lg animate-pulse" />
            {/* Scan line effect */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-red-500/40"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal window */}
      <div
        className="bg-card-bg border border-card-border rounded-lg overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(201, 120, 50, 0.05)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-card-border">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <span className="font-mono text-muted ml-2" style={{ fontSize: "0.6rem" }}>
              aaryan@portfolio
            </span>
          </div>
          <span className="font-mono hidden sm:block" style={{ fontSize: "0.55rem", color: "var(--muted)", opacity: 0.5 }}>
            bash
          </span>
        </div>

        {/* Terminal output area */}
        <div
          ref={scrollRef}
          className="p-4 h-150 overflow-y-auto space-y-3 terminal-scrollbar"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {/* Boot sequence */}
          {booting && (
            <div className="space-y-1">
              {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  className="font-mono text-muted" style={{ fontSize: "0.8rem" }}
                >
                  {line}
                </motion.div>
              ))}
              {bootIndex < BOOT_LINES.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="inline-block w-1.75 h-3.5 bg-accent"
                />
              )}
            </div>
          )}

          {/* Interactive history */}
          {!booting && (
            <>
          {/* ASCII portrait \u2014 shown on load, hidden after clear */}
          {asciiArt && history.length > 0 && (
            <pre
              className="font-mono"
              style={{
                fontSize: "0.5rem",
                lineHeight: 1.1,
                color: "var(--accent)",
                whiteSpace: "pre",
                overflowX: "hidden",
                maxWidth: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {asciiArt.join("\n")}
            </pre>
          )}

          {history.map((entry, i) => (
            <div key={i}>
              {/* Command line (skip for welcome message) */}
              {entry.command && (
                <div className="font-mono flex items-center gap-0 mb-1" style={{ fontSize: "0.8rem" }}>
                  <span className="text-accent">user</span>
                  <span className="text-muted/60">@portfolio:~$</span>
                  <span className="text-foreground/80 ml-2">{entry.command}</span>
                </div>
              )}

              {/* Output */}
              {entry.output && (
                <div
                  className={`font-mono leading-relaxed whitespace-pre-wrap ${
                    entry.isError ? "text-red-400/80" : "text-muted"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {Array.isArray(entry.output)
                    ? entry.output.map((line, j) => (
                        <div key={j}>{line || "\u00A0"}</div>
                      ))
                    : entry.output}
                </div>
              )}
            </div>
          ))}

          {/* Active prompt + input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-0">
            <span className="font-mono text-accent" style={{ fontSize: "0.8rem" }}>aaryan</span>
            <span className="font-mono text-muted/60" style={{ fontSize: "0.8rem" }}>@portfolio:~$</span>
            <div className="relative grow ml-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setHistoryIdx(-1); }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent font-mono text-foreground/80 outline-none focus:outline-none focus-visible:outline-none caret-accent"
                style={{ fontSize: "0.8rem", outline: "none" }}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              {/* Blinking block cursor in accent color */}
              {!input && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute left-0 top-0 inline-block w-2 h-4 bg-accent pointer-events-none"
                />
              )}
            </div>
          </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Read-only terminal for mobile ──────────────────────
export function TerminalReadOnly() {
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);

  const logs = [
    { status: "success" as const, text: "React 19 initialized" },
    { status: "success" as const, text: "Next.js 16 ready" },
    { status: "success" as const, text: "TypeScript compiled" },
    { status: "success" as const, text: "Tailwind CSS loaded" },
    { status: "info" as const, text: "Loading portfolio..." },
    { status: "success" as const, text: "All systems operational" },
  ];

  useEffect(() => {
    logs.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, index]);
      }, 200 + index * 150);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="bg-card-bg border border-card-border rounded-lg overflow-hidden"
      style={{ boxShadow: "0 0 60px rgba(201, 120, 50, 0.05)" }}
    >
      {/* Title bar */}
      <div className="browser-chrome">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="silkscreen-label text-muted ml-2" style={{ fontSize: "0.6rem" }}>
          system_status.sh
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 min-h-50">
        {/* Run command */}
        <div className="font-mono text-muted mb-4" style={{ fontSize: "0.8rem" }}>
          <span className="text-accent">user</span>
          <span className="text-muted/60">@portfolio:~$</span>
          <span className="text-foreground/80 ml-2">./status.sh</span>
        </div>

        {/* Logs */}
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: visibleLogs.includes(index) ? 1 : 0,
              x: visibleLogs.includes(index) ? 0 : -10,
            }}
            className="flex items-center gap-2 font-mono"
            style={{ fontSize: "0.8rem" }}
          >
            <span className={log.status === "success" ? "text-green-500" : "text-accent"}>
              {log.status === "success" ? "✓" : "→"}
            </span>
            <span className="text-muted">{log.text}</span>
          </motion.div>
        ))}

        {/* Blinking cursor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-mono text-muted mt-4"
          style={{ fontSize: "0.8rem" }}
        >
          <span className="text-accent">user</span>
          <span className="text-muted/60">@portfolio:~$</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-accent ml-1 align-middle"
          />
        </motion.div>
      </div>
    </div>
  );
}
