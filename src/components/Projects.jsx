import { motion } from "framer-motion";
import { projects, cloudProjects } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { IconExternal } from "./icons.jsx";
import { fadeUp, staggerContainer, liftHover, viewportOnce } from "../motion.js";

function StackTags({ stack }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="A selection of applications and platforms I've built."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid md:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              {...liftHover}
              className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-7 hover:border-amber-400/60 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                  {project.title}
                </h3>
                <IconExternal className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors shrink-0" />
              </div>

              <p className="mt-1 text-sm text-slate-500">{project.subtitle}</p>

              <span
                className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  project.status === "Live"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {project.status}
              </span>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{project.description}</p>

              <ul className="mt-3 space-y-1.5 flex-1">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <StackTags stack={project.stack} />

              <p className="mt-5 text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:underline">
                {project.label}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-20">
          <Reveal as="h3" className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center">
            Cloud &amp; DevOps Projects
          </Reveal>
          <Reveal
            as="p"
            transition={{ delay: 0.05 }}
            className="mt-3 text-slate-600 dark:text-slate-400 text-center max-w-xl mx-auto"
          >
            Infrastructure, automation, and serverless systems built on AWS.
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12, 0.1)}
            className="mt-10 grid md:grid-cols-3 gap-8"
          >
            {cloudProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                {...liftHover}
                className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display font-semibold text-slate-900 dark:text-white">
                    {project.title}
                  </h4>
                  <span className="text-xs text-slate-500 shrink-0">{project.date}</span>
                </div>

                <ul className="mt-4 space-y-1.5 flex-1">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 dark:bg-indigo-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <StackTags stack={project.stack} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
