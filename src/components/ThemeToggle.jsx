import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconSun, IconMoon } from "./icons.jsx";

const root = () => document.documentElement;

/** Shared theme state: every toggle on the page stays in sync with the <html class="dark"> flag. */
export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && root().classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(root().classList.contains("dark")));
    observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !root().classList.contains("dark");
    root().classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable, theme still switches for this visit */
    }
  }

  return { isDark, toggle };
}

/** Round icon button used in the top bar. */
export default function ThemeToggle({ className = "", light = false }) {
  const { isDark, toggle } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.85, rotate: -15 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      aria-label="Toggle color theme"
      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
        light
          ? "border-white/30 text-white/80 hover:text-amber-400 hover:border-amber-400"
          : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400"
      } ${className}`}
    >
      {isDark ? <IconSun className="w-4.5 h-4.5" /> : <IconMoon className="w-4.5 h-4.5" />}
    </motion.button>
  );
}

/** Labelled on/off switch used in the mobile menu. */
export function ThemeSwitch() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggle}
      className="w-full flex items-center justify-between gap-3 rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
    >
      <span className="flex items-center gap-2.5">
        {isDark ? <IconMoon className="w-4 h-4 text-amber-400" /> : <IconSun className="w-4 h-4 text-amber-500" />}
        Dark mode
      </span>
      <span
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
          isDark ? "bg-amber-400" : "bg-slate-300"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${isDark ? "right-0.5" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}
