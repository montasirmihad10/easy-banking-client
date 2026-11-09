"use client";

import { useState } from "react";
import Link from "next/link";
import CreateTicketForm from "@/components/support/CreateTicketForm";
import TicketList from "@/components/support/TicketList";
import { useGetMySupportTicketsQuery } from "@/redux/api/supportApi";
import Loading from "@/shared/loading/Loading";

const BankingSupportPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useGetMySupportTicketsQuery({ limit: 50 });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#104042]">Support</h1>
          <p className="text-sm text-slate-500">
            Create and track support tickets for account, payments, and loans.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-lg bg-[#104042] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0c3334]"
        >
          {showForm ? "Hide form" : "New ticket"}
        </button>
      </div>

      {showForm ? (
        <CreateTicketForm
          onCreated={(id) => {
            setShowForm(false);
            window.location.href = `/banking/support/${id}`;
          }}
        />
      ) : null}

      <TicketList
        tickets={data?.data || []}
        hrefFor={(id) => `/banking/support/${id}`}
        emptyText="You have no support tickets yet. Open one if you need help."
      />

      <p className="text-sm text-slate-500">
        Prefer phone or email? Visit the{" "}
        <Link href="/contact" className="font-medium text-[#104042] underline">
          Contact
        </Link>{" "}
        page.
      </p>
    </div>
  );
};

export default BankingSupportPage;
