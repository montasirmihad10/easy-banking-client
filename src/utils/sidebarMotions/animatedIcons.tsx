"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedIconProps {
  children: ReactNode;
  isActive?: boolean;
  isHovered?: boolean;
  className?: string;
}

export const AnimatedIcon = ({
  children,
  isActive = false,
  isHovered = false,
  className,
}: AnimatedIconProps) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.1 : 1,
        rotate: isHovered ? 10 : 0,
      }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
