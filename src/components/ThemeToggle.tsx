"use client";

import { useEffect, useState, useSyncExternalStore, useCallback } from "react";
import { motion } from "framer-motion";

type Theme = "light" | "dark" | "system";

const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;

  if (newTheme === "system") {
    root.removeAttribute("data-theme");
    root.classList.remove("dark", "light");
  } else {
    root.setAttribute("data-theme", newTheme);
    root.classList.remove("dark", "light");
    root.classList.add(newTheme);
  }
};

const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as Theme) || "system";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export default function ThemeToggle() {
  const storedTheme = useSyncExternalStore(subscribe, getStoredTheme, (): Theme => "system");
  const [theme, setTheme] = useState<Theme>(storedTheme);
  const mounted = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const cycleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={cycleTheme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-neutral-900/5 dark:bg-neutral-100/5 border border-neutral-900/10 dark:border-neutral-100/10 hover:border-neutral-900/20 dark:hover:border-neutral-100/20 transition-colors group"
      aria-label={`Current theme: ${theme}. Click to cycle.`}
    >
      <div className="relative w-4 h-4">
        {/* Sun */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-4 h-4 text-neutral-600 dark:text-neutral-400"
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : -90,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </motion.svg>

        {/* Moon */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-4 h-4 text-neutral-600 dark:text-neutral-400"
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : 90,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>

        {/* System */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 w-4 h-4 text-neutral-600 dark:text-neutral-400"
          initial={false}
          animate={{
            scale: theme === "system" ? 1 : 0,
            opacity: theme === "system" ? 1 : 0,
            rotate: theme === "system" ? 0 : 90,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </motion.svg>
      </div>
    </motion.button>
  );
}
