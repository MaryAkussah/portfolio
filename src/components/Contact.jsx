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

// FormSubmit forwards submissions to the email in profile.email (no backend needed).
const FORM_ENDPOINT = "https://formsubmit.co/ajax";

// Visitor details are remembered only in the visitor's own browser (localStorage).
const STORAGE_KEY = "contact-details";

function loadSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data && typeof data === "object" ? data : null;
  } catch {
    return null;
  }
}

function persist(details) {
  try {
    if (details) localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode etc.) — ignore */
  }
}

export default function Contact() {
  const [saved, setSaved] = useState(loadSaved);
  const [form, setForm] = useState(() => ({
    name: saved?.name ?? "",
    email: saved?.emails?.[0] ?? "",
    subject: "",
    message: "",
  }));
  const [remember, setRemember] = useState(true);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === "success" || status === "error") setStatus("idle");
  }

  function rememberDetails() {
    if (!remember) {
      persist(null);
      setSaved(null);
      return;
    }
    const emails = [form.email, ...(saved?.emails ?? [])]
      .filter((e, i, arr) => e && arr.findIndex((x) => x.toLowerCase() === e.toLowerCase()) === i)
      .slice(0, 3);
    const details = { name: form.name, emails };
    persist(details);
    setSaved(details);
  }

  function clearSaved() {
    persist(null);
    setSaved(null);
    setForm({ ...form, name: "", email: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honey) return; // spam bot filled the hidden field
    setStatus("sending");
    try {
      const res = await fetch(`${FORM_ENDPOINT}/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _subject: `Portfolio contact: ${form.subject}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false || data.success === "false") throw new Error(data.message);
      setStatus("success");
      rememberDetails();
      setForm(
        remember
          ? { name: form.name, email: form.email, subject: "", message: "" }
          : { name: "", email: "", subject: "", message: "" }
      );
    } catch {
      setStatus("error");
    }
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
            {saved?.name && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-amber-400/10 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300"
              >
                <span>
                  Welcome back, <span className="font-semibold">{saved.name.split(" ")[0]}</span>! Your details are filled in.
                </span>
                <button
                  type="button"
                  onClick={clearSaved}
                  className="font-medium text-amber-700 dark:text-amber-400 hover:underline"
                >
                  Not you? Clear
                </button>
              </motion.div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                autoCapitalize="words"
                aria-label="Your name"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                aria-label="Your email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              autoComplete="off"
              aria-label="Subject"
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

            <label className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              Remember my name and email on this device
            </label>

            {/* honeypot: hidden from people, catches spam bots */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
              >
                Thank you! Your message has been received, I'll get back to you soon.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-400"
              >
                Sorry, something went wrong. Please try again or email me directly at{" "}
                <a href={`mailto:${profile.email}`} className="font-semibold underline">
                  {profile.email}
                </a>
                .
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              {...bounceHover}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/30 disabled:opacity-70 disabled:cursor-wait inline-flex items-center justify-center gap-2"
            >
              {status === "sending" && (
                <span className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
              )}
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
