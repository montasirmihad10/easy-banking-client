"use client";
import { motion, Variants } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Target,
} from "lucide-react";
import MetricCard from "../charts/MetricCard";
import DoughnutChart from "../charts/DoughnartChart";
import BarChart from "../charts/Barchart";
import LineChart from "../charts/Linechart";
import { Progress } from "../ui/progress";

interface AccountStatsProps {
  accountStat: {
    balanceDistribution: Array<{
      balance: number;
      count: number;
      accountType: string;
      percentage: number;
    }>;
    loanProgress: Array<{
      status: string;
      loanAmount: number;
      paid: number;
      remaining: number;
      repaymentScheduleLength: number;
      paidCount: number;
      nextPaymentDate: string;
    }>;
    monthlySpending: Array<{
      _id: number;
      transactions: Array<{
        type: string;
        amount: number;
      }>;
      totalAmount: number;
      month: number;
      deposits: number;
      withdrawals: number;
      transfers: number;
      loans: number;
      loanRepayments: number;
      interests: number;
    }>;
    recentTransactions: Array<{
      type: string;
      amount: number;
      date: string;
      description: string;
      status: string;
    }>;
    transactionFrequency: Array<{
      _id: {
        date: string;
      };
      count: number;
    }>;
  };
}

const AccountStats = ({ accountStat }: AccountStatsProps) => {
  const {
    balanceDistribution = [],
    loanProgress = [],
    monthlySpending = [],
    recentTransactions = [],
    transactionFrequency = [],
  } = accountStat;
  // console.log(loanProgress);
  // Calculate key metrics
  const totalBalance = balanceDistribution.reduce(
    (sum, item) => sum + item.balance,
    0
  );
  const totalAccounts = balanceDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalLoanAmount = loanProgress.reduce(
    (sum, loan) => sum + loan.loanAmount,
    0
  );
  const totalLoanRemaining = loanProgress.reduce(
    (sum, loan) => sum + loan.remaining,
    0
  );
  const currentMonthSpending =
    monthlySpending[monthlySpending.length - 1]?.totalAmount || 0;
  const previousMonthSpending =
    monthlySpending[monthlySpending.length - 2]?.totalAmount || 0;
  const spendingGrowth =
    previousMonthSpending > 0
      ? ((currentMonthSpending - previousMonthSpending) /
          previousMonthSpending) *
        100
      : 0;

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

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMonthName = (monthNumber: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1] || "Unknown";
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
      case "deposit-loan":
        return <ArrowDownRight className="w-4 h-4 text-green-600" />;
      case "withdraw":
      case "transfer":
        return <ArrowUpRight className="w-4 h-4 text-red-600" />;
      case "loan":
        return <CreditCard className="w-4 h-4 text-blue-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  // Process data for charts
  const processedMonthlyData = monthlySpending.map((item) => ({
    _id: getMonthName(item.month),
    totalAmount: item.totalAmount,
    count: item.transactions.length,
  }));

  const processedTransactionFrequency = transactionFrequency.map((item) => ({
    _id: item._id.date,
    date: item._id.date,
    count: item.count,
  }));

  return (
    <div className="">
      <div className="px-4 sm:px-4 lg:px-6 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-4"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-2xl font-bold text-[#104042] mb-3">
              Account Statistics Dashboard
            </h1>
          </motion.div>

          {/* Key Metrics Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <MetricCard
              title="Total Balance"
              value={`৳${totalBalance}`}
              subtitle={`Across ${totalAccounts} accounts`}
              icon={<Wallet className="w-6 h-6" />}
              gradient="from-blue-500 to-blue-600"
            />
            <MetricCard
              title="Active Loans"
              value={`৳${totalLoanAmount}`}
              subtitle={`${formatCurrency(totalLoanRemaining)} remaining`}
              icon={<CreditCard className="w-6 h-6" />}
              gradient="from-purple-500 to-purple-600"
            />
            <MetricCard
              title="Monthly Spending"
              value={`৳${currentMonthSpending}`}
              subtitle="Current month total"
              icon={<TrendingUp className="w-6 h-6" />}
              gradient="from-green-500 to-green-600"
              growth={Math.abs(spendingGrowth)}
              trend={spendingGrowth >= 0 ? "up" : "down"}
            />
            <MetricCard
              title="Transaction Activity"
              value={transactionFrequency
                .reduce((sum, item) => sum + item.count, 0)
                .toString()}
              subtitle="Recent transactions"
              icon={<Activity className="w-6 h-6" />}
              gradient="from-orange-500 to-orange-600"
            />
          </motion.div>

          {/* Charts Grid - Row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Balance Distribution Doughnut Chart */}
            {balanceDistribution.length > 0 && (
              <motion.div variants={itemVariants} className="xl:col-span-1">
                <DoughnutChart
                  data={accountStat?.balanceDistribution}
                  title="Account Distribution"
                  subtitle="Distribution by account type"
                  icon={<PieChart className="w-6 h-6" />}
                />
              </motion.div>
            )}

            {/* Monthly Spending Bar Chart */}
            {monthlySpending.length > 0 && (
              <motion.div variants={itemVariants} className="xl:col-span-2">
                <div className="h-full">
                  <BarChart
                    data={processedMonthlyData}
                    title="Monthly Spending Trends"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Charts Grid - Row 2 */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Transaction Frequency Line Chart */}
            {transactionFrequency.length > 0 && (
              <motion.div variants={itemVariants}>
                <LineChart
                  data={processedTransactionFrequency}
                  title="Transaction Frequency"
                />
              </motion.div>
            )}

            {/* Loan Progress */}
            {loanProgress.length > 0 ? (
              <motion.div variants={itemVariants}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        Loan Progress
                      </h3>
                      <p className="text-slate-600 mt-1">
                        Current loan status and payments
                      </p>
                    </div>
                    <div className="text-blue-500">
                      <Target className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    {loanProgress.map((loan, index) => (
                      <div key={index} className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-600">
                            Loan Amount
                          </span>
                          <span className="text-2xl font-bold text-slate-800">
                            ৳-{loan.remaining}
                          </span>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full">
                          <Progress
                            value={
                              (loan.paidCount / loan.repaymentScheduleLength) *
                              100
                            }
                            className="h-4"
                          />
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 font-medium">
                            Paid: ৳{loan.paid}
                          </span>
                          <span className="text-red-600 font-medium">
                            Remaining: ৳-{loan.remaining}
                          </span>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-slate-600">
                              Next Payment Due
                            </span>
                            <span className="text-sm font-medium text-slate-800">
                              {formatDate(loan.nextPaymentDate)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">
                              Status
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {loan.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className="px-5 text-red-500">You do not have any loan now</p>
            )}
          </div>

          {/* Recent Transactions Table */}
          {recentTransactions.length > 0 && (
            <motion.div variants={itemVariants}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Recent Transactions
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Latest account activity and transactions
                    </p>
                  </div>
                  <div className="text-blue-500">
                    <Calendar className="w-7 h-7" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                          Type
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                          Description
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                          Amount
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                          Date
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-slate-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              {getTransactionIcon(transaction.type)}
                              <span className="capitalize text-sm font-medium">
                                {transaction.type.replace("-", " ")}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {transaction.description}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`font-semibold ${
                                transaction.type.includes("deposit") ||
                                transaction.type === "loan"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.type.includes("deposit") ||
                              transaction.type === "loan"
                                ? "+"
                                : "-"}
                              {formatCurrency(transaction.amount)}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AccountStats;
