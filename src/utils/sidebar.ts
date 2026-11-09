import {
  User,
  BarChart2,
  ArrowDownToLine,
  ArrowUpToLine,
  Repeat2,
  Banknote,
  Users,
  MapPin,
  PlusSquare,
  UserCog,
  List,
  Settings,
  Home,
  LifeBuoy,
} from "lucide-react";

export const customerRoutes = [
  {
    label: "Overview",
    href: "/banking",
    icon: Home,
  },
  {
    label: "My Account",
    href: "/banking/account",
    icon: User,
  },
  {
    label: "Deposit",
    href: "/banking/deposit",
    icon: ArrowDownToLine,
  },
  {
    label: "Withdraw",
    href: "/banking/withdraw",
    icon: ArrowUpToLine,
  },
  {
    label: "Transfer",
    href: "/banking/transfer",
    icon: Repeat2,
  },
  {
    label: "Loans",
    href: "/banking/loan",
    icon: Banknote,
  },
  {
    label: "Activity",
    href: "/banking/activity",
    icon: List,
  },
  {
    label: "Support",
    href: "/banking/support",
    icon: LifeBuoy,
  },
];

export const adminRoutes = [
  {
    label: "Bank Stats",
    href: "/dashboard/admin/bank-stats",
    icon: BarChart2,
  },
  {
    label: "My Account",
    href: "/dashboard/admin/my-account",
    icon: User,
  },
  {
    label: "Account Stats",
    href: "/dashboard/admin/account-stats",
    icon: BarChart2,
  },
  {
    label: "Manage Accounts",
    href: "/dashboard/admin/manage-accounts",
    icon: Users,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/manage-users",
    icon: UserCog,
  },
  {
    label: "Customer Transactions",
    href: "/dashboard/admin/customer-transactions",
    icon: List,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/admin/customer-loans",
    icon: Banknote,
  },
  {
    label: "Branches",
    href: "/dashboard/admin/branches",
    icon: MapPin,
  },
  {
    label: "Create Branch",
    href: "/dashboard/admin/create-branch",
    icon: PlusSquare,
  },
  {
    label: "Bank Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
  {
    label: "Support Desk",
    href: "/dashboard/admin/support",
    icon: LifeBuoy,
  },
];

export const managerRoutes = [
  {
    label: "Bank Stats",
    href: "/dashboard/manager/bank-stats",
    icon: BarChart2,
  },
  {
    label: "My Account",
    href: "/dashboard/manager/my-account",
    icon: User,
  },
  {
    label: "Account Stats",
    href: "/dashboard/manager/account-stats",
    icon: BarChart2,
  },
  {
    label: "Manage Accounts",
    href: "/dashboard/manager/manage-accounts",
    icon: Users,
  },
  {
    label: "Customer Transactions",
    href: "/dashboard/manager/customer-transactions",
    icon: List,
  },
  {
    label: "Customer Loans",
    href: "/dashboard/manager/customer-loans",
    icon: Banknote,
  },
  {
    label: "My Branch",
    href: "/dashboard/manager/my-branch",
    icon: MapPin,
  },
  {
    label: "Deposit Balance",
    href: "/dashboard/manager/deposit-balance",
    icon: ArrowDownToLine,
  },
  {
    label: "Withdraw Balance",
    href: "/dashboard/manager/withdraw-balance",
    icon: ArrowUpToLine,
  },
  {
    label: "Transfer Balance",
    href: "/dashboard/manager/transfer-balance",
    icon: Repeat2,
  },
  {
    label: "My Loan",
    href: "/dashboard/manager/my-loan",
    icon: Banknote,
  },
  {
    label: "My Transactions",
    href: "/dashboard/manager/transactions",
    icon: List,
  },
];
