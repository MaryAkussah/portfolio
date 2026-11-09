import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { education, experience, certifications, skillGroups, stats } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import {
  IconGraduation,
  IconBriefcase,
  IconBadge,
  IconCode,
  IconCloud,
  IconShield,
  IconMarketing,
  IconChevronRight,
  IconMapPin,
} from "./icons.jsx";
import { fadeUp, staggerContainer, bounceHover, springy, viewportOnce } from "../motion.js";

const MotionLink = motion(Link);

const roleTypes = {
  engineering: { label: "Frontend", icon: IconCode },
  cloud: { label: "Cloud & IT Ops", icon: IconCloud },
  grc: { label: "GRC & Audit", icon: IconShield },
  marketing: { label: "Marketing & Sales", icon: IconMarketing },
};

const filters = [{ key: "all", label: "All" }, ...Object.entries(roleTypes).map(([key, v]) => ({ key, ...v }))];

function splitPeriod(period) {
  const [dates, duration] = period.split(" · ");
  return { dates, duration, current: /present/i.test(dates) };
}

/* ---------- Summary strip ---------- */

function SummaryStrip() {
  const companies = new Set(experience.map((e) => e.place)).size;
  const items = [
    { value: stats.find((s) => /year/i.test(s.label))?.value ?? 5, label: "Years Experience" },
    { value: experience.length, label: "Roles Held" },
    { value: companies, label: "Organisations" },
    { value: certifications.length, label: "Certifications" },
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.08)}
      className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeUp} className="py-6 px-3 text-center bg-white dark:bg-slate-800">
          <p className="font-display text-3xl sm:text-4xl font-bold text-amber-500 dark:text-amber-400">{item.value}</p>
          <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------- Sidebar ---------- */

function SidebarCard({ icon: Icon, title, children, delay = 0 }) {
  return (
    <Reveal
      transition={{ delay }}
      className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </span>
        <h3 className="font-display font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </Reveal>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-6">
      <SidebarCard icon={IconGraduation} title="Education">
        {education.map((ed) => (
          <div key={ed.degree}>
            <p className="font-semibold text-slate-900 dark:text-white leading-snug">{ed.degree}</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
              <IconMapPin className="w-3.5 h-3.5 shrink-0" />
              {ed.place}
            </p>
            <span className="mt-3 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              {ed.period}
            </span>
            {ed.description && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{ed.description}</p>}
          </div>
        ))}
      </SidebarCard>

      <SidebarCard icon={IconCode} title="Core Skills" delay={0.05}>
        <div className="space-y-3">
          {skillGroups.slice(0, 5).map((g) => (
            <div key={g.category}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{g.category}</p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{g.skills.slice(0, 4).join(" · ")}</p>
            </div>
          ))}
        </div>
      </SidebarCard>

      <SidebarCard icon={IconBadge} title="Certifications" delay={0.1}>
        <ul className="space-y-2.5">
          {certifications.slice(0, 4).map((c) => (
            <li key={c.name} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
              {c.name}
            </li>
          ))}
        </ul>
        <Link
          to="/certifications"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline"
        >
          View all {certifications.length}
          <IconChevronRight className="w-4 h-4" />
        </Link>
      </SidebarCard>

      <Reveal transition={{ delay: 0.15 }} className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-center">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-indigo-500/25 blur-3xl" />
        <p className="relative font-display font-semibold text-white">Like what you see?</p>
        <p className="relative mt-1 text-sm text-slate-300">Let's talk about your next project.</p>
        <MotionLink
          to="/contact"
          {...bounceHover}
          className="relative mt-4 inline-block px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 text-sm font-semibold shadow-lg shadow-amber-400/30"
        >
          Hire Me
        </MotionLink>
      </Reveal>
    </aside>
  );
}

/* ---------- Experience timeline ---------- */

function TimelineItem({ item }) {
  const { dates, duration, current } = splitPeriod(item.period);
  const type = roleTypes[item.type];
  const TypeIcon = type?.icon ?? IconBriefcase;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      transition={springy}
      className="relative pl-12 sm:pl-16"
    >
      {/* dot */}
      <span className="absolute left-0 sm:left-2 top-6 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-400 text-amber-500 dark:text-amber-400 shadow-md z-10">
        {current && <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />}
        <TypeIcon className="relative w-4 h-4" />
      </span>

      <motion.div
        whileHover={{ y: -4 }}
        transition={springy}
        className={`group rounded-2xl border bg-white dark:bg-slate-800/60 p-6 transition-[border-color,box-shadow] duration-300 hover:shadow-xl hover:shadow-slate-900/5 ${
          current
            ? "border-amber-400/70 shadow-md shadow-amber-400/10"
            : "border-slate-200 dark:border-slate-700 hover:border-amber-400/60"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
            {dates}
          </span>
          {duration && (
            <span className="rounded-full bg-slate-100 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">
              {duration}
            </span>
          )}
          {current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Current
            </span>
          )}
        </div>

        <h4 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white leading-snug">{item.role}</h4>
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{item.place}</p>

        <ul className="mt-4 space-y-2">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        {type && (
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            <TypeIcon className="w-3.5 h-3.5" />
            {type.label}
          </p>
        )}
      </motion.div>
    </motion.li>
  );
}

function Experience() {
  const [filter, setFilter] = useState("all");
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const visible = filter === "all" ? experience : experience.filter((e) => e.type === filter);

  return (
    <div>
      <Reveal className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-400/30">
          <IconBriefcase className="w-5 h-5" />
        </span>
        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Professional Experience</h3>
      </Reveal>

      <Reveal transition={{ delay: 0.05 }} className="mt-6 flex flex-wrap gap-2">
        {filters.map(({ key, label }) => {
          const count = key === "all" ? experience.length : experience.filter((e) => e.type === key).length;
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? "border-transparent text-slate-950"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:border-amber-400/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="resume-filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-amber-400 shadow-md shadow-amber-400/30"
                />
              )}
              <span className="relative">
                {label} <span className="opacity-60">({count})</span>
              </span>
            </button>
          );
        })}
      </Reveal>

      <div ref={listRef} className="relative mt-10">
        {/* track + animated progress line */}
        <span className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
        <motion.span
          style={{ scaleY: progress }}
          className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-amber-400 to-amber-500"
        />

        <motion.ul layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <TimelineItem key={`${item.role}-${item.place}`} item={item} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function Resume() {
  return (
    <section id="resume" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="My Journey"
          title="Resume"
          description="My education, professional experience and the skills I've built along the way."
        />

        <SummaryStrip />

        <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10 lg:gap-12 items-start">
          <div className="order-2 lg:order-1">
            <Sidebar />
          </div>
          <div className="order-1 lg:order-2">
            <Experience />
          </div>
        </div>
      </div>
    </section>
  );
}
