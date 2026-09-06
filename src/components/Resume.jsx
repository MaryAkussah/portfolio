import { motion } from "framer-motion";
import { education, experience } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import { fadeUp, staggerContainer, viewportOnce } from "../motion.js";

function TimelineRow({ title, period, place, description, bullets }) {
  return (
    <motion.div
      variants={fadeUp}
      className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-8 border-b border-slate-200 dark:border-slate-700 last:border-0"
    >
      <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{period}</p>

      <div>
        <h4 className="font-display font-semibold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-1">{place}</p>
        {description && (
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
        )}
        {bullets && (
          <ul className="mt-3 space-y-1.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-500 dark:bg-amber-400 shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="My Journey" title="Resume" />

        <div className="mb-4">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
            Education
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.15)}
          >
            {education.map((item) => (
              <TimelineRow
                key={item.degree}
                title={item.degree}
                period={item.period}
                place={item.place}
                description={item.description}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
            Professional Experience
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
          >
            {experience.map((item) => (
              <TimelineRow
                key={`${item.role}-${item.place}`}
                title={item.role}
                period={item.period}
                place={item.place}
                bullets={item.bullets}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
