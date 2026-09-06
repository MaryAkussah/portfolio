import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../motion.js";

export default function Reveal({ as = "div", variants = fadeUp, className = "", children, ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      {...rest}
    >
      {children}
    </Component>
  );
}
