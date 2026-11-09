/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { website } = useWebsiteContent();
  const faqData = website.faqs.map((item) => ({
    ...item,
    icon: <HelpCircle className="w-4 h-4" />,
  }));

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const illustrationVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <div className="py-12 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-5 w-20 h-20 rounded-full opacity-8"
          style={{ backgroundColor: "#104042" }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-5 w-16 h-16 rounded-full opacity-8"
          style={{ backgroundColor: "#104042" }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Illustration Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 opacity-5"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#104042"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <circle cx="50" cy="50" r="8" fill="#104042" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 opacity-5"
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
            <path
              d="M20 50 L50 20 L80 50 L50 80 Z"
              stroke="#104042"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-10" variants={headerVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-lg"
            style={{ backgroundColor: "#104042" }}
            variants={illustrationVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <HelpCircle className="w-7 h-7 text-white" />
          </motion.div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Frequently Asked
            <span style={{ color: "#104042", marginLeft: '5px' }}>
              Questions
            </span>
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get instant answers to common questions about our financial
            services. Can't find what you're looking for? Our support team is
            here to help 24/7.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden cursor-pointer">
                <CardContent className="p-0  cursor-pointer">
                  <motion.button
                    className="w-full p-4 text-left focus:outline-none cursor-pointer"
                    onClick={() => toggleItem(index)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="p-2 rounded-full text-white flex-shrink-0"
                          style={{ backgroundColor: "#104042" }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {faq.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            {faq.category}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <motion.div
                        animate={{
                          rotate: openItems.includes(index) ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-3"
                      >
                        {openItems.includes(index) ? (
                          <Minus
                            className="w-4 h-4"
                            style={{ color: "#104042" }}
                          />
                        ) : (
                          <Plus
                            className="w-4 h-4"
                            style={{ color: "#104042" }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openItems.includes(index) ? "auto" : 0,
                      opacity: openItems.includes(index) ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-9"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
            {/* Background illustration for CTA */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
                <path
                  d="M0 50 Q50 0 100 50 T200 50"
                  stroke="#104042"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M0 60 Q50 10 100 60 T200 60"
                  stroke="#104042"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our friendly support team is ready to help you with any
                questions about our financial services.
              </p>
              <motion.button
                className="px-6 py-3 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: "#104042" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQ;
