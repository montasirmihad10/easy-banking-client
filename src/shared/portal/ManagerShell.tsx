"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Banknote,
  Building2,
  Home,
  LifeBuoy,
  List,
  LogOut,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";
import { useGetMyBranchQuery } from "@/redux/api/branchApi";
import { removeCookie } from "@/utils/deleteCookie";
import { removeFromLocalStorage } from "@/utils/local-storage";
import { portalRoutes } from "@/utils/rolePaths";
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

const mobileNav = [
  { label: "Home", href: "/portal", icon: Home, exact: true },
  { label: "Accounts", href: "/portal/accounts", icon: Users },
  { label: "Support", href: "/portal/support", icon: LifeBuoy },
  { label: "Loans", href: "/portal/loans", icon: Banknote },
  { label: "Branch", href: "/portal/branch", icon: Building2 },
];

const isActive = (pathname: string, href: string, exact?: boolean) => {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

const ManagerShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const { data: myBranch } = useGetMyBranchQuery(undefined, {
    skip: !user,
  });
  const branch = myBranch?.data;

  const handleSignOut = async () => {
    await removeCookie("accessToken", "refreshToken");
    removeFromLocalStorage("accessToken");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f4f7f7] pb-20 lg:pb-8">
      <header className="sticky top-0 z-40 border-b border-[#104042]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/portal" className="flex items-center gap-2.5">
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
                <p className="text-[11px] text-slate-500">Manager portal</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {portalRoutes.map((route) => (
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
            {branch?.name && (
              <div className="hidden rounded-full border border-[#104042]/15 bg-[#104042]/5 px-3 py-1 text-xs font-medium text-[#104042] sm:block">
                {branch.name}
              </div>
            )}

            <NotificationBell href="/portal/notifications" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-2.5 transition hover:border-[#104042]/30">
                  <Avatar className="h-8 w-8 border border-[#104042]/15">
                    <AvatarImage src={user?.profilePhotoUrl || undefined} />
                    <AvatarFallback className="bg-[#104042] text-xs text-white">
                      {user?.name?.charAt(0) || "M"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden max-w-[120px] truncate text-xs font-medium text-slate-700 sm:inline">
                    {user?.name || "Manager"}
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
                  <Link href="/portal/branch">My branch</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portal/transactions">Review transactions</Link>
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

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#104042]/10 bg-white/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1 px-1 py-2">
          {mobileNav.map((item) => {
            const active = isActive(pathname || "", item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium",
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

export default ManagerShell;
