"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import EBInput from "./EBInput";
import EBForm from "./EBForm";
import AuthLoading from "../loader/AuthLoading";

interface LoanPaymentFormProps {
  isLoading?: boolean;
  onSubmit: (data: { transactionType: string; monthsToPay: number }) => void;
  onClose: () => void;
}

export function LoanPaymentForm({
  onSubmit,
  onClose,
  isLoading,
}: LoanPaymentFormProps) {
  return (
    <motion.div
      className="space-y-6 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <EBForm onSubmit={onSubmit}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-3"
        >
          <EBInput
            name="transactionType"
            label="Transaction Type"
            defaultValue="deposit-loan"
            type="text"
            readOnly={true}
            tabIndex={-1}
            className="cursor-not-allowed text-center"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3"
        >
          <EBInput
            name="monthsToPay"
            label="How much months you want to pay?"
            type="text"
          />
        </motion.div>
        <motion.div
          className="flex gap-3 pt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer flex-1 bg-[#104042] hover:bg-[#0d3335] text-white"
          >
            {isLoading ? <AuthLoading /> : "Submit Payment"}
          </Button>
        </motion.div>
      </EBForm>
    </motion.div>
  );
}
