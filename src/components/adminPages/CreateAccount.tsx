"use client";
import type React from "react";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import EBSelect from "@/shared/form/EBSelect";
import { selectBranchOptions } from "@/utils/selectOptions/useSelectOptions";
import type { FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { allDistict } from "@bangladeshi/bangladesh-address";
import EBDatePicker from "@/shared/form/EBDatePicker";
import dayjs from "dayjs";
import { useCreateAccountMutation } from "@/redux/api/accountApi";
import { toast } from "sonner";
import { TGlobalResponse } from "@/types/global.type";
import { useGetBranchesQuery } from "@/redux/api/branchApi";
import AuthLoading from "@/shared/loader/AuthLoading";

// Reusable Motion Components
const MotionContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const MotionField = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const accountTypeOptions = [
  { label: "Savings", value: "savings" },
  { label: "Business", value: "business" },
  { label: "Checking", value: "checking" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const cityOptions = allDistict()
  .sort()
  .map((dis: string) => ({
    label: dis,
    value: dis,
  }));

const CreateAccount = () => {
  const { data: branches } = useGetBranchesQuery(undefined);
  const branchOptions = selectBranchOptions(branches?.data || []);
  const [createAccount, { isLoading }] = useCreateAccountMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const accountData = {
        ...data,
        dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
      };
      const res = (await createAccount(accountData)) as TGlobalResponse;
      console.log(res);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Account created successfully", {
          duration: 3000,
        });
      } else {
        toast.error(res?.error?.data?.message || "Account created Failed", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center px-4">
        <MotionContainer className="w-full max-w-4xl">
          <div className="rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] p-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl  text-white"
              >
                Create Account
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-1 bg-white/30 mx-auto mt-3 rounded-full"
              />
            </div>

            {/* Form */}
            <div className="p-8">
              <EBForm onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3">
                  <MotionField delay={0.1}>
                    <EBSelect
                      label="Branch"
                      name="branch"
                      options={branchOptions}
                      placeholder="Select your branch"
                      className="w-full"
                    />
                  </MotionField>

                  <MotionField delay={0.15}>
                    <EBSelect
                      label="Account Type"
                      name="accountType"
                      options={accountTypeOptions}
                      placeholder="Choose account type"
                      className="w-full"
                    />
                  </MotionField>

                  <MotionField delay={0.25}>
                    <EBDatePicker label="Date of Birth" name="dateOfBirth" />
                  </MotionField>

                  <MotionField delay={0.3}>
                    <EBSelect
                      label="Gender"
                      name="gender"
                      options={genderOptions}
                      placeholder="Select gender"
                      className="w-full"
                    />
                  </MotionField>

                  <MotionField delay={0.35}>
                    <EBSelect
                      label="City"
                      name="city"
                      options={cityOptions}
                      placeholder="Enter your city"
                      className="w-full"
                    />
                  </MotionField>

                  <MotionField delay={0.4}>
                    <EBInput
                      label="Your Address"
                      name="address"
                      type="text"
                      placeholder="Enter your full address"
                    />
                  </MotionField>

                  <MotionField delay={0.45}>
                    <EBInput
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      placeholder="Enter postal code"
                    />
                  </MotionField>

                  <MotionField delay={0.5}>
                    <EBInput
                      label="Country"
                      name="country"
                      defaultValue="Bangladesh"
                      type="text"
                    />
                  </MotionField>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 flex justify-center"
                >
                  <Button
                    type="submit"
                    className="bg-[#104042] hover:bg-[#0d3335] text-white px-12 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    {isLoading ? <AuthLoading /> : "Create Account"}
                  </Button>
                </motion.div>
              </EBForm>
            </div>
          </div>
        </MotionContainer>
      </div>
    </div>
  );
};

export default CreateAccount;
