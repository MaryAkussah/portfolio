import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useLocation } from "react-router-dom";
import { navLinks } from "../data.js";
import {
  IconMenu,
  IconClose,
  IconHome,
  IconUser,
  IconBriefcase,
  IconSparkles,
  IconDocument,
  IconBadge,
  IconMail,
  IconChevronRight,
} from "./icons.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const MotionLink = motion(Link);
const MotionNavLink = motion(NavLink);

const activeClass = "text-slate-950 bg-amber-400";
const inactiveClass =
  "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/10";

const navIcons = {
  "/": IconHome,
  "/about": IconUser,
  "/projects": IconBriefcase,
  "/services": IconSparkles,
  "/resume": IconDocument,
  "/certifications": IconBadge,
  "/contact": IconMail,
};

const menuContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -16, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 26 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = pathname === "/" && !scrolled && !open;
  const glass = open; // unified dark-glass treatment while the mobile menu is open, on every page/theme

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        glass
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10"
          : scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        <MotionLink
          to="/"
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.1, rotate: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          aria-label="Mary Immaculata Akussah — Home"
          className={`shrink-0 font-display font-extrabold text-xl tracking-tight ${
            overHero || glass ? "text-amber-400" : "text-amber-500 dark:text-amber-400"
          }`}
        >
          M.I.A
        </MotionLink>

        <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <MotionNavLink
                to={link.path}
                end={link.path === "/"}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={({ isActive }) =>
                  `inline-block px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? activeClass
                      : overHero
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : inactiveClass
                  }`
                }
              >
                {link.label}
              </MotionNavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle light={overHero || glass} />

          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden relative z-10 p-2 rounded-full transition-colors ${
              overHero || glass ? "text-white" : "text-slate-900 dark:text-white"
            }`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {open ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 top-[60px] -z-10 bg-slate-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="lg:hidden relative mx-3 mt-2 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/20 overflow-hidden"
            >
              <motion.ul
                variants={menuContainer}
                initial="hidden"
                animate="visible"
                className="relative flex flex-col p-2.5 gap-1"
              >
                {navLinks.map((link) => {
                  const Icon = navIcons[link.path];
                  return (
                    <motion.li key={link.path} variants={menuItem}>
                      <NavLink
                        to={link.path}
                        end={link.path === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors backdrop-blur-md ${
                            isActive
                              ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className="flex items-center gap-3"
                              style={!isActive ? { textShadow: "0 1px 3px rgba(0,0,0,0.5)" } : undefined}
                            >
                              <span
                                className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 ${
                                  isActive ? "bg-slate-950/10" : "bg-white/15"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </span>
                              {link.label}
                            </span>
                            <IconChevronRight
                              className={`w-4 h-4 shrink-0 transition-transform ${
                                isActive ? "opacity-100" : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                              }`}
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
