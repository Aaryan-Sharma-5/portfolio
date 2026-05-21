"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type ThemeName = "ocean" | "forest" | "violet" | "ember" | "teal" | "crimson" | "gold" | "midnight";

export interface ThemePalette {
  label: string;
  accent: string;
  accent2: string;
  orb1: string;
  orb2: string;
  orb3: string;
  /** 4 colors shown in the 2×2 swatch preview */
  quad: [string, string, string, string];
}

export const THEMES: Record<ThemeName, ThemePalette> = {
  ocean: {
    label: "Ocean",
    accent: "#22D3EE",
    accent2: "#E879F9",
    orb1: "#22D3EE",
    orb2: "#E879F9",
    orb3: "#6366F1",
    quad: ["#22D3EE", "#E879F9", "#0891B2", "#7C3AED"],
  },
  forest: {
    label: "Forest",
    accent: "#4ADE80",
    accent2: "#BEF264",
    orb1: "#16A34A",
    orb2: "#65A30D",
    orb3: "#4ADE80",
    quad: ["#4ADE80", "#BEF264", "#16A34A", "#65A30D"],
  },
  violet: {
    label: "Violet",
    accent: "#A78BFA",
    accent2: "#F472B6",
    orb1: "#7C3AED",
    orb2: "#DB2777",
    orb3: "#A855F7",
    quad: ["#A78BFA", "#F472B6", "#7C3AED", "#BE185D"],
  },
  ember: {
    label: "Ember",
    accent: "#FB923C",
    accent2: "#F43F5E",
    orb1: "#EA580C",
    orb2: "#E11D48",
    orb3: "#F59E0B",
    quad: ["#FB923C", "#F43F5E", "#EA580C", "#F59E0B"],
  },
  teal: {
    label: "Teal",
    accent: "#2DD4BF",
    accent2: "#38BDF8",
    orb1: "#0D9488",
    orb2: "#0284C7",
    orb3: "#2DD4BF",
    quad: ["#2DD4BF", "#38BDF8", "#0D9488", "#0284C7"],
  },
  crimson: {
    label: "Crimson",
    accent: "#FB7185",
    accent2: "#FBBF24",
    orb1: "#E11D48",
    orb2: "#B45309",
    orb3: "#FB7185",
    quad: ["#FB7185", "#FBBF24", "#E11D48", "#B45309"],
  },
  gold: {
    label: "Gold",
    accent: "#F59E0B",
    accent2: "#FDE68A",
    orb1: "#D97706",
    orb2: "#92400E",
    orb3: "#FBBF24",
    quad: ["#F59E0B", "#FDE68A", "#D97706", "#92400E"],
  },
  midnight: {
    label: "Midnight",
    accent: "#818CF8",
    accent2: "#C4B5FD",
    orb1: "#4338CA",
    orb2: "#6D28D9",
    orb3: "#818CF8",
    quad: ["#818CF8", "#C4B5FD", "#4338CA", "#6D28D9"],
  },
};

const THEME_NAMES = Object.keys(THEMES) as ThemeName[];
const STORAGE_KEY = "portfolio-theme-v3";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "gold",
  setTheme: () => {},
});

function applyTheme(name: ThemeName) {
  const p = THEMES[name];
  const root = document.documentElement;
  root.style.setProperty("--accent", p.accent);
  root.style.setProperty("--accent-2", p.accent2);
  root.style.setProperty("--orb-1", p.orb1);
  root.style.setProperty("--orb-2", p.orb2);
  root.style.setProperty("--orb-3", p.orb3);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("gold");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on client mount only
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    const themeToApply = saved && THEME_NAMES.includes(saved) ? saved : "gold";
    setThemeState(themeToApply);
    applyTheme(themeToApply);
    setMounted(true);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    localStorage.setItem(STORAGE_KEY, name);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
