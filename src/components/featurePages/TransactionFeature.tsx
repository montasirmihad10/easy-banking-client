"use client";

import { motion, type Variants } from "framer-motion";
import {
  Percent,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { services as fallbackServices } from "@/lib/const";

const serviceIcons: Record<string, React.ReactNode> = {
  deposit: <ArrowDownLeft className="w-6 h-6" />,
  withdraw: <ArrowUpRight className="w-6 h-6" />,
  transfer: <CreditCard className="w-6 h-6" />,
  loan: <Banknote className="w-6 h-6" />,
};

const TransactionFeature = () => {
  const { website, rates } = useWebsiteContent();
  const services =
    website.services?.length > 0
      ? website.services.map((service) => ({
          ...service,
          icon: serviceIcons[service.id] || <CreditCard className="w-6 h-6" />,
          highlight:
            service.id === "deposit"
              ? `${(rates.savingsAnnualInterestRate * 100).toFixed(2)}% Annual Interest`
              : service.id === "loan"
                ? `${(rates.defaultLoanInterestRate * 100).toFixed(2)}% Loan Interest`
                : service.highlight,
        }))
      : fallbackServices;

  // Main container animation
  const mainContainerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  // Left content animation
  const leftContentVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Right content animation
  const rightContentVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  // Individual service card animation
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Text elements animation
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // List item animation
  const listItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="py-16 px-4"
      variants={mainContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
        margin: "-100px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left Static Content */}
          <motion.div
            className="lg:w-2/5 flex flex-col justify-center"
            variants={leftContentVariants}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.div variants={textVariants}>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Financial
                    <span className="block" style={{ color: "#104042" }}>
                      Services
                    </span>
                  </h2>
                </motion.div>

                <motion.p
                  className="text-lg text-gray-600 leading-relaxed max-w-md"
                  variants={textVariants}
                >
                  Discover our comprehensive range of financial services
                  designed to help you manage, grow, and access your money with
                  ease and security.
                </motion.p>
              </div>

              <motion.div variants={textVariants}>
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: "#104042" }}
                >
                  <Percent className="w-5 h-5 mr-2" />
                  View All Services
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Scrollable Content */}
          <motion.div className="lg:w-3/5" variants={rightContentVariants}>
            <div className="h-[600px] overflow-y-auto hide-scrollbar space-y-6">
              <div className="space-y-5">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                  >
                    <Card className="border-2 border-gray-200 hover:border-opacity-60 transition-all duration-300 shadow-md hover:shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className="p-3 rounded-full text-white"
                              style={{ backgroundColor: "#104042" }}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 200,
                              }}
                              viewport={{ once: true }}
                            >
                              {service.icon}
                            </motion.div>
                            <div>
                              <CardTitle className="text-xl font-bold text-gray-900">
                                {service.title}
                              </CardTitle>
                              <CardDescription className="text-gray-600 mt-1">
                                {service.description}
                              </CardDescription>
                            </div>
                          </div>
                          <motion.div
                            className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: "#104042" }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + 0.2,
                              type: "spring",
                            }}
                            viewport={{ once: true }}
                          >
                            {service.highlight}
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {service.details.map((detail, detailIndex) => (
                            <motion.li
                              key={detailIndex}
                              className="flex items-start space-x-3 text-gray-700"
                              variants={listItemVariants}
                              initial="hidden"
                              whileInView="visible"
                              transition={{
                                delay: index * 0.1 + detailIndex * 0.05,
                              }}
                              viewport={{ once: true, amount: 0.8 }}
                            >
                              <motion.div
                                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: "#104042" }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.1 + detailIndex * 0.05 + 0.1,
                                }}
                                viewport={{ once: true }}
                              />
                              <span className="text-sm leading-relaxed">
                                {detail}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionFeature;
