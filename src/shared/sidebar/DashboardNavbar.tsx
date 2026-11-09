/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  CreditCard,
  Building2,
  DollarSign,
  LogOut,
  Menu,
  Home,
} from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import { JwtPayload, SidebarRoutes } from "@/types/common.type";
import Loading from "../loading/Loading";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { adminRoutes, customerRoutes, managerRoutes } from "@/utils/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !userData,
  });
  const user = myAccount?.data;

  const userRole: SidebarRoutes = (() => {
    switch (userData?.role) {
      case "admin":
        return adminRoutes;
      case "customer":
        return customerRoutes;
      case "manager":
        return managerRoutes;
      default:
        return [];
    }
  })();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "suspended":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-14 sticky top-0 w-full z-50 bg-gray-200/80 border-b border-gray-200/50 shadow-sm"
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side - Welcome message */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-2 md:space-x-3"
        >
          <div className="hidden lg:block">
            Welcome <span className="text-blue-600">{userData?.name}</span>
          </div>

          {/* Mobile dropdown (shown on small screens) */}
          <div className="block lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 cursor-pointer rounded-md hover:bg-gray-100 transition">
                  <Menu className="text-2xl text-[#104042]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start" className="w-60">
                {/* Welcome Message */}
                <DropdownMenuItem
                  disabled
                  className="opacity-100 font-semibold text-gray-700"
                >
                  👋 Welcome, {userData?.name || "User"}
                </DropdownMenuItem>

                {/* Divider Label */}
                <div className="px-3 py-1 text-xs text-gray-400 font-medium border-b border-gray-100">
                  Dashboard Links
                </div>

                {/* Dynamic Links */}
                <div className="py-1 space-y-1">
                  {userRole.map((route) => (
                    <DropdownMenuItem asChild key={route.href}>
                      <Link
                        href={route.href}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full
            ${
              pathname === route.href
                ? "bg-[#f1f5f9] text-[#104042] font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
                      >
                        {route.icon && <route.icon />}
                        {route.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>

                {/* Home Link */}
                <div className="border-t pt-2 mt-1">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full
          ${
            pathname === "/"
              ? "bg-[#f1f5f9] text-[#104042] font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
                    >
                      <Home />
                      Home
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Right side - notifications + user dropdown */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <NotificationBell
            href={
              userData?.role === "manager"
                ? "/portal/notifications"
                : "/dashboard/admin/notifications"
            }
          />
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 md:space-x-3 hover:bg-white/50 transition-colors duration-200 p-1 md:p-2"
              >
                <div className="relative">
                  {userData && userData?.profilePhotoUrl && (
                    <Avatar className="w-7 h-7 sm:w-9 sm:h-9 border border-[#AEFF1C]">
                      <AvatarImage
                        src={userData.profilePhotoUrl || "/placeholder.svg"}
                        alt={userData.name || "User"}
                      />
                      <AvatarFallback className="bg-[#AEFF1C] text-[#104042] font-semibold">
                        {userData.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 ${getStatusColor(
                      user?.status
                    )} rounded-full border-2 border-white`}
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs md:text-sm font-medium text-gray-900">
                    {user?.accountHolderName}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[120px] md:max-w-none">
                    {userData?.email}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
                </motion.div>
              </Button>
            </DropdownMenuTrigger>

            <AnimatePresence>
              {isOpen && (
                <DropdownMenuContent
                  align="end"
                  className="w-64 md:w-80 p-0 overflow-hidden"
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="bg-white rounded-lg shadow-lg border">
                      {/* User Info Header */}
                      <div className="p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="relative">
                            {userData && userData?.profilePhotoUrl && (
                              <Image
                                src={userData?.profilePhotoUrl as string}
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-blue-500/20"
                                priority
                              />
                            )}
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 ${getStatusColor(
                                user?.status
                              )} rounded-full border-2 border-white`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm md:text-base text-gray-900">
                              {userData?.name}
                            </div>
                            <div className="text-xs md:text-sm text-gray-600 truncate">
                              {userData?.email}
                            </div>
                            <div className="flex items-center space-x-1 md:space-x-2 mt-1">
                              <Badge
                                variant="secondary"
                                className="text-[10px] md:text-xs"
                              >
                                {userData?.role}
                              </Badge>
                              <Badge
                                variant={
                                  user?.status === "active"
                                    ? "default"
                                    : user?.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                                }
                                className="text-[10px] md:text-xs"
                              >
                                {user?.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Details */}
                      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Account
                            </span>
                          </div>
                          <span className="text-sm font-mono text-gray-900">
                            {user?.accountNumber}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Branch
                            </span>
                          </div>
                          <span className="text-sm text-gray-900">
                            {user?.branch?.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              Balance
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            {user?.balance} {user?.currency}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Type</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {user?.accountType}
                          </Badge>
                        </div>
                      </div>

                      <DropdownMenuSeparator />

                      {/* Action Items */}
                      <div className="p-1 md:p-2">
                        <button
                          onClick={handleSignOut}
                          className="cursor-pointer w-full"
                        >
                          <DropdownMenuItem className="flex items-center space-x-2 text-red-600 focus:text-red-600 cursor-pointer text-xs md:text-sm">
                            <LogOut className="h-3 w-3 md:h-4 md:w-4" />
                            Sign Out
                          </DropdownMenuItem>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </DropdownMenuContent>
              )}
            </AnimatePresence>
          </DropdownMenu>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardNavbar;
