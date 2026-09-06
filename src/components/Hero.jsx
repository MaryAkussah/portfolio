import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroVideo from "../assets/video/hero.mp4";
import { profile } from "../data.js";
import { IconArrowDown } from "./icons.jsx";
import { staggerContainer, fadeUp, bounceHover } from "../motion.js";

const MotionLink = motion(Link);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/55 dark:bg-black/70" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.15, 0.1)}
        className="relative z-10 mx-auto max-w-3xl w-full px-6 py-32 text-center flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-display text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4"
        >
          Hello, I'm
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="font-script text-5xl sm:text-6xl lg:text-7xl text-white leading-tight drop-shadow-lg"
        >
          {profile.name}
        </motion.h1>
        <motion.h2
          variants={fadeUp}
          className="mt-5 text-base sm:text-lg tracking-widest uppercase text-white/90 font-medium"
        >
          {profile.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-white/80 max-w-xl">
          Building responsive React/Next.js applications and reliable AWS
          cloud infrastructure from Accra, Ghana — with a background in IT
          audit and GRC.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
          <MotionLink
            to="/projects"
            {...bounceHover}
            className="px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-semibold shadow-lg shadow-amber-400/30"
          >
            View My Work
          </MotionLink>
          <MotionLink
            to="/contact"
            {...bounceHover}
            className="px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            Get In Touch
          </MotionLink>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <Link
          to="/about"
          aria-label="See more about me"
          className="block text-white/70 hover:text-amber-400 transition-colors"
        >
          <IconArrowDown className="w-6 h-6" />
        </Link>
      </motion.div>
    </section>
  );
}
