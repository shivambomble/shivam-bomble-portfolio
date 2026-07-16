import { motion, useReducedMotion } from "framer-motion";
import { sectionVariants } from "../data/animationVariants";

export default function AnimatedSection({ children, className = "", as = "section", ...props }) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px -60px 0px" }}
      transition={prefersReduced ? { duration: 0.01 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}
