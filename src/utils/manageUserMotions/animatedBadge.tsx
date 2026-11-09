"use client";

import type React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function AnimatedBadge({
  children,
  variant = "default",
  className,
}: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge
        variant={variant}
        className={cn("transition-all duration-200", className)}
      >
        {children}
      </Badge>
    </motion.div>
  );
}
