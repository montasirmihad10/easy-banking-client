"use client";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  isActive?: boolean;
  isHovered?: boolean;
  className?: string;
}

export const AnimatedBackground = ({
  isActive = false,
  isHovered = false,
  className,
}: AnimatedBackgroundProps) => {
  if (isActive) {
    return (
      <motion.div
        layoutId="activeIndicator"
        className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl ${className}`}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        }}
      />
    );
  }

  if (isHovered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl ${className}`}
        transition={{ duration: 0.2 }}
      />
    );
  }

  return null;
};
