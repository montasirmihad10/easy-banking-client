"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const ContactMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // Equivalent to easeOut
      },
    },
  };

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const mapVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  const locationVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 lg:pb-20 pt-24"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left - Heading */}
          <motion.div variants={headerVariants}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              The Home branch Of us for{" "}
              <span className="text-gray-700 italic font-serif">
                Banking & Financial Solutions
              </span>
            </h1>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            className="flex items-center"
            variants={descriptionVariants}
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              The Narayanganj branch serves as the head office of Easy Bank,
              where our core operations are managed with precision and care. As
              the foundation of our trusted banking network, it reflects our
              commitment to reliability, security, and customer-focused
              financial solutions. From strategic planning to customer support,
              everything begins here — the heart of Easy Bank.
            </p>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div className="w-full" variants={mapVariants}>
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-96 lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.2529897654613!2d90.51630467418508!3d23.666909078727453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b153290c6253%3A0x2558a8d5888f6a72!2sS.O%20Rd%2C%20Narayanganj!5e0!3m2!1sen!2sbd!4v1751644846356!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Info Below Map */}
        <motion.div className="mt-12 text-center" variants={locationVariants}>
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <motion.svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </motion.svg>
            <span className="text-lg font-medium">
              S.O Road, Narayanganj, Dhaka, Bangladesh
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactMap;
