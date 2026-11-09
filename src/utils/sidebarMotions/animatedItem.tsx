"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  index?: number;
}

export const itemVariants: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const AnimatedItem = ({
  children,
  className,
  delay = 0,
  duration = 0.4,
  index = 0,
}: AnimatedItemProps) => {
  const customVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay: delay + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
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
