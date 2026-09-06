export const springy = { type: "spring", stiffness: 260, damping: 20 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: springy },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springy },
};

export const staggerContainer = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const viewportOnce = { once: true, amount: 0.2 };

export const bounceHover = {
  whileHover: { scale: 1.06 },
  whileTap: { scale: 0.94 },
  transition: springy,
};

export const bounceHoverSmall = {
  whileHover: { scale: 1.12, rotate: -4 },
  whileTap: { scale: 0.9 },
  transition: springy,
};

export const liftHover = {
  whileHover: { y: -8, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: springy,
};
