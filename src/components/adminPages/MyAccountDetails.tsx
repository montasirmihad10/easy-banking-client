/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, Variants } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Shield,
  Globe,
  Banknote,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const MyAccountDetails = ({ myAccount }: { myAccount: any }) => {
  const account = myAccount?.data;

  if (!account) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center text-slate-500">
          No account data available
        </div>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: account.currency || "BDT",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
      >
        {/* Personal Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white mr-3 sm:mr-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  Personal Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Account holder details
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden mb-3 sm:mb-4">
                  <Image
                    src={
                      account.user?.profilePhotoUrl ||
                      "/placeholder.svg?height=96&width=96"
                    }
                    width={500}
                    height={500}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-1">
                  {account.accountHolderName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 capitalize">
                  {account.gender}
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        Email
                      </p>
                      <p className="text-sm sm:text-base text-slate-800">
                        {account.user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        Phone
                      </p>
                      <p className="text-sm sm:text-base text-slate-800">
                        {account.user?.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        Date of Birth
                      </p>
                      <p className="text-sm sm:text-base text-slate-800">
                        {formatDate(account.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 mt-1" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        Address
                      </p>
                      <p className="text-sm sm:text-base text-slate-800">
                        {account.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-slate-600">
                        Location
                      </p>
                      <p className="text-sm sm:text-base text-slate-800">
                        {account.city}, {account.country} - {account.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Branch Information */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white mr-3 sm:mr-4">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  Branch Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your home branch details
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                    {account.branch?.name}
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 mt-1" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-600">
                          Branch Address
                        </p>
                        <p className="text-sm sm:text-base text-slate-800">
                          {account.branch?.address}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600">
                          {account.branch?.city}, {account.branch?.state} -{" "}
                          {account.branch?.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-600">
                          Contact
                        </p>
                        <p className="text-sm sm:text-base text-slate-800">
                          {account.branch?.contactNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-600">
                          Email
                        </p>
                        <p className="text-sm sm:text-base text-slate-800">
                          {account.branch?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                    Branch Performance
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                          Reserved Balance
                        </span>
                        <Banknote className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-slate-800">
                        {formatCurrency(account.branch?.reserevedBalance)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                          Used Balance
                        </span>
                        <TrendingUp className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-slate-800">
                        {formatCurrency(account.branch?.usedBalance)}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                          Liquidity Ratio
                        </span>
                        <Shield className="w-4 h-4 text-slate-500" />
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-slate-800">
                        {(
                          (account.branch?.usedBalance /
                            account.branch?.reserevedBalance) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
                {account.branch?.openingSchedule && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                      Opening Hours
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                        <span className="text-sm sm:text-base font-medium text-slate-800">
                          Business Hours
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600">
                        {account.branch.openingSchedule.days?.join(", ")} <br />
                        {account.branch.openingSchedule.openTime} -{" "}
                        {account.branch.openingSchedule.closeTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Account Statistics */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 text-center">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white w-fit mx-auto mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2">
                Account Age
              </h4>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">
                {Math.floor(
                  (Date.now() - new Date(account.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
              <p className="text-xs sm:text-sm text-slate-500">Since opening</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 text-center">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white w-fit mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2">
                Total Transactions
              </h4>
              <p className="text-xl sm:text-2xl font-bold text-slate-800">
                {account.transactions?.length || 0}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">All time</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-100 text-center">
              <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white w-fit mx-auto mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2">
                Account Security
              </h4>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                Secure
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                All verifications passed
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyAccountDetails;
