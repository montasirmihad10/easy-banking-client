"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SlideInTextProps {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

export const SlideInText = ({
  children,
  delay = 0,
  direction = "up",
  className,
}: SlideInTextProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -20, opacity: 0 };
      case "right":
        return { x: 20, opacity: 0 };
      case "up":
        return { y: 20, opacity: 0 };
      case "down":
        return { y: -20, opacity: 0 };
      default:
        return { y: 20, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
