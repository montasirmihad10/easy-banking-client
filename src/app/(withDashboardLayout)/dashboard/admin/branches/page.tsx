/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/shared/loading/Loading";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Edit, Eye, Building2, Hash } from "lucide-react";
import Link from "next/link";
import { useGetBranchesQuery } from "@/redux/api/branchApi";
import UpdateBranch from "@/components/adminPages/UpdateBranch";
import TableModal from "@/shared/modal/TableModal";
import { useState } from "react";
import UpdateBranchManager from "@/components/adminPages/UpdateBranchManager";

const AdminBranchesPage = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [id1, setId1] = useState<string | null>(null);
  const [id2, setId2] = useState<string | null>(null);
  const { data: allBranches, isLoading } = useGetBranchesQuery(undefined);
  const branches = allBranches?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!branches) {
    return (
      <div className="pt-40">
        <p className="text-center text-rose-500 font-medium">
          No branches Available
        </p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants: Variants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="px-4 sm:px-6 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#104042] mb-1 sm:mb-2">
                Branch Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage and monitor all branch locations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <Badge
                variant="secondary"
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                Total Branches: {branches?.length || 0}
              </Badge>
              <Link
                href="/dashboard/admin/create-branch"
                className="bg-[#104042] hover:bg-[#0d3335] text-white flex items-center justify-center gap-2 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1 text-sm sm:text-base w-full sm:w-auto"
              >
                <Building2 className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add New Branch</span>
                <span className="sm:hidden">Add Branch</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {branches?.map((branch: any, index: number) => (
            <motion.div
              key={branch._id || index}
              variants={cardVariants}
              className="h-full"
            >
              <motion.div variants={hoverVariants} className="h-full">
                <Card className="h-full shadow-md sm:shadow-lg border-0 bg-gray-200 hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                          {branch.name}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm">
                            Active
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Hash className="w-3 h-3 mr-1" />
                            {branch.code}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                    {/* Address and Contact */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#104042] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            Location
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {branch.city}, {branch.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#104042] flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            Contact
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {branch.contactNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Balance Summary */}
                    <div className="pt-2 sm:pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <div className="bg-[#104042]/5 p-2 sm:p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Reserved Balance
                        </p>
                        <p className="text-base sm:text-lg font-bold text-[#104042]">
                          {formatCurrency(branch.reserevedBalance)}
                        </p>
                      </div>
                      <div className="bg-[#104042]/5 p-2 sm:p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          Used Balance
                        </p>
                        <p className="text-base sm:text-lg font-bold text-[#104042]">
                          {formatCurrency(branch.usedBalance)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-100">
                      <TableModal
                        open={open1}
                        onOpenChange={(isOpen) => {
                          setOpen1(isOpen);
                          if (isOpen) {
                            setId1(branch._id);
                          } else {
                            setId1(null);
                          }
                        }}
                        title="Add Manager"
                        description="Update Branch managers here"
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 bg-[#104042] hover:bg-[#0d3335] text-white hover:text-white cursor-pointer py-1 w-full"
                          >
                            <Edit className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm">
                              Add manager
                            </span>
                          </Button>
                        }
                      >
                        <UpdateBranchManager setOpen1={setOpen1} id1={id1} />
                      </TableModal>
                      <TableModal
                        open={open2}
                        onOpenChange={(isOpen) => {
                          setOpen2(isOpen);
                          if (isOpen) {
                            setId2(branch._id);
                          } else {
                            setId2(null);
                          }
                        }}
                        title="Edit Branch"
                        description="Update Branch details here."
                        width="!w-full !max-w-3xl"
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1 bg-[#104042] hover:bg-[#0d3335] text-white hover:text-white cursor-pointer w-full py-1"
                          >
                            <Edit className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="text-xs sm:text-sm">Edit</span>
                          </Button>
                        }
                      >
                        <UpdateBranch id2={id2} setOpen2={setOpen2} />
                      </TableModal>
                    </div>
                    <Link
                      className="flex items-center justify-center gap-2 border-[#104042] text-[#104042] hover:bg-[#104042] hover:text-white bg-transparent cursor-pointer w-40 mx-auto rounded-lg duration-200 transition-all border-2 px-4 py-1 text-xs sm:text-sm"
                      href={`/dashboard/admin/branches/${branch._id}`}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {branches?.length === 0 && (
          <motion.div
            className="text-center py-8 sm:py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
              No branches found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Get started by adding your first branch location.
            </p>
            <Button className="bg-[#104042] hover:bg-[#0d3335] text-white text-sm sm:text-base">
              <Building2 className="w-4 h-4 mr-1 sm:mr-2" />
              Add First Branch
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminBranchesPage;
