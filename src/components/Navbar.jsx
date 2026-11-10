import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useLocation } from "react-router-dom";
import { navLinks, profile } from "../data.js";
import profilePhoto from "../assets/img/profile.jpg";
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
  IconGithub,
  IconLinkedin,
} from "./icons.jsx";
import ThemeToggle, { ThemeSwitch } from "./ThemeToggle.jsx";

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
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const menuItem = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 380, damping: 28 } },
};

const socials = [
  { href: profile.github, icon: IconGithub, label: "GitHub", external: true },
  { href: profile.linkedin, icon: IconLinkedin, label: "LinkedIn", external: true },
  { href: `mailto:${profile.email}`, icon: IconMail, label: "Email" },
];

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

  // Close the menu with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = pathname === "/" && !scrolled;

  return (
    <>
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
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
          aria-label="Mary Immaculata Akussah, Home"
          className={`shrink-0 font-display font-extrabold text-xl tracking-tight ${
            overHero ? "text-amber-400" : "text-amber-500 dark:text-amber-400"
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
          <ThemeToggle light={overHero} />

          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden relative z-10 p-2 rounded-full transition-colors ${
              overHero ? "text-white" : "text-slate-900 dark:text-white"
            }`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <IconMenu className="w-6 h-6" />
          </motion.button>
        </div>
      </nav>

    </header>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-[60]">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* panel */}
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 h-full w-[86%] max-w-sm flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto"
            >
              {/* profile header */}
              <div className="relative shrink-0 overflow-hidden bg-slate-900 dark:bg-slate-950 px-6 pt-5 pb-5">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-400/25 blur-3xl" />
                <div className="absolute -bottom-20 -left-12 w-48 h-48 rounded-full bg-indigo-500/25 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <motion.img
                    src={profilePhoto}
                    alt=""
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-lg"
                  />
                  <motion.button
                    type="button"
                    autoFocus
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.9, rotate: 90 }}
                    aria-label="Close menu"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <IconClose className="w-5 h-5" />
                  </motion.button>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="relative mt-3"
                >
                  <p className="font-display text-lg font-bold text-white leading-tight">{profile.name}</p>
                  <p className="mt-1 text-sm text-amber-400">{profile.title}</p>
                </motion.div>
              </div>

              {/* links */}
              <nav className="flex-1 shrink-0 px-4 py-4">
                <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Menu
                </p>
                <motion.ul variants={menuContainer} initial="hidden" animate="visible" className="space-y-1">
                  {navLinks.map((link, i) => {
                    const Icon = navIcons[link.path];
                    return (
                      <motion.li key={link.path} variants={menuItem}>
                        <NavLink
                          to={link.path}
                          end={link.path === "/"}
                          onClick={() => setOpen(false)}
                          className="group relative flex items-center gap-3 rounded-2xl px-3 py-2.5"
                        >
                          {({ isActive }) => (
                            <>
                              {isActive && (
                                <span className="absolute inset-0 rounded-2xl bg-amber-400 shadow-lg shadow-amber-400/25" />
                              )}
                              <span
                                className={`relative flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-colors ${
                                  isActive
                                    ? "bg-slate-950/10 text-slate-950"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-amber-500 dark:group-hover:text-amber-400"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </span>
                              <span
                                className={`relative flex-1 text-[15px] font-semibold ${
                                  isActive ? "text-slate-950" : "text-slate-700 dark:text-slate-200"
                                }`}
                              >
                                {link.label}
                              </span>
                              <span
                                className={`relative text-xs font-mono ${
                                  isActive ? "text-slate-950/60" : "text-slate-300 dark:text-slate-600"
                                }`}
                              >
                                0{i + 1}
                              </span>
                              <IconChevronRight
                                className={`relative w-4 h-4 shrink-0 transition-transform ${
                                  isActive
                                    ? "text-slate-950"
                                    : "text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5"
                                }`}
                              />
                            </>
                          )}
                        </NavLink>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              {/* footer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="shrink-0 px-5 pb-5 pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800"
              >
                <ThemeSwitch />
                <MotionLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-900 dark:bg-amber-400 px-4 py-3.5 text-sm font-semibold text-white dark:text-slate-950 shadow-lg"
                >
                  Let's Work Together
                  <IconChevronRight className="w-4 h-4" />
                </MotionLink>
                <div className="flex items-center justify-center gap-3">
                  {socials.map(({ href, icon: Icon, label, external }) => (
                    <motion.a
                      key={label}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      aria-label={label}
                      whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 hover:border-amber-400 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
