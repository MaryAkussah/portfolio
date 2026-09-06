import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import {
  IconMail,
  IconPhone,
  IconGithub,
  IconLinkedin,
} from "./icons.jsx";
import { fadeUp, staggerContainer, liftHover, bounceHover, bounceHoverSmall, viewportOnce } from "../motion.js";

const infoBoxes = [
  {
    icon: IconMail,
    title: "Email Me",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: IconPhone,
    title: "Call Me",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = `From: ${form.name} (${form.email})%0D%0A%0D%0A${form.message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${body}`;
    setSent(true);
  }

  const inputClass =
    "w-full rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-colors";

  return (
    <section id="contact" className="py-28 bg-slate-50 dark:bg-slate-800/40 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Let's Talk"
          title="Contact Me"
          description="Have a project in mind or just want to say hello? Reach out."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Reveal className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7">
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-4">
                Social Profiles
              </h3>
              <div className="flex gap-3">
                {[
                  { href: profile.github, icon: IconGithub, label: "GitHub" },
                  { href: profile.linkedin, icon: IconLinkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    {...bounceHoverSmall}
                    className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </Reveal>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.1)}
              className="grid sm:grid-cols-2 gap-6"
            >
              {infoBoxes.map((box) => (
                <motion.a
                  key={box.title}
                  href={box.href}
                  variants={fadeUp}
                  {...liftHover}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7 hover:border-amber-400/60 transition-colors"
                >
                  <box.icon className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                  <h3 className="mt-4 font-display font-semibold text-slate-900 dark:text-white">
                    {box.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 break-words">{box.value}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>

          <Reveal
            as="form"
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className={inputClass}
            />
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-600 dark:text-emerald-400"
              >
                Your email client should now be open with your message ready to send.
              </motion.p>
            )}

            <motion.button
              type="submit"
              {...bounceHover}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/30"
            >
              Send Message
            </motion.button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
