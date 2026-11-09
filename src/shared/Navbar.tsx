"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserPen,
  ChartNoAxesCombined,
  SquareUserRound,
  ArrowLeftRight,
  ChartBarStacked,
} from "lucide-react";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import { navRoutes } from "@/utils/routes";
import Image from "next/image";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ShimmerButton } from "@/components/ui/ShimmerButton";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const userData = getUser() as JwtPayload;
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  // Animation-ready wrapper component
  const AnimationWrapper = ({ children, className = "", ...props }: any) => (
    <div className={`transition-all duration-300 ${className}`} {...props}>
      {children}
    </div>
  );

  // Responsive Logo component
  const LogoSection = () => (
    <AnimationWrapper className="hover:scale-105">
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-md flex items-center justify-center">
              <Image
                src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                width={100}
                height={100}
                alt="EasyBank Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
            EasyBank
          </h1>
        </div>
      </Link>
    </AnimationWrapper>
  );

  // Navigation item component
  const NavItem = ({ route, index }: { route: any; index: number }) => (
    <AnimationWrapper
      className="relative group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link
        href={route.path}
        key={index}
        className={`flex items-center gap-1 relative py-1 px-2 text-sm md:text-base rounded-md transition-all duration-200
      ${
        pathname === route.path
          ? "bg-[#104042] text-white font-bold"
          : "text-black hover:bg-[#104042] hover:text-white"
      }`}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Optional motion span for hover animation */}
        {hovered === index && pathname !== route.path && (
          <motion.span
            layoutId="hovered-span"
            className="absolute inset-0 w-full h-full rounded-md bg-[#104042] z-0"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        )}
        <span className="relative z-10 font-semibold">{route.label}</span>
      </Link>
    </AnimationWrapper>
  );

  const MobileAuthSection = () => {
    return (
      user && (
        <div className="p-4 sm:p-6 border-t border-white/10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
              <Avatar className="w-10 h-10 border-2 border-[#AEFF1C]">
                <AvatarImage
                  src={user?.profilePhotoUrl || "/placeholder.svg"}
                />
                <AvatarFallback className="bg-[#AEFF1C] text-[#104042]">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-white">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-white/70">{user?.email}</p>
              </div>
            </div>

            {/* Match desktop dropdown items exactly */}
            {user.role === "customer" ? (
              <div className="space-y-1">
                <Link href="/banking" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#AEFF1C] hover:bg-white/10"
                  >
                    <ChartNoAxesCombined className="w-4 h-4 mr-2" />
                    Open My Banking
                  </Button>
                </Link>
                <Link href="/banking/account" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <SquareUserRound className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
                </Link>
                <Link href="/banking/activity" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Activity
                  </Button>
                </Link>
              </div>
            ) : user.role === "manager" ? (
              <div className="space-y-1">
                <Link href="/portal" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ChartBarStacked className="w-4 h-4 mr-2" />
                    Manager portal
                  </Button>
                </Link>
                <Link href="/portal/transactions" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Transactions
                  </Button>
                </Link>
                <Link href="/portal/accounts" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <SquareUserRound className="w-4 h-4 mr-2" />
                    Accounts
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href={`/dashboard/${user.role}/bank-stats`}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ChartBarStacked className="w-4 h-4 mr-2" />
                    Bank Stats
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/${user.role}/my-account`}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <SquareUserRound className="w-4 h-4 mr-2" />
                    My Account
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/${user.role}/account-stats`}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ChartNoAxesCombined className="w-4 h-4 mr-2" />
                    My Account Stats
                  </Button>
                </Link>
                <Link
                  href={`/dashboard/${user.role}/customer-transactions`}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/10"
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    Customer Transactions
                  </Button>
                </Link>
              </>
            )}
            <div className="border border-white mt-2"></div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )
    );
  };

  return (
    <motion.nav
      animate={{
        boxShadow: scrolled ? "var(--shadow-aceternity)" : "none",
        width:
          scrolled && typeof window !== "undefined" && window.innerWidth >= 768
            ? "90%"
            : "100%",
        y:
          scrolled && typeof window !== "undefined" && window.innerWidth >= 768
            ? 10
            : 0,
        backgroundColor:
          typeof window !== "undefined" && window.innerWidth >= 768
            ? scrolled
              ? "white"
              : "transparent"
            : "#e9e7e7",
      }}
      transition={{
        duration: 0.3,
        ease: easeInOut,
      }}
      className="fixed w-full z-60 md:rounded-2xl mx-auto inset-x-0 bottom-0 md:bottom-auto md:top-0"
    >
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <LogoSection />

          {/* Desktop Navigation - Show on lg screens and above */}
          <div className="hidden lg:flex items-center space-x-2">
            {navRoutes?.map((route, index) => (
              <NavItem key={index} route={route} index={index} />
            ))}
          </div>

          {/* Tablet Navigation - Show on md screens */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navRoutes.slice(0, 4).map((route, index) => (
              <NavItem key={index} route={route} index={index} />
            ))}
          </div>

          {/* Desktop Auth Section */}
          {loading ? (
            <Skeleton className="hidden md:block h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-400" />
          ) : user ? (
            <div className="relative z-50 hidden md:flex items-center gap-2 sm:gap-4">
              {user.role === "customer" && (
                <Link
                  href="/banking"
                  className="rounded-md border border-[#104042]/25 bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#104042] transition hover:bg-[#104042] hover:text-white"
                >
                  My Banking
                </Link>
              )}
              {user.role === "manager" && (
                <Link
                  href="/portal"
                  className="rounded-md border border-[#104042]/25 bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#104042] transition hover:bg-[#104042] hover:text-white"
                >
                  Portal
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 sm:gap-2 p-1 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  >
                    <AnimationWrapper>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Avatar className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-[#AEFF1C]">
                          <AvatarImage
                            src={user.profilePhotoUrl || "/placeholder.svg"}
                            alt={user.name || "User"}
                          />
                          <AvatarFallback className="bg-[#AEFF1C] text-[#104042] font-semibold">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                      </div>
                    </AnimationWrapper>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-[#104042] text-white shadow-2xl rounded-xl border-[#104042]"
                >
                  <DropdownMenuLabel className="font-semibold px-4 py-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#0d3636]" />
                  {user.role === "customer" ? (
                    <>
                      <Link href="/banking">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartNoAxesCombined className="w-4 h-4 hover:text-black " />
                          Open My Banking
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/banking/account">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <SquareUserRound className="w-4 h-4 hover:text-black " />
                          My Account
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/banking/activity">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ArrowLeftRight className="w-4 h-4 hover:text-black" />
                          Activity
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : user.role === "manager" ? (
                    <>
                      <Link href="/portal">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartBarStacked className="w-4 h-4 hover:text-black " />
                          Manager portal
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/portal/transactions">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ArrowLeftRight className="w-4 h-4 hover:text-black" />
                          Transactions
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/portal/accounts">
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <SquareUserRound className="w-4 h-4 hover:text-black " />
                          Accounts
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/dashboard/${user.role}/bank-stats`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartBarStacked className="w-4 h-4 hover:text-black " />
                          Bank Stats
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/my-account`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <SquareUserRound className="w-4 h-4 hover:text-black " />
                          My Account
                        </DropdownMenuItem>
                      </Link>
                      <Link href={`/dashboard/${user.role}/account-stats`}>
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ChartNoAxesCombined className="w-4 h-4 hover:text-black" />
                          My Account Stats
                        </DropdownMenuItem>
                      </Link>
                      <Link
                        href={`/dashboard/${user.role}/customer-transactions`}
                      >
                        <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm hover:bg-black/60 rounded-md cursor-pointer">
                          <ArrowLeftRight className="w-4 h-4 hover:text-black" />
                          Customer Transations
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#c5d0d0]" />
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 flex items-center gap-2 text-sm rounded-md cursor-pointer hover:bg-black/60"
                  >
                    {/* <DropdownMenuItem className="px-4 py-2 flex items-center gap-2 text-sm rounded-md cursor-pointer hover:bg-black"> */}
                      <LogOut className="w-4 h-4 text-[#AEFF1C]" />
                      <span className="text-[#AEFF1C]">Sign Out</span>
                    {/* </DropdownMenuItem> */}
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <AnimationWrapper className="hover:scale-105">
                <UserPen className="w-4 h-4 sm:w-5 sm:h-5" />
              </AnimationWrapper>
              {/* <AnimationWrapper>
                <Link
                  href="/login"
                  className="text-white bg-[#104042] font-medium transition-colors duration-300 px-3 sm:px-4 md:px-5 tracking-wide py-1 sm:py-2 rounded-md relative group text-sm sm:text-base"
                >
                  Login
                  <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#AEFF1C] to-transparent h-[1px]"></span>
                  <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#AEFF1C] to-transparent h-[4px] blur-sm"></span>
                </Link>
              </AnimationWrapper> */}
              <Link href="/login">
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Login
                  </span>
                </ShimmerButton>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button - Show on sm and below */}
          <div className="md:hidden flex items-center gap-2">
            <div>
              {loading ? (
                <Skeleton className="hidden md:block h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-400" />
              ) : user ? (
                <Avatar className="w-7 h-7 sm:w-9 sm:h-9 border border-[#AEFF1C]">
                  <AvatarImage
                    src={user.profilePhotoUrl || "/placeholder.svg"}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-[#AEFF1C] text-[#104042] font-semibold">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <UserPen className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="p-1 cursor-pointer rounded-md hover:bg-gray-100 transition-all duration-100">
                  {isOpen ? (
                    <X className="text-2xl text-black" />
                  ) : (
                    <Menu className="text-2xl text-black" />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="bottom"
                align="start"
                className="p-0 w-screen left-0 mt-2 mb-2 bg-[#104042] border-none overflow-y-auto rounded-none"
                style={{ maxWidth: "100vw" }}
              >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center">
                      <Image
                        src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                        width={100}
                        height={100}
                        alt="EasyBank Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">EasyBank</h2>
                    <p className="text-xs text-white/70">Financial Services</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="px-4 py-4 space-y-2">
                  {navRoutes?.map((route, index) => (
                    <Link
                      key={index}
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 rounded-lg hover:bg-white/10 text-white hover:text-[#AEFF1C] font-medium transition-all duration-300 text-sm"
                    >
                      {route.label}
                    </Link>
                  ))}
                  {!user && (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 rounded-lg hover:bg-white/10 text-[#AEFF1C] hover:text-white font-medium transition-all duration-300 text-sm"
                    >
                      Login
                    </Link>
                  )}
                </div>

                <MobileAuthSection />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
