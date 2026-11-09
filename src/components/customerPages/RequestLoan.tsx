/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { motion } from "framer-motion";
import type { FieldValues } from "react-hook-form";
import { Calendar, MapPin } from "lucide-react";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import EBDatePicker from "@/shared/form/EBDatePicker";
import dayjs from "dayjs";
import { useRequestLoanMutation } from "@/redux/api/loanApi";
import { toast } from "sonner";
import AuthLoading from "@/shared/loader/AuthLoading";
import { TbCoinTaka } from "react-icons/tb";

const RequestLoan = ({ myAccount }: { myAccount: any }) => {
  const [requestLoan, { isLoading }] = useRequestLoanMutation();

  const branch = myAccount?.data?.branch?._id;
  const onSubmit = async (data: FieldValues) => {
    try {
      const loanInfo = {
        branch: branch,
        loanAmount: Number(data?.loanAmount),
        term: Number(data?.term),
        startDate: dayjs(data?.startDate).format("YYYY-MM-DD"),
      };
      const res = await requestLoan(loanInfo);
      console.log(res);
      if (res?.data?.success) {
        toast.success("Loan Request Sent", { duration: 4000 });
      } else {
        toast.error("Loan process Failed | Try again", { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-4 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-5">
          <div className="flex items-center justify-center bg-[#104042] rounded-full mb-3 py-1">
            <TbCoinTaka className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Request a Loan</h1>
          </div>
          <p className="text-lg text-gray-600">
            Get the financial support you need with our quick and easy loan
            application
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-200 rounded-2xl shadow-xl p-5 border border-gray-100"
        >
          <EBForm onSubmit={onSubmit}>
            <div className="space-y-6">
              {/* Loan Amount */}
              <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center mb-2">
                  <TbCoinTaka className="w-5 h-5 text-[#104042] mr-2" />
                  <label className="text-sm  text-gray-700">
                    Loan Amount
                  </label>
                </div>
                <EBInput
                  label=""
                  name="loanAmount"
                  type="text"
                  placeholder="Enter the amount you need (e.g., BDT-50,000)"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-[#104042] focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200"
                />
              </motion.div>

              {/* Loan Term */}
              <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center mb-2">
                  <Calendar className="w-5 h-5 text-[#104042] mr-2" />
                  <label className="text-sm  text-gray-700">
                    Loan Term
                  </label>
                </div>
                <EBInput
                  label=""
                  name="term"
                  type="text"
                  placeholder="How long do you need? (e.g., 12 months)"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-[#104042] focus:ring-2 focus:ring-[#104042]/20 transition-all duration-200"
                />
              </motion.div>

              {/* Start Date */}
              <motion.div variants={itemVariants} className="relative">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-[#104042] mr-2" />
                  <label className="text-sm  text-gray-700">
                    Preferred Start Date
                  </label>
                </div>
                <EBDatePicker label="" name="startDate" />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-3 text-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#104042] hover:bg-[#0d3335] text-white  w-60 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {isLoading ? <AuthLoading /> : "Submit Loan Request"}
                </motion.button>
              </motion.div>
            </div>
          </EBForm>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-4 bg-[#104042]/5 rounded-lg border border-[#104042]/10"
          >
            <p className="text-sm text-gray-600 text-center">
              <span className=" text-[#104042]">
                Quick Processing:
              </span>{" "}
              Your loan request will be reviewed within 24-48 hours. We'll
              contact you with updates.
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{" "}
            <span className="text-[#104042] ">
              support@bank.com
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RequestLoan;
