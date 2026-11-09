/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import Image from "next/image";

import { useGetMyBranchQuery } from "@/redux/api/branchApi";
import Loading from "@/shared/loading/Loading";
import TableModal from "@/shared/modal/TableModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UpdateBranch from "@/components/adminPages/UpdateBranch";

const ManagerMyBranchPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const { data: myBranch, isLoading } = useGetMyBranchQuery(undefined);
  const branch = myBranch?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!branch) {
    return (
      <div className="pt-40">
        <p className="text-center text-rose-500 font-medium">
          You are not included in any branch yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header with Update Button */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#104042] mb-1 sm:mb-2">
            My Branch
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your branch information and details
          </p>
        </div>
        <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
          <TableModal
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (isOpen) {
                setId(branch._id);
              } else {
                setId(null);
              }
            }}
            title="Edit Branch"
            description="Update Branch details here."
            width="!w-full !max-w-3xl"
            trigger={
              <Button
                variant="ghost"
                size="sm"
                className="w-full sm:w-auto bg-[#104042] hover:bg-[#0d3335] text-white text-sm"
                onClick={() => setOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            }
          >
            <UpdateBranch id2={id} setOpen2={setOpen} />
          </TableModal>
        </motion.div>
      </motion.div>

      {/* Main Branch Card */}
      <motion.div
        className="bg-gray-200 rounded-xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Branch Header */}
        <div className="bg-[#104042] text-white p-3 sm:p-4">
          <motion.h2
            className="text-lg sm:text-xl font-bold mb-1 sm:mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {branch?.name}
          </motion.h2>
          <p className="text-xs sm:text-base text-blue-100">
            Branch Code: {branch.code}
          </p>
        </div>

        {/* Branch Details */}
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Contact Information */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#104042] mb-3 sm:mb-4 border-b-2 border-[#104042] pb-1 sm:pb-2 inline-block">
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#104042] rounded-full mt-1 sm:mt-2"></div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-gray-700 block">
                      Email:
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {branch.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#104042] rounded-full mt-1 sm:mt-2"></div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-gray-700 block">
                      Contact:
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {branch.contactNumber}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#104042] rounded-full mt-1 sm:mt-2"></div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-gray-700 block">
                      Address:
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {branch.address}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#104042] rounded-full mt-1 sm:mt-2"></div>
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-gray-700 block">
                      Location:
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {branch.city}, {branch.state}, {branch.country} -{" "}
                      {branch.zipCode}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Financial Information */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#104042] mb-3 sm:mb-4 border-b-2 border-[#104042] pb-1 sm:pb-2 inline-block">
                Financial Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">
                    Used Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-800">
                    ৳{branch.usedBalance.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-600 font-medium">
                    Reserved Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-800">
                    ৳{branch.reserevedBalance.toFixed(2)}
                  </p>
                </div>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-purple-600 font-medium">
                    Interest Balance
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-800">
                    ৳{branch.interestBalance.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Operating Schedule */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#104042] mb-3 sm:mb-4 border-b-2 border-[#104042] pb-1 sm:pb-2 inline-block">
              Operating Schedule
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                    Operating Days
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {branch.openingSchedule?.days?.join(", ")}
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                    Hours
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {branch.openingSchedule?.openTime} -{" "}
                    {branch.openingSchedule?.closeTime}
                  </p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border w-full sm:w-auto">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                    Opened Since
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-800">
                    {new Date(branch.branchOpenedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Managers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-[#104042] mb-4 sm:mb-6 border-b-2 border-[#104042] pb-1 sm:pb-2 inline-block">
              Branch Managers ({branch.managers.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {branch.managers.map((manager: any, index: number) => (
                <motion.div
                  key={manager._id}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <div className="relative">
                    <Image
                      src={
                        manager.profilePhotoUrl ||
                        "/placeholder.svg?height=56&width=56"
                      }
                      alt={manager.name.firstName}
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover border-2 sm:border-3 border-[#104042]"
                      width={64}
                      height={64}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm sm:text-lg truncate">
                      {manager.name.firstName} {manager.name.lastName}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                      {manager.email}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                      {manager.phoneNumber}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="px-2 py-0.5 sm:py-1 bg-[#104042] text-white text-xs font-medium rounded-full">
                        {manager.role.toUpperCase()}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        ● Active
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManagerMyBranchPage;
