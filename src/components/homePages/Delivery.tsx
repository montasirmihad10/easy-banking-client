"use client";
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { motion, cubicBezier, Variants } from "framer-motion";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: cubicBezier(0.6, 0.05, -0.01, 0.9), // ✅ Correct usage
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

const Delivery = () => {
  const { website } = useWebsiteContent();
  return (
    <div className="relative py-20 px-6 sm:px-10  overflow-hidden ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="space-y-6 relative z-10 "
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#104042] leading-tight">
            {website.deliveryTitle}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {website.deliveryBody}
          </p>
          <ul className="space-y-2 text-[#104042] font-medium">
            <li>✓ Transparent & Secure Services</li>
            <li>✓ Instant Account Access</li>
            <li>✓ Personalized Financial Tools</li>
            <li>✓ 24/7 Customer Support</li>
          </ul>
        </motion.div>

        {/* Right Side - Image Block */}
        <div className="relative w-full h-[450px]">
          {/* First Image - Positioned absolutely */}
          <motion.div
            custom={0}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="absolute top-0 left-0 w-[60%] h-[60%] rounded-xl overflow-hidden shadow-lg z-20"
          >
            <Image
              src={
                website.deliveryImage1 ||
                "https://i.ibb.co/LhqM1B27/04-m3-online-banking-services-1184x621.jpg"
              }
              alt="Banking Service"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>

          {/* Second Image - Positioned absolutely */}
          <motion.div
            custom={1}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="absolute bottom-0 right-0 w-[70%] h-[60%] rounded-xl overflow-hidden shadow-lg z-10"
          >
            <Image
              src={
                website.deliveryImage2 ||
                "https://i.ibb.co/BVD2JJ33/istockphoto-536459069-612x612.jpg"
              }
              alt="Customer Service"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>

          {/* Decorative background element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#104042]/10 z-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
