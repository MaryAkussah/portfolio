import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconSun, IconMoon } from "./icons.jsx";

export default function ThemeToggle({ className = "", light = false }) {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <motion.button
      type="button"
      onClick={() => setIsDark((d) => !d)}
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
