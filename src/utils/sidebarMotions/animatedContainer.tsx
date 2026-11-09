"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export const containerVariants: Variants = {
  hidden: {
    x: -300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing curve
      staggerChildren: 0.1,
    },
  },
};

export const AnimatedContainer = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  staggerChildren = 0.1,
}: AnimatedContainerProps) => {
  const customVariants: Variants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};
