"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  priorityTone,
  statusTone,
} from "@/components/support/supportHelpers";

type TicketItem = {
  _id: string;
  ticketNumber?: string;
  subject: string;
  category?: string;
  status?: string;
  priority?: string;
  updatedAt?: string;
  guestName?: string;
  guestEmail?: string;
  user?: {
    email?: string;
    name?: { firstName?: string; lastName?: string };
  };
};

const TicketList = ({
  tickets,
  hrefFor,
  emptyText = "No support tickets yet.",
}: {
  tickets: TicketItem[];
  hrefFor: (id: string) => string;
  emptyText?: string;
}) => {
  if (!tickets?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center text-slate-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <ul className="divide-y divide-slate-100">
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <Link
              href={hrefFor(ticket._id)}
              className="block px-4 py-4 transition hover:bg-slate-50 sm:px-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {ticket.ticketNumber}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#104042]">
                    {ticket.subject}
                  </p>
                  <p className="mt-1 text-xs capitalize text-slate-500">
                    {ticket.category}
                    {ticket.user || ticket.guestEmail
                      ? ` · ${
                          ticket.user
                            ? ticket.user.email
                            : ticket.guestEmail
                        }`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                      statusTone(ticket.status),
                    )}
                  >
                    {String(ticket.status || "").replace("_", " ")}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
                      priorityTone(ticket.priority),
                    )}
                  >
                    {ticket.priority}
                  </span>
                </div>
              </div>
              {ticket.updatedAt ? (
                <p className="mt-2 text-[11px] text-slate-400">
                  Updated {new Date(ticket.updatedAt).toLocaleString()}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
