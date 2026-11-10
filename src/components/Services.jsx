import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services, processSteps } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { IconCode, IconMarketing, IconCloud, IconShield, IconCheck, IconChevronRight } from "./icons.jsx";
import { fadeUp, staggerContainer, liftHover, bounceHover, viewportOnce } from "../motion.js";

const MotionLink = motion(Link);

const iconMap = {
  code: IconCode,
  cloud: IconCloud,
  shield: IconShield,
  marketing: IconMarketing,
};

function scrollToService(id) {
  document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Overview cards ---------- */

function Overview() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.1)}
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {services.map((service, i) => {
        const Icon = iconMap[service.icon];
        return (
          <motion.button
            key={service.id}
            type="button"
            onClick={() => scrollToService(service.id)}
            variants={fadeUp}
            {...liftHover}
            className="group relative text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7 hover:border-amber-400/60 hover:shadow-xl hover:shadow-slate-900/5 transition-[border-color,box-shadow] duration-300 overflow-hidden"
          >
            <span className="absolute top-5 right-6 font-display text-4xl font-extrabold text-slate-100 dark:text-slate-700/60 select-none">
              0{i + 1}
            </span>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="relative w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 dark:text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <h3 className="relative mt-5 font-display font-semibold text-slate-900 dark:text-white">
              {service.title}
            </h3>
            <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {service.tagline}
            </p>
            <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400">
              Learn more
              <IconChevronRight className="w-4 h-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ---------- Detailed service block ---------- */

function ServiceDetail({ service, index }) {
  const Icon = iconMap[service.icon];
  const reversed = index % 2 === 1;

  return (
    <Reveal
      id={`service-${service.id}`}
      className="scroll-mt-28 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden"
    >
      <div className={`grid lg:grid-cols-5 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Summary column */}
        <div className="lg:col-span-2 relative p-8 sm:p-10 bg-slate-900 text-white overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(rgb(148 163 184 / 0.2) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
                <Icon className="w-7 h-7" />
              </span>
              <span className="font-display text-5xl font-extrabold text-white/10">0{index + 1}</span>
            </div>

            <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold">{service.title}</h3>
            <p className="mt-2 text-amber-400 font-medium">{service.tagline}</p>
            <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">{service.description}</p>

            <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
              <p className="font-display text-4xl font-extrabold text-amber-400">{service.metric.value}</p>
              <p className="mt-1 text-sm text-slate-300">{service.metric.label}</p>
            </div>
          </div>
        </div>

        {/* Details column */}
        <div className="lg:col-span-3 p-8 sm:p-10">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            What's included
          </h4>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.05)}
            className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3"
          >
            {service.included.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-400/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3" />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <h4 className="mt-8 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Tools &amp; expertise
          </h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {service.tools.map((tool) => (
              <motion.span
                key={tool}
                whileHover={{ y: -2, scale: 1.05 }}
                className="rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {tool}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Ideal for</p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{service.idealFor}</p>
            </div>
            <div className="rounded-2xl bg-amber-400/10 border border-amber-400/30 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">Proven experience</p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{service.proof}</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Process ---------- */

function Process() {
  return (
    <div className="mt-28">
      <Reveal className="text-center max-w-xl mx-auto mb-14">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-amber-500 dark:text-amber-400">
          How I Work
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          A simple, transparent process
        </h3>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Whatever the service, every engagement follows the same clear steps.
        </p>
      </Reveal>

      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.15)}
        className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* connecting line (desktop) */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-0.5 origin-left bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400"
        />
        {processSteps.map((step, i) => (
          <motion.li key={step.title} variants={fadeUp} className="relative text-center">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 6 }}
              className="relative mx-auto w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-400 flex items-center justify-center font-display text-lg font-bold text-amber-500 dark:text-amber-400 shadow-lg shadow-amber-400/20"
            >
              {i + 1}
            </motion.span>
            <h4 className="mt-5 font-display font-semibold text-slate-900 dark:text-white">{step.title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

/* ---------- CTA ---------- */

function CallToAction() {
  return (
    <Reveal className="mt-28 relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 sm:px-14 text-center">
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-amber-400/25 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="relative max-w-2xl mx-auto">
        <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">
          Have a project in mind?
        </h3>
        <p className="mt-4 text-slate-300">
          Whether it's a new website, a move to the cloud or getting audit-ready, I'd love to hear about it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <MotionLink
            to="/contact"
            {...bounceHover}
            className="px-7 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/30"
          >
            Start a Conversation
          </MotionLink>
          <MotionLink
            to="/projects"
            {...bounceHover}
            className="px-7 py-3 rounded-full border border-white/30 text-white font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            See My Work
          </MotionLink>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- Section ---------- */

export default function Services() {
  return (
    <section id="services" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What I Offer"
          title="My Services"
          description="From pixel-perfect interfaces to secure cloud infrastructure and compliance. End-to-end support for your digital projects."
        />

        <Overview />

        <div className="mt-24 space-y-10">
          {services.map((service, i) => (
            <ServiceDetail key={service.id} service={service} index={i} />
          ))}
        </div>

        <Process />
        <CallToAction />
      </div>
    </section>
  );
}
