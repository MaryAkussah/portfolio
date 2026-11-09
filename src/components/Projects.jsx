import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, cloudProjects } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { IconExternal, IconCode, IconCloud, IconChevronRight } from "./icons.jsx";
import { springy } from "../motion.js";

const allItems = [
  ...projects.map((p) => ({ ...p, type: "web" })),
  ...cloudProjects.map((p) => ({ ...p, type: "cloud" })),
];

const filters = [
  { key: "all", label: "All Projects", short: "All" },
  { key: "web", label: "Web Apps", short: "Web", icon: IconCode },
  { key: "cloud", label: "Cloud & DevOps", short: "Cloud", icon: IconCloud },
];

/* ---------- Preview panels ---------- */

function BrowserPreview({ project }) {
  const name = project.title.split(" — ")[0];
  return (
    <div className="relative rounded-t-2xl overflow-hidden bg-slate-900">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 flex-1 truncate rounded-md bg-slate-900/70 px-3 py-1 text-[11px] text-slate-400">
          {project.label}
        </span>
      </div>
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(rgb(148 163 184 / 0.15) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-400/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <div className="absolute -bottom-12 -left-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <motion.p
          className="relative font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center px-6"
          whileHover={{ scale: 1.05 }}
        >
          {name}
          <span className="block mt-2 text-xs font-medium tracking-widest uppercase text-amber-400">
            {project.tagline}
          </span>
        </motion.p>
      </div>
    </div>
  );
}

function TerminalPreview({ project }) {
  return (
    <div className="relative rounded-t-2xl overflow-hidden bg-slate-950">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[11px] text-slate-500 font-mono">~/aws/deploy</span>
      </div>
      <div className="h-40 px-5 py-4 font-mono text-xs leading-6 overflow-hidden">
        <p className="text-slate-400">
          <span className="text-emerald-400">$</span> deploy --stack{" "}
          <span className="text-amber-300">{project.date.split(" ")[0].toLowerCase()}</span>
        </p>
        {project.stack.slice(0, 4).map((s, i) => (
          <motion.p
            key={s}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="text-slate-300"
          >
            <span className="text-emerald-400">✓</span> {s}
          </motion.p>
        ))}
        <p className="text-slate-500">
          <span className="text-emerald-400">$</span>{" "}
          <span className="inline-block w-2 h-3.5 align-middle bg-amber-400 animate-pulse" />
        </p>
      </div>
    </div>
  );
}

/* ---------- Card ---------- */

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const isWeb = project.type === "web";

  function handleMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={springy}
      whileHover={{ y: -8 }}
      onMouseMove={handleMove}
      className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-black/30 hover:border-amber-400/60 transition-[border-color,box-shadow] duration-300"
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background:
            "radial-gradient(420px circle at var(--x) var(--y), rgb(251 191 36 / 0.10), transparent 45%)",
        }}
      />

      {isWeb ? <BrowserPreview project={project} /> : <TerminalPreview project={project} />}

      <div className="relative flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {isWeb ? <IconCode className="w-3.5 h-3.5" /> : <IconCloud className="w-3.5 h-3.5" />}
            {isWeb ? "Web App" : "Cloud & DevOps"}
          </span>
          {isWeb ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-current" />
              </span>
              {project.status}
            </span>
          ) : (
            <span className="text-xs text-slate-500 dark:text-slate-400">{project.date}</span>
          )}
        </div>

        <h3 className="mt-3 font-display font-semibold text-lg text-slate-900 dark:text-white leading-snug">
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.subtitle}</p>
        )}

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {project.description ?? project.bullets[0]}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-100 dark:bg-slate-900/60 px-2 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              key="bullets"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {(isWeb ? project.bullets : project.bullets.slice(1)).map((bullet) => (
                <li key={bullet} className="mt-3 text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                  {bullet}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="flex-1" />
        <div className="mt-5 pt-5 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="relative z-20 inline-flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {open ? "Hide highlights" : "Show highlights"}
            <IconChevronRight className={`w-4 h-4 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`} />
          </button>

          {isWeb && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-amber-400/30"
            >
              Visit Site
              <IconExternal className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ---------- Section ---------- */

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? allItems : allItems.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Web applications I've shipped and cloud systems I've engineered on AWS."
        />

        <Reveal className="flex justify-center mb-12">
          <div className="inline-flex justify-center gap-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 shadow-sm">
            {filters.map(({ key, label, short, icon: Icon }) => {
              const count = key === "all" ? allItems.length : allItems.filter((p) => p.type === key).length;
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`relative px-3.5 sm:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    active ? "text-slate-950" : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-amber-400 shadow-md shadow-amber-400/30"
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span className="sm:hidden">{short}</span>
                    <span className="hidden sm:inline">{label}</span>
                    <span
                      className={`ml-0.5 rounded-full px-1.5 text-[11px] font-semibold ${
                        active ? "bg-slate-950/10" : "bg-slate-100 dark:bg-slate-700"
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
