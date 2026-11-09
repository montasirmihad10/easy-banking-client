"use client";

import { useState } from "react";
import TicketList from "@/components/support/TicketList";
import { useGetAllSupportTicketsQuery } from "@/redux/api/supportApi";
import Loading from "@/shared/loading/Loading";
import { SUPPORT_STATUSES } from "@/components/support/supportHelpers";

const PortalSupportPage = () => {
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetAllSupportTicketsQuery({
    limit: 100,
    ...(status ? { status } : {}),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#104042]">Support desk</h1>
          <p className="text-sm text-slate-500">
            Help customers with open banking support tickets.
          </p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm"
        >
          <option value="">All statuses</option>
          {SUPPORT_STATUSES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <TicketList
        tickets={data?.data || []}
        hrefFor={(id) => `/portal/support/${id}`}
        emptyText="No support tickets yet."
      />
    </div>
  );
};

export default PortalSupportPage;
