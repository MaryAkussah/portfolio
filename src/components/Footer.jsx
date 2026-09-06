import { motion } from "framer-motion";
import { profile } from "../data.js";
import { IconGithub, IconLinkedin } from "./icons.jsx";
import { bounceHoverSmall } from "../motion.js";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {profile.name}
        </h3>

        <div className="mt-5 flex justify-center gap-3">
          {[
            { href: profile.github, icon: IconGithub, label: "GitHub" },
            { href: profile.linkedin, icon: IconLinkedin, label: "LinkedIn" },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              {...bounceHoverSmall}
              className="w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
          &copy; {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
