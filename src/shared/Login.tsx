"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { Key, Mail, Shield, Banknote, TrendingUp, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/redux/api/authApi";
import type { TGlobalResponse } from "@/types/global.type";
import { setToLocalStorage } from "@/utils/local-storage";
import EBInput from "./form/EBInput";
import EBForm from "./form/EBForm";
import { Button } from "@/components/ui/button";
import AuthLoading from "./loader/AuthLoading";
import { saveCookie } from "@/utils/saveCookie/saveCookie";
import { decodeToken } from "@/utils/decodeToken";
import { getPostLoginPath } from "@/utils/rolePaths";
import { JwtPayload } from "@/types/common.type";
import { getFcmToken } from "@/hooks/useFcmToken";

const Login = () => {
  const router = useRouter();
  const [session, setSession] = useState("");
  const searchParams = useSearchParams();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const sessionStatus = searchParams?.get("session");
    if (sessionStatus === "expired") {
      setSession(sessionStatus);
    }
  }, [searchParams]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const fcmToken = await getFcmToken();
      const userData = {
        email: data.email,
        password: data.password,
        ...(fcmToken ? { fcmToken } : {}),
      };
      const res = (await loginUser(userData)) as TGlobalResponse;

      if (res?.data?.data?.accessToken) {
        const accessToken = res.data.data.accessToken;
        setToLocalStorage("accessToken", accessToken);
        await saveCookie(accessToken, res?.data?.data?.refreshToken);
        toast.success("Login Successfull", { duration: 3000 });
        const decoded = decodeToken(accessToken) as JwtPayload;
        router.push(getPostLoginPath(decoded?.role));
      } else {
        toast.error(
          res?.error?.data?.message === "The user is not found"
            ? "Invalid details or Something went wrong"
            : res?.error?.data?.message,
          { duration: 4000 }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Login Failed", { duration: 3000 });
    }
  };

  // Simplified animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Left Panel - Login Form */}
        <motion.div
          className="w-full lg:w-1/2 p-6 sm:p-8"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <div className="w-16 h-16 bg-[#104042] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#104042] dark:text-white">
              Sign in to your account
            </h1>
          </motion.div>

          {session === "expired" && (
            <motion.p
              className="text-red-500 font-medium py-3 text-center"
              variants={itemVariants}
            >
              Your session has expired. Please log in again!
            </motion.p>
          )}

          <motion.div variants={itemVariants}>
            <EBForm onSubmit={onSubmit}>
              <motion.div variants={itemVariants}>
                <EBInput
                  label="Email"
                  name="email"
                  type="email"
                  icon={<Mail />}
                  placeholder="Enter your email"
                  className="mb-3"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <EBInput
                  label="Password"
                  name="password"
                  type="password"
                  icon={<Key />}
                  placeholder="Enter your valid password ..."
                />
              </motion.div>
              <motion.div className="pt-4" variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full py-3 bg-[#104042] hover:bg-[#0d353a] text-white font-medium rounded-lg cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? <AuthLoading /> : "Login"}
                </Button>
              </motion.div>
            </EBForm>

            <motion.div variants={itemVariants} className="mt-3">
              <Link
                href="/forget-password"
                className="text-[#104042] font-bold underline underline-offset-2"
              >
                Forgot your password?
              </Link>
            </motion.div>
            <div className="border border-black my-2 w-16 mx-auto"></div>
            <div className="text-[#821f18]">
              <p>Admin email: admin@gmail.com</p>
              <p>Password: 123456</p>
            </div>
            <motion.div variants={itemVariants}>
              <p className="text-black/80 flex gap-3 md:hidden">
                Don&apos;t have an account yet?
                <Link href="/signup" className="text-[#104042] font-bold">
                  Sign Up...
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Panel - Welcome Section */}
        <motion.div
          className="w-full lg:w-1/2 bg-[#104042] p-6 sm:p-8 md:flex flex-col justify-center items-center text-center hidden"
          variants={containerVariants}
        >
          <motion.div className="mb-6" variants={itemVariants}>
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Banknote className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Welcome to Easy Bank
          </motion.h1>

          <motion.div className="text-white/90 mb-6" variants={itemVariants}>
            <p className="text-lg font-medium mb-4">
              Your Trusted Financial Partner
            </p>
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs text-white/80">Secure</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs text-white/80">Growth</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                  <Banknote className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xs text-white/80">Banking</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-white/80 font-medium mb-4">
              Don&apos;t have an account yet?
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-2 border-2 border-white/80 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white hover:text-[#104042]"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
