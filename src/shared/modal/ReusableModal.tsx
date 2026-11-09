"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface ReusableModalProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ReusableModal({
  trigger,
  title,
  children,
  open,
  onOpenChange,
}: ReusableModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <DialogTitle className="text-[#104042]">{title}</DialogTitle>
              <DialogDescription>
                Fill in the amount of months you want to pay for the loan.
              </DialogDescription>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
