"use client";
import { motion } from "framer-motion";

interface ShineEffectProps {
  isVisible?: boolean;
  className?: string;
}

export const ShineEffect = ({
  isVisible = false,
  className,
}: ShineEffectProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
      }}
      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 ${className}`}
    />
  );
};
