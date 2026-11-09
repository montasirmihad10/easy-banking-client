/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, Variants } from "framer-motion";
import {
  PiggyBank,
  Wallet,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAccountTypesQuery } from "@/redux/api/multipleApi";

interface AccountType {
  _id: string;
  type: string;
  description: string;
  features: string[];
  updatedAt?: string;
}

const getAccountIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "savings":
      return PiggyBank;
    case "checking":
      return Wallet;
    case "business":
      return Briefcase;
    default:
      return Wallet;
  }
};

const getAccountColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "savings":
      return "#104042";
    case "checking":
      return "#0d3335";
    case "business":
      return "#0a2b2d";
    default:
      return "#104042";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 60, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const AccountTypes = () => {
  const { data: accountTypes, isLoading } = useGetAccountTypesQuery(undefined);
  const types = accountTypes?.data ?? [];

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-2 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Choose Your Perfect{" "}
            <span style={{ color: "#104042" }}>Banking Solution</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of account types designed to meet
            your unique financial needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {types.map((account: AccountType, index: number) => {
            const Icon = getAccountIcon(account.type);
            const color = getAccountColor(account.type);

            return (
              <motion.div
                key={account._id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full flex flex-col p-6 border-2 border-gray-100 hover:border-opacity-30 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className="p-3 rounded-full mr-4"
                        style={{ backgroundColor: `${color}15`, color: color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {account.type} Account
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {account.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ amount: 0.3 }}
                      className="space-y-3 mb-8"
                    >
                      {account.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          variants={featureVariants}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-start text-gray-700"
                        >
                          <CheckCircle
                            className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5"
                            style={{ color: color }}
                          />
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full text-white py-3 text-base font-semibold rounded-lg transition-all duration-300 group"
                        style={{ backgroundColor: color }}
                      >
                        Open {account.type} Account
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AccountTypes;
