"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
}: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled}
        className={cn(className)}
      >
        {children}
      </Button>
    </motion.div>
  );
}
