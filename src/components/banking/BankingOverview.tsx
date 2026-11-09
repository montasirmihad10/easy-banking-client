"use client";

import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpToLine,
  Banknote,
  CheckCircle2,
  CircleDashed,
  CreditCard,
  List,
  ShieldAlert,
} from "lucide-react";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { useGetAccountStatsQuery } from "@/redux/api/multipleApi";
import Loading from "@/shared/loading/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Deposit",
    desc: "Fund your account securely",
    href: "/banking/deposit",
    icon: ArrowDownToLine,
  },
  {
    title: "Withdraw",
    desc: "Request cash-out for review",
    href: "/banking/withdraw",
    icon: ArrowUpToLine,
  },
  {
    title: "Transfer",
    desc: "Send to another EasyBank account",
    href: "/banking/transfer",
    icon: ArrowLeftRight,
  },
  {
    title: "Loans",
    desc: "Apply, track, or repay",
    href: "/banking/loan",
    icon: Banknote,
  },
];

const BankingOverview = () => {
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined);
  const account = myAccount?.data;
  const { data: accountStats, isLoading: statsLoading } =
    useGetAccountStatsQuery(undefined, {
      skip: !account || account.status !== "active",
    });
  const recent =
    accountStats?.data?.[0]?.recentTransactions?.slice(0, 5) || [];

  if (isLoading || statsLoading) return <Loading />;

  if (!account) {
    return (
      <div className="rounded-2xl border border-dashed border-[#104042]/25 bg-white p-8 text-center">
        <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-[#104042]" />
        <h1 className="text-xl font-bold text-[#104042]">Start with an account</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          Open a checking, savings, or business account to unlock deposits,
          transfers, withdrawals, and loans.
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-left text-sm text-slate-600">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <CircleDashed className="h-4 w-4 text-[#104042]" />
            1. Submit account details
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <CircleDashed className="h-4 w-4 text-[#104042]" />
            2. Wait for branch approval
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <CircleDashed className="h-4 w-4 text-[#104042]" />
            3. Start banking from this overview
          </div>
        </div>
        <Button asChild className="mt-6 bg-[#104042] hover:bg-[#0d3636]">
          <Link href="/banking/account">Open account</Link>
        </Button>
      </div>
    );
  }

  if (account.status === "pending") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
        <h1 className="text-xl font-bold text-amber-800">Approval in progress</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-amber-700">
          Your account request is with the branch team. Money moves stay locked
          until the account is active.
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-left text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Application submitted
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-medium text-amber-800">
            <CircleDashed className="h-4 w-4" />
            Branch review
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 text-slate-500">
            <CircleDashed className="h-4 w-4" />
            Start depositing & transferring
          </div>
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/banking/account">View account status</Link>
        </Button>
      </div>
    );
  }

  if (account.status === "closed" || account.status === "suspended") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <h1 className="text-xl font-bold text-rose-700">
          Account {account.status}
        </h1>
        <p className="mt-2 text-sm text-rose-600">
          This account cannot be used. Request a new account from the account
          page.
        </p>
        <Button asChild className="mt-5 bg-[#104042] hover:bg-[#0d3636]">
          <Link href="/banking/account">Go to account</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl bg-[#104042] text-white shadow-sm">
        <div className="bg-[radial-gradient(circle_at_top_right,rgba(174,255,28,0.18),transparent_45%)] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/70">Available balance</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                ৳{Number(account.balance || 0).toLocaleString()}
              </h1>
              <p className="mt-2 text-sm text-white/70">
                {account.accountHolderName} · {account.accountNumber}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-white/15 text-white hover:bg-white/20 capitalize">
                {account.accountType} · {account.status}
              </Badge>
              <p className="text-xs text-white/60">
                Keep at least ৳
                {Number(account.minimumBalance || 0).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="bg-[#AEFF1C] text-[#104042] hover:bg-[#9aef10]"
            >
              <Link href="/banking/deposit">Add money</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/banking/transfer">Send money</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/banking/activity">History</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#104042]">
              What do you want to do?
            </h2>
            <p className="text-xs text-slate-500">
              Pick an action — each flow guides you through the next steps
            </p>
          </div>
          <Link
            href="/banking/account"
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#104042]"
          >
            <CreditCard className="h-3.5 w-3.5" />
            Account
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#104042]/30 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#104042]/8 text-[#104042] transition group-hover:bg-[#104042] group-hover:text-white">
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-[#104042]">{action.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{action.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#104042]">
              Recent activity
            </h2>
            <p className="text-xs text-slate-500">
              Latest movements on your account
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-[#104042]">
            <Link
              href="/banking/activity"
              className="inline-flex items-center gap-1"
            >
              <List className="h-4 w-4" />
              View all
            </Link>
          </Button>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-lg bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm text-slate-500">
              No transactions yet. Add money to get started.
            </p>
            <Button asChild size="sm" className="mt-4 bg-[#104042]">
              <Link href="/banking/deposit">Make first deposit</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map(
              (
                tx: {
                  type: string;
                  amount: number;
                  date: string;
                  description: string;
                  status: string;
                },
                index: number,
              ) => {
                const isDebit = ["withdraw", "transfer"].includes(tx.type);
                return (
                  <div
                    key={`${tx.date}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium capitalize text-slate-800">
                        {tx.type?.replace("-", " ")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {tx.date
                          ? new Date(tx.date).toLocaleString()
                          : "Unknown date"}{" "}
                        · {tx.status}
                      </p>
                    </div>
                    <p
                      className={`text-sm font-semibold ${
                        isDebit ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {isDebit ? "-" : "+"}৳
                      {Number(tx.amount || 0).toLocaleString()}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BankingOverview;
