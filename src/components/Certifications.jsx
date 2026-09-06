import { motion } from "framer-motion";
import { certifications } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import { IconBadge } from "./icons.jsx";
import { fadeUp, staggerContainer, liftHover, viewportOnce } from "../motion.js";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-28 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Always Learning" title="Certifications" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={fadeUp}
              {...liftHover}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-6 hover:border-amber-400/60 transition-colors"
            >
              <IconBadge className="w-7 h-7 text-amber-500 dark:text-amber-400" />
              <h4 className="mt-4 font-display font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                {cert.name}
              </h4>
              {cert.issuer && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
