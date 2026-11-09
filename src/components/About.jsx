import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profilePhoto from "../assets/img/profile.jpg";
import { profile, stats, skillGroups, aboutBio } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconGraduation,
  IconGithub,
  IconLinkedin,
  IconCode,
  IconCloud,
  IconBox,
  IconDatabase,
  IconShield,
  IconOffice,
} from "./icons.jsx";
import { fadeUp, scaleIn, staggerContainer, liftHover, bounceHover, viewportOnce } from "../motion.js";

const MotionLink = motion(Link);

const infoItems = [
  { icon: IconMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: IconPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: IconGraduation, label: "Degree", value: profile.degree },
  { icon: IconMapPin, label: "Location", value: profile.city },
];

const socials = [
  { icon: IconGithub, label: "GitHub", href: profile.github },
  { icon: IconLinkedin, label: "LinkedIn", href: profile.linkedin },
];

const groupIcons = {
  "Frontend Development": IconCode,
  "Cloud & DevOps": IconCloud,
  Containerization: IconBox,
  Databases: IconDatabase,
  "GRC & Audit": IconShield,
  "Other Skills": IconOffice,
};

export default function About() {
  return (
    <section id="about" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Get To Know Me" title="About Me" />

        {/* ---------- Intro: photo + bio ---------- */}
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-center">
          <Reveal variants={scaleIn} className="relative mx-auto w-full max-w-[22rem] lg:max-w-[25rem] mb-6 lg:mb-0">
            {/* decorative backdrop */}
            <div className="absolute inset-0 rotate-6 rounded-[2rem] bg-amber-400 dark:bg-amber-500/80" />
            <div
              className="absolute -top-6 -left-6 w-28 h-28 opacity-60 text-amber-500 dark:text-amber-400"
              style={{
                backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* photo */}
            <motion.div
              whileHover={{ rotate: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative overflow-hidden rounded-[2rem] border-[6px] border-white dark:border-slate-800 shadow-2xl shadow-slate-900/20"
            >
              <img
                src={profilePhoto}
                alt={profile.name}
                className="w-full aspect-square object-cover object-[50%_30%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </motion.div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-3 sm:-right-6 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-center"
            >
              <p className="font-display text-xl font-bold text-amber-500 dark:text-amber-400 leading-none">
                {stats[1].value}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-tight">
                Years
                <br />
                Experience
              </p>
            </motion.div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">Open to opportunities</span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-amber-500 dark:text-amber-400">
                Who I am
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                {profile.title}
              </h3>
            </Reveal>

            <Reveal transition={{ delay: 0.05 }} className="mt-5 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              {aboutBio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.08)}
              className="mt-8 grid sm:grid-cols-2 gap-3"
            >
              {infoItems.map(({ icon: Icon, label, value, href }) => {
                const Wrapper = href ? motion.a : motion.div;
                return (
                  <Wrapper
                    key={label}
                    variants={fadeUp}
                    {...(href ? { href } : {})}
                    className="group flex items-center gap-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-3 transition-colors hover:border-amber-400/60"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-400/10 text-amber-500 dark:text-amber-400 shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</span>
                      <span className="block text-sm font-medium text-slate-900 dark:text-white truncate">{value}</span>
                    </span>
                  </Wrapper>
                );
              })}
            </motion.div>

            <Reveal transition={{ delay: 0.1 }} className="mt-8 flex flex-wrap items-center gap-3">
              <MotionLink
                to="/contact"
                {...bounceHover}
                className="px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/30"
              >
                Let's Work Together
              </MotionLink>
              <MotionLink
                to="/resume"
                {...bounceHover}
                className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white font-semibold hover:border-amber-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                View Resume
              </MotionLink>
              <div className="flex gap-2 ml-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- Stats strip ---------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="mt-24 grid grid-cols-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 divide-x divide-slate-200 dark:divide-slate-700 shadow-sm"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="py-8 px-3 text-center">
              <p className="font-display text-3xl sm:text-5xl font-bold text-amber-500 dark:text-amber-400">
                {stat.value}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- Skills ---------- */}
        <div className="mt-24">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Skills &amp; Expertise
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              The tools and disciplines I work with every day.
            </p>
          </Reveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillGroups.map((group) => {
              const Icon = groupIcons[group.category] ?? IconCode;
              return (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  {...liftHover}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6 hover:border-amber-400/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-400/10 text-amber-500 dark:text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-display font-semibold text-slate-900 dark:text-white">{group.category}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
