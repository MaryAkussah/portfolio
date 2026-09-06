import { motion } from "framer-motion";
import { services } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import { IconCode, IconMarketing, IconCloud, IconShield } from "./icons.jsx";
import { fadeUp, staggerContainer, liftHover, viewportOnce } from "../motion.js";

const iconMap = {
  code: IconCode,
  cloud: IconCloud,
  shield: IconShield,
  marketing: IconMarketing,
};

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What I Offer"
          title="My Services"
          description="A few of the ways I can help bring your project to life."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                {...liftHover}
                className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-7 hover:border-amber-400/60 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-500 dark:text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h4 className="mt-5 font-display font-semibold text-slate-900 dark:text-white">
                  {service.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
