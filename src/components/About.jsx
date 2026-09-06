import { motion } from "framer-motion";
import profilePhoto from "../assets/img/profile.png";
import { profile, stats, skillGroups } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { IconChevronRight } from "./icons.jsx";
import { fadeUp, scaleIn, staggerContainer, liftHover } from "../motion.js";

const infoItems = [
  { label: "Name", value: profile.name },
  { label: "Phone", value: profile.phone },
  { label: "Degree", value: profile.degree },
  { label: "City", value: profile.city },
  { label: "Email", value: profile.email },
  { label: "Github", value: "github.com/MaryAkussah" },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Get To Know Me" title="About Me" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              {...liftHover}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-5 text-center"
            >
              <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400">
                {stat.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12">
          <Reveal variants={scaleIn} className="lg:col-span-1">
            <div className="relative w-32 h-32 mx-auto lg:mx-0">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-amber-400 to-indigo-500 opacity-70 blur-md" />
              <img
                src={profilePhoto}
                alt={profile.name}
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-lg"
              />
            </div>

            <div className="mt-6 space-y-2 text-center lg:text-left">
              {infoItems.map((item) => (
                <p key={item.label} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 justify-center lg:justify-start">
                  <IconChevronRight className="w-4 h-4 mt-1 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-white">{item.label}:</span>{" "}
                    <span className="text-slate-600 dark:text-slate-400">{item.value}</span>
                  </span>
                </p>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-6">
            {skillGroups.map((group, i) => (
              <Reveal key={group.category} transition={{ delay: i * 0.05 }}>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
