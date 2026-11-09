"use client";

import Link from "next/link";
import {
  Banknote,
  Building2,
  CreditCard,
  ListChecks,
  Users,
} from "lucide-react";
import AdminManagerBankStats from "@/components/adminManagerPages/AdminManagerBankStats";
import { useGetMyBranchQuery } from "@/redux/api/branchApi";
import { useGetTransactionsQuery } from "@/redux/api/transactionApi";
import { useGetCustomerLoansQuery } from "@/redux/api/loanApi";
import { useGetAccountsQuery } from "@/redux/api/accountApi";
import Loading from "@/shared/loading/Loading";
import { Button } from "@/components/ui/button";

const ManagerOverview = () => {
  const { data: myBranch, isLoading: branchLoading } =
    useGetMyBranchQuery(undefined);
  const branch = myBranch?.data;

  const { data: pendingWithdrawals, isLoading: txnLoading } =
    useGetTransactionsQuery([
      { name: "transactionType", value: "withdraw" },
      { name: "status", value: "pending" },
      { name: "limit", value: "5" },
    ]);

  const { data: pendingLoans, isLoading: loanLoading } =
    useGetCustomerLoansQuery([
      { name: "status", value: "pending" },
      { name: "limit", value: "5" },
    ]);

  const { data: pendingAccounts, isLoading: accountLoading } =
    useGetAccountsQuery([
      { name: "status", value: "pending" },
      { name: "limit", value: "5" },
    ]);

  if (branchLoading || txnLoading || loanLoading || accountLoading) {
    return <Loading />;
  }

  const pendingTxnCount = pendingWithdrawals?.meta?.total ?? pendingWithdrawals?.data?.length ?? 0;
  const pendingLoanCount = pendingLoans?.meta?.total ?? pendingLoans?.data?.length ?? 0;
  const pendingAccountCount =
    pendingAccounts?.meta?.total ?? pendingAccounts?.data?.length ?? 0;

  const queues = [
    {
      title: "Pending withdrawals",
      count: pendingTxnCount,
      href: "/portal/transactions",
      icon: ListChecks,
      hint: "Approve or reject cash-out requests",
    },
    {
      title: "Pending loans",
      count: pendingLoanCount,
      href: "/portal/loans",
      icon: Banknote,
      hint: "Review and disburse loan requests",
    },
    {
      title: "Pending accounts",
      count: pendingAccountCount,
      href: "/portal/accounts",
      icon: Users,
      hint: "Activate new customer accounts",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Manager workspace</p>
            <h1 className="mt-1 text-2xl font-bold text-[#104042]">
              {branch?.name ? `${branch.name} overview` : "Branch overview"}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Review queues, manage accounts, and monitor branch performance
              without the heavy admin sidebar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="bg-[#104042] hover:bg-[#0d3636]">
              <Link href="/portal/transactions">Review withdrawals</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/portal/branch">
                <Building2 className="mr-1.5 h-4 w-4" />
                Branch
              </Link>
            </Button>
          </div>
        </div>

        {!branch && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            You are not assigned to a branch yet. Ask an admin to attach you to a
            branch to unlock full stats.
          </div>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {queues.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#104042]/30 hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#104042]/8 text-[#104042]">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-2xl font-bold text-[#104042]">
                {item.count}
              </span>
            </div>
            <h2 className="font-semibold text-[#104042]">{item.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Manage accounts",
            href: "/portal/accounts",
            icon: CreditCard,
          },
          {
            title: "Customer transactions",
            href: "/portal/transactions",
            icon: ListChecks,
          },
          { title: "Customer loans", href: "/portal/loans", icon: Banknote },
          { title: "My branch", href: "/portal/branch", icon: Building2 },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-[#104042] shadow-sm transition hover:border-[#104042]/30"
          >
            <link.icon className="h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-[#104042]">
            Performance snapshot
          </h2>
          <p className="text-xs text-slate-500">
            Branch and bank metrics for day-to-day decisions
          </p>
        </div>
        <div className="p-2 sm:p-4">
          <AdminManagerBankStats />
        </div>
      </section>
    </div>
  );
};

export default ManagerOverview;
