/** Where a role lands after login / hitting auth pages while already signed in */
export const getPostLoginPath = (role?: string) => {
  if (role === "customer") return "/";
  if (role === "manager") return "/portal";
  if (role === "admin") return "/dashboard/admin/bank-stats";
  return "/";
};

/** Dedicated app home for each role (not the marketing site) */
export const getAppHomePath = (role?: string) => {
  if (role === "customer") return "/banking";
  if (role === "manager") return "/portal";
  if (role === "admin") return "/dashboard/admin/bank-stats";
  return "/";
};

/** @deprecated use getPostLoginPath or getAppHomePath */
export const getBankingHomePath = getPostLoginPath;

export const getMyAccountPath = (role?: string) => {
  if (role === "customer") return "/banking/account";
  if (role === "manager") return "/portal/branch";
  if (role) return `/dashboard/${role}/my-account`;
  return "/login";
};

export const getActivityPath = (role?: string) => {
  if (role === "customer") return "/banking/activity";
  if (role === "manager") return "/portal/transactions";
  if (role) return `/dashboard/${role}/transactions`;
  return "/login";
};

export const bankingRoutes = [
  { label: "Overview", href: "/banking", exact: true },
  { label: "Activity", href: "/banking/activity" },
  { label: "Loans", href: "/banking/loan" },
  { label: "Support", href: "/banking/support" },
  { label: "Account", href: "/banking/account" },
] as const;

export const portalRoutes = [
  { label: "Overview", href: "/portal", exact: true },
  { label: "Accounts", href: "/portal/accounts" },
  { label: "Transactions", href: "/portal/transactions" },
  { label: "Loans", href: "/portal/loans" },
  { label: "Support", href: "/portal/support" },
  { label: "Branch", href: "/portal/branch" },
] as const;
