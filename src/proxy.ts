import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookieToken } from "./utils/cookieGet";

type TRole = keyof typeof roleBasedRoutes;

const privateAuthRoutes = [
  "/login",
  "/signup",
  "/verify-otp",
  "/forget-password",
  "/reset-password",
];

const roleBasedRoutes = {
  customer: [/^\/banking(\/.*)?$/, /^\/dashboard\/customer(\/.*)?$/],
  manager: [/^\/portal(\/.*)?$/, /^\/dashboard\/manager(\/.*)?$/],
  admin: [
    /^\/dashboard\/admin(\/.*)?$/,
    /^\/dashboard\/manager(\/.*)?$/,
    /^\/portal(\/.*)?$/,
  ],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value || null;
  const user = token ? getCookieToken(token) : null;

  if (user && privateAuthRoutes.includes(pathname)) {
    const role = user.role as TRole;
    // Customers stay on the marketing site first for product knowledge.
    const home =
      role === "customer"
        ? "/"
        : role === "manager"
          ? "/portal"
          : role === "admin"
            ? "/dashboard/admin/bank-stats"
            : "/";
    return NextResponse.redirect(new URL(home, request.url));
  }

  if (!user && privateAuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user.role === "customer" && pathname.startsWith("/dashboard/customer")) {
    const map: Record<string, string> = {
      "/dashboard/customer": "/banking",
      "/dashboard/customer/account-stats": "/banking",
      "/dashboard/customer/my-account": "/banking/account",
      "/dashboard/customer/deposit-balance": "/banking/deposit",
      "/dashboard/customer/withdraw-balance": "/banking/withdraw",
      "/dashboard/customer/transfer-balance": "/banking/transfer",
      "/dashboard/customer/my-loan": "/banking/loan",
      "/dashboard/customer/transactions": "/banking/activity",
    };
    const target = map[pathname] || "/banking";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (user.role === "manager" && pathname.startsWith("/dashboard/manager")) {
    const map: Record<string, string> = {
      "/dashboard/manager": "/portal",
      "/dashboard/manager/bank-stats": "/portal",
      "/dashboard/manager/manage-accounts": "/portal/accounts",
      "/dashboard/manager/customer-transactions": "/portal/transactions",
      "/dashboard/manager/customer-loans": "/portal/loans",
      "/dashboard/manager/my-branch": "/portal/branch",
    };
    if (map[pathname]) {
      return NextResponse.redirect(new URL(map[pathname], request.url));
    }
    if (pathname.startsWith("/dashboard/manager/manage-accounts/")) {
      const id = pathname.split("/").pop();
      return NextResponse.redirect(new URL(`/portal/accounts/${id}`, request.url));
    }
    if (pathname.startsWith("/dashboard/manager/customer-loans/")) {
      const id = pathname.split("/").pop();
      return NextResponse.redirect(new URL(`/portal/loans/${id}`, request.url));
    }
  }

  const userRole = user?.role as TRole;
  const allowedRoutes = [
    ...(roleBasedRoutes[userRole] || []),
    ...(userRole === "admin" ? roleBasedRoutes.manager : []),
  ];

  if (allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify-otp",
    "/forget-password",
    "/reset-password",
    "/dashboard/:path*",
    "/banking",
    "/banking/:path*",
    "/portal",
    "/portal/:path*",
  ],
};
