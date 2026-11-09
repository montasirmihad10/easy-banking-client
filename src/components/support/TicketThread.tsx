"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSupportTicketQuery,
  useReplySupportTicketMutation,
  useUpdateSupportTicketMutation,
} from "@/redux/api/supportApi";
import Loading from "@/shared/loading/Loading";
import {
  SUPPORT_PRIORITIES,
  SUPPORT_STATUSES,
  priorityTone,
  statusTone,
} from "@/components/support/supportHelpers";
import { cn } from "@/lib/utils";

const TicketThread = ({
  ticketId,
  staffMode = false,
}: {
  ticketId: string;
  staffMode?: boolean;
}) => {
  const { data, isLoading } = useGetSupportTicketQuery(ticketId);
  const [reply, { isLoading: replying }] = useReplySupportTicketMutation();
  const [updateTicket, { isLoading: updating }] =
    useUpdateSupportTicketMutation();
  const [message, setMessage] = useState("");

  const ticket = data?.data;

  if (isLoading) return <Loading />;
  if (!ticket) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
        Ticket not found.
      </p>
    );
  }

  const onReply = async () => {
    if (!message.trim()) return;
    try {
      await reply({ id: ticketId, message: message.trim() }).unwrap();
      setMessage("");
      toast.success("Reply sent");
    } catch (error: unknown) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Failed to send reply",
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {ticket.ticketNumber}
            </p>
            <h1 className="mt-1 text-xl font-bold text-[#104042]">
              {ticket.subject}
            </h1>
            <p className="mt-1 text-sm capitalize text-slate-500">
              {ticket.category} · opened{" "}
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                statusTone(ticket.status),
              )}
            >
              {String(ticket.status || "").replace("_", " ")}
            </span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                priorityTone(ticket.priority),
              )}
            >
              {ticket.priority}
            </span>
          </div>
        </div>

        {staffMode ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <select
              className="h-10 rounded-md border border-slate-200 px-3 text-sm"
              value={ticket.status}
              disabled={updating}
              onChange={async (e) => {
                try {
                  await updateTicket({
                    id: ticketId,
                    status: e.target.value,
                  }).unwrap();
                  toast.success("Status updated");
                } catch {
                  toast.error("Could not update status");
                }
              }}
            >
              {SUPPORT_STATUSES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              className="h-10 rounded-md border border-slate-200 px-3 text-sm"
              value={ticket.priority}
              disabled={updating}
              onChange={async (e) => {
                try {
                  await updateTicket({
                    id: ticketId,
                    priority: e.target.value,
                  }).unwrap();
                  toast.success("Priority updated");
                } catch {
                  toast.error("Could not update priority");
                }
              }}
            >
              {SUPPORT_PRIORITIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {(ticket.guestEmail || ticket.user?.email) && (
          <p className="mt-3 text-sm text-slate-600">
            From:{" "}
            <span className="font-medium text-slate-800">
              {ticket.user
                ? `${ticket.user?.name?.firstName || ""} ${ticket.user?.name?.lastName || ""}`.trim() ||
                  ticket.user.email
                : ticket.guestName}
            </span>{" "}
            · {ticket.user?.email || ticket.guestEmail}
          </p>
        )}
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Conversation
        </h2>
        {(ticket.messages || []).map(
          (
            msg: {
              _id?: string;
              senderName: string;
              senderRole: string;
              message: string;
              createdAt?: string;
            },
            index: number,
          ) => (
            <div
              key={msg._id || index}
              className={cn(
                "rounded-xl border px-4 py-3",
                msg.senderRole === "admin" || msg.senderRole === "manager"
                  ? "border-[#104042]/15 bg-[#104042]/5"
                  : "border-slate-100 bg-slate-50",
              )}
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  {msg.senderName}{" "}
                  <span className="font-normal capitalize text-slate-400">
                    · {msg.senderRole}
                  </span>
                </span>
                <span>
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-700">
                {msg.message}
              </p>
            </div>
          ),
        )}

        {ticket.status !== "closed" ? (
          <div className="space-y-3 pt-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a reply..."
              rows={4}
            />
            <Button
              type="button"
              disabled={replying || !message.trim()}
              onClick={onReply}
              className="bg-[#104042] text-white hover:bg-[#0c3334]"
            >
              {replying ? "Sending..." : "Send reply"}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">This ticket is closed.</p>
        )}
      </div>
    </div>
  );
};

export default TicketThread;
