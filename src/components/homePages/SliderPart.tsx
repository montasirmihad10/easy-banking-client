"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

const brands = [
  "Netflix",
  "Google",
  "Amazon",
  "Facebook",
  "YouTube",
  "Airbnb",
  "Spotify",
  "Uber",
];

export default function Component() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for easeOut
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="pt-32 pb-16 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="space-y-12" variants={textVariants}>
          {/* First Row - Moving Left */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-20 whitespace-nowrap"
              animate={{
                x: [0, -50 * brands.length * 4],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 40, // Slower speed
                  ease: "linear",
                },
              }}
            >
              {Array.from({ length: 4 }).map((_, groupIndex) =>
                brands.map((brand, brandIndex) => (
                  <motion.span
                    key={`left-${groupIndex}-${brandIndex}`}
                    className="text-2xl md:text-3xl font-semibold text-gray-500 hover:text-gray-900 transition-colors duration-300 cursor-default select-none"
                    whileHover={{ scale: 1.02 }}
                  >
                    {brand}
                  </motion.span>
                ))
              )}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-20 whitespace-nowrap"
              animate={{
                x: [-50 * brands.length * 4, 0],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 45, // Slower speed
                  ease: "linear",
                },
              }}
            >
              {Array.from({ length: 4 }).map((_, groupIndex) =>
                brands.map((brand, brandIndex) => (
                  <motion.span
                    key={`right-${groupIndex}-${brandIndex}`}
                    className="text-2xl md:text-3xl font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-default select-none"
                    whileHover={{ scale: 1.02 }}
                  >
                    {brand}
                  </motion.span>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Gradient overlays for fade effect */}
        {/* <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" /> */}
      </div>
    </motion.div>
  );
}
