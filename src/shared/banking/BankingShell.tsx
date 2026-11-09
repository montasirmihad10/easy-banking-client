"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpToLine,
  Home,
  List,
  LogOut,
  User,
  Banknote,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { bankingRoutes } from "@/utils/rolePaths";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationBell from "@/components/notifications/NotificationBell";

const quickActions = [
  { label: "Deposit", href: "/banking/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/banking/withdraw", icon: ArrowUpToLine },
  { label: "Transfer", href: "/banking/transfer", icon: ArrowLeftRight },
];

const mobileNav = [
  { label: "Home", href: "/banking", icon: Home, exact: true },
  { label: "Activity", href: "/banking/activity", icon: List },
  { label: "Support", href: "/banking/support", icon: LifeBuoy },
  { label: "Account", href: "/banking/account", icon: User },
];

const isActive = (pathname: string, href: string, exact?: boolean) => {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

const BankingShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const { data: myAccount } = useGetMyAccountQuery(undefined, {
    skip: !user,
  });
  const account = myAccount?.data;

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f4f7f7] pb-20 lg:pb-8">
      <header className="sticky top-0 z-40 border-b border-[#104042]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white">
                <Image
                  src="https://i.ibb.co/wZ0721GL/be-eb-b-e-abstract-260nw-2385258941-removebg-preview.png"
                  width={28}
                  height={28}
                  alt="EasyBank"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-[#104042]">EasyBank</p>
                <p className="text-[11px] text-slate-500">Customer banking</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {bankingRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive(
                      pathname || "",
                      route.href,
                      "exact" in route ? route.exact : false,
                    )
                      ? "bg-[#104042] text-white"
                      : "text-slate-600 hover:bg-[#104042]/8 hover:text-[#104042]",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            {account?.status === "active" && (
              <div className="hidden rounded-full border border-[#104042]/15 bg-[#104042]/5 px-3 py-1 text-xs font-semibold text-[#104042] sm:block">
                ৳{Number(account.balance || 0).toLocaleString()}
              </div>
            )}

            <NotificationBell href="/banking/notifications" />

            <div className="hidden items-center gap-1 md:flex">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
                    pathname === action.href
                      ? "bg-[#104042] text-white"
                      : "bg-slate-100 text-[#104042] hover:bg-[#104042]/10",
                  )}
                >
                  <action.icon className="h-3.5 w-3.5" />
                  {action.label}
                </Link>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2.5 transition hover:border-[#104042]/30">
                  <Avatar className="h-8 w-8 border border-[#104042]/15">
                    <AvatarImage src={user?.profilePhotoUrl || undefined} />
                    <AvatarFallback className="bg-[#104042] text-xs text-white">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[120px] truncate text-xs font-medium text-slate-700 sm:inline">
                    {user?.name || "Customer"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs font-normal text-slate-500">
                    {user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/banking/account">Account details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/banking/activity">Transaction history</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-rose-600 focus:text-rose-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#104042]/10 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 py-2">
          {mobileNav.map((item) => {
            const active = isActive(pathname || "", item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[11px] font-medium",
                  active ? "bg-[#104042] text-white" : "text-slate-500",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BankingShell;
