"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedNavItemProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  href: string;
  onHover?: (href: string | null) => void;
}

const navItemVariants: Variants = {
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

export const AnimatedNavItem = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isActive = false,
  href,
  onHover,
}: AnimatedNavItemProps) => {
  return (
    <motion.div
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => onHover?.(href)}
      onHoverEnd={() => onHover?.(null)}
      className={className}
    >
      {children}
    </motion.div>
  );
};
