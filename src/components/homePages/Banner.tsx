/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Star, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "./BackgroundBeans";
import { getFromLocalStorage } from "@/utils/local-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import Link from "next/link";
import { getAppHomePath, getMyAccountPath } from "@/utils/rolePaths";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const Banner = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { website } = useWebsiteContent();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const userData = getUser() as JwtPayload;
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleStartJourney = () => {
    const accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) {
      setIsOpen(true);
    } else if (user?.role === "customer") {
      router.push(getAppHomePath("customer"));
    } else {
      router.push(getMyAccountPath(user?.role));
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden pt-4 md:pt-16">
        {/* Background elements */}
        <BackgroundBeams />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#104042]/8 via-[#104042]/4 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#104042]/10 via-[#104042]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#104042]/5 rounded-full blur-xl" />

          <div className="absolute bottom-20 w-[500px] h-[300px] bg-[#104042]/40 blur-[100px] rounded-full" />

          <div className="w-[500px] h-[300px] bg-[#104042] opacity-40 blur-[100px] absolute top-0 md:right-0"></div>
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #104042 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-16 relative">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content - Made slightly wider */}
            <div className="space-y-6 lg:pr-8">
              <motion.div variants={itemVariants} className="space-y-8">
                <motion.div
                  className="inline-flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="w-2 h-2 bg-[#104042] rounded-full animate-pulse"></div>
                  <span className="bg-white/40 backdrop-blur-md border border-white/30 text-[#104042] px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide shadow-lg">
                    {website.heroEyebrow}
                  </span>
                </motion.div>
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[0.9]"
                  variants={itemVariants}
                >
                  <span className="bg-gradient-to-r from-[#104042] via-[#0d3335] to-[#104042] bg-clip-text text-transparent">
                    {website.heroTitleLine1}
                  </span>
                  <br />
                  <span className="text-slate-900">{website.heroTitleLine2}</span>
                  <span className="text-[#104042] text-4xl sm:text-6xl">.</span>
                </motion.h1>
                <motion.p
                  className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium"
                  variants={itemVariants}
                >
                  {website.heroSubtitle}
                </motion.p>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
              >
                <Button
                  onClick={handleStartJourney}
                  size="lg"
                  className="bg-gradient-to-r from-[#104042] to-[#0d3335] hover:from-[#0d3335] hover:to-[#104042] text-white px-6 sm:px-10 py-4 sm:py-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold shadow-2xl hover:shadow-[#104042]/25 transition-all duration-300 cursor-pointer"
                >
                  {website.heroPrimaryCta}
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Link href="/features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/40 text-[#104042] hover:bg-white/20 hover:border-white/60 px-6 sm:px-10 py-3 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 bg-white/20 backdrop-blur-md shadow-lg cursor-pointer"
                  >
                    {website.heroSecondaryCta}
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/30"
              >
                {website.heroStats.map((stat, index) => {
                  const icons = [Shield, Users, Star];
                  const Icon = icons[index % icons.length];
                  return (
                  <div
                    key={index}
                    className="text-center group cursor-pointer p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#104042] mr-1 sm:mr-2" />
                      <div className="text-xl sm:text-3xl font-bold text-[#104042]">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Content - Card Stack - Improved centering and sizing */}
            <div className="relative flex justify-center items-center mt-60 mb-32 md:mb-48 lg:mb-0 lg:mt-0">
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-md sm:max-w-lg mx-auto lg:mx-0"
              >
                <div className="relative flex items-center justify-center ">
                  {/* Card Stack */}
                  {/* Primary Card - #104042 */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: -30, z: -100 }}
                    animate={{ opacity: 1, rotateY: -15, z: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute z-50 w-[250px] sm:w-[400px] h-56 sm:h-72 bg-gradient-to-br from-[#104042] to-[#0d3335] rounded-xl sm:rounded-2xl shadow-2xl transform md:-rotate-60 -translate-x-10 sm:-translate-x-14 -translate-y-2 overflow-hidden border border-white/20"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Background Geometric Shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute top-6 right-6 w-8 h-8 bg-white/10 rounded-full"></div>
                      <div className="absolute bottom-12 left-4 w-12 h-12 bg-white/5 transform rotate-45"></div>
                      <div className="absolute bottom-4 left-8 w-6 h-6 border border-white/15 transform rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-12"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h1 className="text-lg sm:text-xl font-bold tracking-wide">
                            EasyBank
                          </h1>
                          <p className="text-xs opacity-90 mt-1 font-medium">
                            Bank Card
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm sm:text-base font-semibold">
                            VISA
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 6l3.6 6L3 18h2.4l3.6-6L5.4 6H3zm7 0v12h2V6h-2zm4 0l3.6 6L14 18h2.4l3.6-6-3.6-6H14z"></path>
                            </svg>
                            <span className="text-xs font-medium">
                              Contactless
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chip and Dots */}
                      <div className="flex items-center gap-3 my-2">
                        <div className="w-8 h-5 sm:w-10 sm:h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-800"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 6h12v12H6z" />
                          </svg>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="flex gap-1"
                        >
                          <div className="w-2 h-1 sm:w-3 sm:h-2 bg-white/80 rounded-full"></div>
                          <div className="w-2 h-1 sm:w-3 sm:h-2 bg-white/60 rounded-full"></div>
                          <div className="w-2 h-1 sm:w-3 sm:h-2 bg-white/40 rounded-full"></div>
                        </motion.div>
                      </div>

                      {/* Card Number */}
                      <div className="my-2 sm:my-3">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                          className="text-base sm:text-xl font-mono tracking-widest font-bold"
                        >
                          4532 •••• •••• 7890
                        </motion.p>
                      </div>

                      {/* Footer Info */}
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs opacity-75 uppercase tracking-wide font-medium">
                            Cardholder Name
                          </p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="font-bold text-sm sm:text-base tracking-wide"
                          >
                            JOHN SMITH
                          </motion.p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs opacity-75 uppercase tracking-wide font-medium">
                            Expires
                          </p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.8 }}
                            className="font-bold text-sm sm:text-base font-mono"
                          >
                            12/28
                          </motion.p>
                        </div>
                      </div>
                      {/* Shine Effect */}
                      <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "100%", opacity: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                      />
                    </div>
                  </motion.div>

                  {/* Yellow Card */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: 30, z: -50 }}
                    animate={{ opacity: 1, rotateY: 0, z: 10 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute z-30 w-[250px] sm:w-[400px] h-56 sm:h-72 rounded-xl sm:rounded-2xl shadow-2xl transform md:-rotate-45 translate-x-2 sm:translate-x-4 mb-4 translate-y-16 md:translate-y-0 sm:mb-5.5 bg-amber-500 overflow-hidden"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute bottom-12 left-4 w-12 h-12 bg-white/10 transform rotate-45"></div>
                      <div className="absolute bottom-4 left-8 w-6 h-6 border border-white/15 transform rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-12"></div>
                    </div>

                    <div className="p-4 sm:p-6 h-full flex flex-col justify-between text-black font-semibold relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="text-xs sm:text-sm font-semibold opacity-80">
                          GOLD
                        </div>
                        <div className="text-base sm:text-lg font-bold">
                          VISA
                        </div>
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-mono tracking-wider mb-1 sm:mb-2">
                          •••• •••• •••• 1234
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm opacity-80">
                          <span>JOHN SMITH</span>
                          <span>09/27</span>
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "100%", opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                    />
                  </motion.div>

                  {/* Purple Card */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: 45, z: -150 }}
                    animate={{ opacity: 1, rotateY: 15, z: -20 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="absolute w-[250px] sm:w-[400px] h-56 sm:h-72 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl shadow-2xl transform md:-rotate-30 translate-x-12 sm:translate-x-20 -translate-y-16 sm:translate-y-4 mb-2 sm:mb-3 overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
                      <div className="absolute bottom-12 left-4 w-12 h-12 bg-white/10 transform rotate-45"></div>
                      <div className="absolute bottom-4 left-8 w-6 h-6 border border-white/15 transform rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-12"></div>
                    </div>

                    <div className="p-4 sm:p-6 h-full flex flex-col justify-between text-white relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="text-xs sm:text-sm font-semibold opacity-80">
                          PREMIUM
                        </div>
                        <div className="text-base sm:text-lg font-bold">
                          VISA
                        </div>
                      </div>
                      <div>
                        <div className="text-base sm:text-lg font-mono tracking-wider mb-1 sm:mb-2">
                          •••• •••• •••• 5678
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm opacity-80">
                          <span>JOHN SMITH</span>
                          <span>03/29</span>
                        </div>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "100%", opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                    />
                  </motion.div>

                  {/* Shadow UNDER Cards */}
                </div>
                  <div className="absolute bottom-0 mt-4 w-72 sm:w-[400px] h-8 bg-black/10 rounded-full blur-2xl z-0" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You&apos;re not logged in</AlertDialogTitle>
            <AlertDialogDescription>
              Please login first to start your journey with us.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Close
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-[#104042]"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Banner;
