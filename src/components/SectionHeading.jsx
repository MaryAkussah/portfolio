import Reveal from "./Reveal.jsx";
import { fadeIn } from "../motion.js";

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal variants={fadeIn} className="text-center max-w-2xl mx-auto mb-14">
      <p className="font-display text-amber-500 dark:text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-slate-600 dark:text-slate-400">{description}</p>
      )}
      <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-amber-500 dark:bg-amber-400" />
    </Reveal>
  );
}
