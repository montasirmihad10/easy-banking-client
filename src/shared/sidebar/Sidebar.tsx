"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import type { JwtPayload, SidebarRoutes } from "@/types/common.type";
import { adminRoutes, customerRoutes, managerRoutes } from "@/utils/sidebar";
import { useEffect, useState } from "react";
import { User, ChevronRight, Shield, Crown } from "lucide-react";
import { AnimatedContainer } from "@/utils/sidebarMotions/animatedContainer";
import { SlideInText } from "@/utils/sidebarMotions/slideInText";
import { AnimatedItem } from "@/utils/sidebarMotions/animatedItem";
import { AnimatedNavItem } from "@/utils/sidebarMotions/animatedNavItem";
import { AnimatedIcon } from "@/utils/sidebarMotions/animatedIcons";
import Image from "next/image";

const EasyBankSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const userRole: SidebarRoutes = (() => {
    switch (user?.role) {
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

  const getRoleBadgeText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "manager":
        return "Manager";
      case "customer":
        return "Customer";
      default:
        return "User";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Crown;
      case "manager":
        return Shield;
      case "customer":
        return User;
      default:
        return User;
    }
  };

  return (
    <AnimatedContainer className="relative h-full">
      <div className="relative z-10 px-5 py-6 flex flex-col min-h-full">
        {/* Brand */}
        <SlideInText delay={0.2} className="mb-5">
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-200/80">
              <Image
                src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                width={72}
                height={72}
                alt="EasyBank"
                priority
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-[1.15rem] font-bold tracking-tight text-[#104042]">
                EasyBank
              </h2>
              <p className="text-[12px] text-gray-500 font-medium tracking-wide">
                Premium Banking
              </p>
            </div>
          </div>

          {/* User Badge */}
          {user && (
            <AnimatedItem delay={0.35}>
              <div className="p-2.5 bg-[#104042] rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shrink-0">
                    {(() => {
                      const RoleIcon = getRoleIcon(user.role);
                      return <RoleIcon className="w-5 h-5 text-[#104042]" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[13px] font-semibold truncate leading-tight">
                      {user.name || "User"}
                    </p>
                    <p className="text-white/70 text-[11px] font-medium mt-0.5">
                      {getRoleBadgeText(user.role)}
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white/20" />
                </div>
              </div>
            </AnimatedItem>
          )}
        </SlideInText>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          <SlideInText delay={0.5}>
            <div className="flex items-center justify-between gap-2 mb-3 px-0.5">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#104042] rounded-full" />
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.14em]">
                  Menu
                </p>
              </div>
              <Link
                href="/"
                className={cn(
                  "group relative overflow-hidden px-3 py-1.5 text-[11px] font-semibold rounded-xl border border-gray-200 bg-white text-gray-600",
                  "hover:text-white hover:border-[#104042] transition-colors duration-300",
                )}
              >
                <span className="absolute inset-0 bg-[#104042] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Home</span>
              </Link>
            </div>
          </SlideInText>

          <AnimatePresence>
            {userRole.map((route) => {
              const isActive =
                pathname === route.href ||
                pathname?.startsWith(`${route.href}/`);
              const isHovered = hoveredItem === route.href;

              return (
                <AnimatedNavItem
                  key={route.href}
                  href={route.href}
                  isActive={isActive}
                  onHover={setHoveredItem}
                  className="relative"
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-2xl transition-all duration-400 overflow-hidden",
                      isActive
                        ? "bg-[#104042] text-white shadow-md shadow-[#104042]/25"
                        : "bg-white text-gray-800 hover:text-white shadow-sm border border-gray-100 hover:border-transparent",
                    )}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 bg-[#104042] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    )}

                    <div className="relative z-10 flex items-center gap-3 w-full">
                      {route.icon && (
                        <AnimatedIcon
                          isActive={isActive}
                          isHovered={isHovered}
                          className={cn(
                            "w-5 h-5 transition-all duration-400 shrink-0",
                            isActive
                              ? "text-white"
                              : "text-[#104042] group-hover:text-white group-hover:scale-105",
                          )}
                        >
                          <route.icon />
                        </AnimatedIcon>
                      )}

                      <span className="flex-1 relative z-10 tracking-tight">
                        {route.label}
                      </span>

                      <AnimatedIcon
                        isActive={isActive}
                        isHovered={isHovered}
                        className={cn(
                          "relative z-10 transition-all duration-400",
                          isActive
                            ? "text-white/90 translate-x-0.5"
                            : "text-gray-300 group-hover:text-white group-hover:translate-x-1",
                        )}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </AnimatedIcon>
                    </div>
                  </Link>
                </AnimatedNavItem>
              );
            })}
          </AnimatePresence>
        </nav>

        <div className="px-2 pt-4 pb-1 text-center border-t border-gray-300/70 mt-5">
          <p className="font-semibold text-[13px] text-[#104042] tracking-tight">
            EasyBank
          </p>
          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
            Your trusted financial partner
          </p>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default EasyBankSidebar;
