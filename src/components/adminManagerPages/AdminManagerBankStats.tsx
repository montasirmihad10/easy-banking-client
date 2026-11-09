/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import {
  useGetAdminLastMonthStatsQuery,
  useGetAdminStatsQuery,
} from "@/redux/api/adminApi";
import Loading from "@/shared/loading/Loading";
import {
  Users,
  CreditCard,
  DollarSign,
  Activity,
  Building2,
} from "lucide-react";
import MetricCard from "../charts/MetricCard";
import DoughnutChart from "../charts/DoughnartChart";
import BarChart from "../charts/Barchart";
import LineChart from "../charts/Linechart";

const AdminManagerBankStats = () => {
  const { data: bankStats, isLoading: bankStatLoading } =
    useGetAdminStatsQuery(undefined);
  const { data: bankLastMonthStats, isLoading } =
    useGetAdminLastMonthStatsQuery(undefined, {
      skip: bankStatLoading,
    });
  const bankstats = bankStats?.data?.[0];
  const lastMonthBankStats = bankLastMonthStats?.data;
  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoading || bankStatLoading) {
    return <Loading />;
  }

  if (!bankstats || !lastMonthBankStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center p-6 bg-white rounded-xl">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            You are not currently assigned to any branch. Please contact your
            administrator.
          </p>
        </div>
      </div>
    );
  }

  // Calculate key metrics
  const totalAccounts =
    bankstats.accountTypes?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalBalance =
    bankstats.accountTypes?.reduce(
      (sum: number, item: any) => sum + (item.totalBalance || 0),
      0
    ) || 0;
  const totalTransactions =
    lastMonthBankStats.transactions?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalLoans =
    bankstats.loanInsights?.reduce(
      (sum: number, item: any) => sum + item.count,
      0
    ) || 0;
  const totalLoanAmount =
    bankstats.loanInsights?.reduce(
      (sum: number, item: any) => sum + (item.totalLoanAmount || 0),
      0
    ) || 0;

  // Format currency in Taka
  const formatTaka = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD")}`;
  };

  return (
    <div className="overflow-hidden max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-4 pt-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-3">
              Banking Operations Dashboard
            </h1>
          </motion.div>

          {/* Metric Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <MetricCard
              title="Total Customer Accounts"
              value={totalAccounts.toLocaleString("en-BD")}
              subtitle="Active banking relationships"
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              gradient="from-blue-500 to-blue-600"
              growth={12.5}
              trend="up"
            />
            <MetricCard
              title="Assets Under Management"
              value={formatTaka(totalBalance)}
              subtitle="Total customer deposits"
              icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
              gradient="from-emerald-500 to-emerald-600"
              growth={8.3}
              trend="up"
            />
            <MetricCard
              title="Transaction Volume"
              value={totalTransactions.toLocaleString("en-BD")}
              subtitle="Monthly processing activity"
              icon={<Activity className="w-5 h-5 sm:w-6 sm:h-6" />}
              gradient="from-orange-500 to-orange-600"
              growth={15.7}
              trend="up"
            />
            <MetricCard
              title="Active Loan Portfolio"
              value={totalLoans.toLocaleString("en-BD")}
              subtitle={`${formatTaka(totalLoanAmount)} outstanding`}
              icon={<CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />}
              gradient="from-purple-500 to-purple-600"
              growth={2.1}
              trend="down"
            />
          </motion.div>

          {/* Charts Grid - Row 1 */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
            {/* Account Types - Enhanced Doughnut Chart */}
            {bankstats.accountTypes && (
              <motion.div variants={itemVariants} className="w-full lg:w-1/2">
                <DoughnutChart
                  data={bankstats.accountTypes}
                  title="Distribution by account categories"
                  subtitle=""
                  icon={<></>}
                />
              </motion.div>
            )}

            <div className="w-full lg:w-1/2">
              <BarChart
                data={lastMonthBankStats?.transactions}
                title="Transaction Summary"
              />
            </div>
          </div>

          {/* Daily Trends - Enhanced Line Chart */}
          {lastMonthBankStats.dailyTrends && (
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <div className="w-full">
                <LineChart
                  data={lastMonthBankStats?.dailyTrends}
                  title="Transaction Summary"
                />
              </div>
            </motion.div>
          )}

          {/* Loan Analysis */}
          {bankstats.loanInsights && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <motion.div variants={itemVariants}>
                <DoughnutChart
                  data={bankstats.loanInsights}
                  title="Loan Portfolio Distribution"
                  subtitle=""
                  icon={<></>}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="w-full">
                  <BarChart
                    data={bankstats?.loanInsights}
                    title="Transaction Summary"
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* User Growth */}
          {bankstats.userGrowth && bankstats.userGrowth.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="bg-white/90 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                      Customer Acquisition Trends
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                      Monthly new customer onboarding and growth metrics
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg text-white">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {bankstats.userGrowth
                    .slice(-6)
                    .map((item: any, index: number) => (
                      <div
                        key={index}
                        className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 transition-all duration-300"
                      >
                        <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                          {new Date(
                            item._id.year,
                            item._id.month - 1
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            year: "2-digit",
                          })}
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                          +{item.newUsers.toLocaleString("en-BD")}
                        </p>
                        <p className="text-xs text-slate-500">new customers</p>
                      </div>
                    ))}
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {bankstats.userGrowth
                        .reduce(
                          (sum: number, item: any) => sum + item.newUsers,
                          0
                        )
                        .toLocaleString("en-BD")}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      Total New Customers
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      {Math.round(
                        bankstats.userGrowth.reduce(
                          (sum: number, item: any) => sum + item.newUsers,
                          0
                        ) / bankstats.userGrowth.length
                      ).toLocaleString("en-BD")}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      Monthly Average
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {Math.max(
                        ...bankstats.userGrowth.map(
                          (item: any) => item.newUsers
                        )
                      ).toLocaleString("en-BD")}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600">
                      Peak Month
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Branch Performance */}
          {bankstats.branchDetails && (
            <motion.div variants={itemVariants}>
              <div className="bg-white/90 rounded-xl p-4 sm:p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                      Branch Performance Analytics
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                      Comprehensive branch-wise operational metrics and
                      liquidity management
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="mb-6">
                  <BarChart
                    data={bankstats.branchDetails}
                    title="Branch Account Distribution & Asset Management"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {bankstats.branchDetails.map((branch: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 sm:p-6 border border-gray-200 transition-all duration-300"
                    >
                      <h4 className="font-bold text-slate-800 mb-3 text-base sm:text-lg flex items-center">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                        {branch._id[0]}
                      </h4>
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-md">
                          <span className="text-slate-600 font-medium">
                            Customer Accounts
                          </span>
                          <span className="font-bold text-slate-800 text-sm sm:text-base">
                            {branch.count.toLocaleString("en-BD")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-md">
                          <span className="text-slate-600 font-medium">
                            Reserved Capital
                          </span>
                          <span className="font-bold text-blue-700 text-sm sm:text-base">
                            {formatTaka(branch.reserevedBalance)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-md">
                          <span className="text-slate-600 font-medium">
                            Deployed Capital
                          </span>
                          <span className="font-bold text-green-700 text-sm sm:text-base">
                            {formatTaka(branch.usedBalance)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md">
                          <span className="text-slate-600 font-medium">
                            Liquidity Ratio
                          </span>
                          <span
                            className={`font-bold text-sm sm:text-base ${
                              branch.liquidityRatio > 80
                                ? "text-red-600"
                                : branch.liquidityRatio > 60
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {branch.liquidityRatio?.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-3 p-2 sm:p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md">
                          <div className="text-xs text-slate-500 mb-1">
                            Total Assets Under Management
                          </div>
                          <div className="font-bold text-indigo-700 text-sm sm:text-base">
                            {formatTaka(
                              branch.reserevedBalance + branch.usedBalance
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminManagerBankStats;
