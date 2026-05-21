"use client";

import { useEffect } from "react";

// DevTools honeypot — prints stylized messages to the browser console.
export function DevToolsHoneypot() {
  useEffect(() => {
    // ASCII art banner
    console.log(
      `%c
   █████╗  █████╗ ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗
  ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
  ███████║███████║██████╔╝ ╚████╔╝ ███████║██╔██╗ ██║
  ██╔══██║██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║██║╚██╗██║
  ██║  ██║██║  ██║██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
`,
      "color: #00d4aa; font-family: monospace;"
    );

    console.log(
      "%c> System Status: AaryanOS Online",
      "color: #00d4aa; font-size: 16px; font-weight: bold; font-family: monospace;"
    );

    console.log(
      "%c> Looking for the source code? Smart move.",
      "color: #8b5cf6; font-size: 12px; font-family: monospace;"
    );

    // Hidden stats — the real easter egg
    console.log(
      "%c> console.table(developer.stats)",
      "color: #64748b; font-size: 11px; font-family: monospace;"
    );

    console.table({
      stack: "React 19 · Next.js 16 · Python · PostgreSQL · Redis · Gemini AI",
      architecture: "ACID transactions · Row-level locking · WebSocket streaming",
      status: "Open to opportunities",
      email: "aaryansharmaa23@gmail.com",
      github: "github.com/Aaryan-Sharma-5",
      secret: "Try typing 'neofetch' or 'cat resume.txt' in the terminal ↑",
    });

    console.log(
      "%c⚠ WARNING: All PostgreSQL connections in this portfolio use SERIALIZABLE isolation. Proceed with caution.",
      "color: #f59e0b; font-size: 11px; font-family: monospace;"
    );

    console.log(
      "%cHint: Check the HTTP response headers too. 👀",
      "color: #64748b; font-size: 10px; font-style: italic; font-family: monospace;"
    );
  }, []);

  return null;
}
