"use client";

import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetMyNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "@/redux/api/notificationApi";
import Loading from "@/shared/loading/Loading";
import { cn } from "@/lib/utils";

const NotificationsPage = ({ title = "Notifications" }: { title?: string }) => {
  const { data, isLoading, isFetching } = useGetMyNotificationsQuery({
    limit: 50,
  });
  const [markOne] = useMarkNotificationAsReadMutation();
  const [markAll, { isLoading: markingAll }] =
    useMarkAllNotificationsAsReadMutation();

  const notifications = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#104042]">{title}</h1>
          <p className="text-sm text-slate-500">
            Account, payment, and loan updates in one place.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={markingAll || !notifications.length}
          onClick={() => markAll(undefined)}
        >
          <CheckCheck className="mr-1.5 h-4 w-4" />
          Mark all read
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {!notifications.length ? (
          <div className="flex flex-col items-center gap-2 px-6 py-16 text-center text-slate-500">
            <Bell className="h-8 w-8 text-slate-300" />
            <p>No notifications yet.</p>
          </div>
        ) : (
          <ul className={cn("divide-y divide-slate-100", isFetching && "opacity-80")}>
            {notifications.map(
              (item: {
                _id: string;
                title: string;
                message: string;
                type?: string;
                isRead?: boolean;
                createdAt?: string;
              }) => (
                <li key={item._id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full flex-col gap-1 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5",
                      !item.isRead && "bg-[#104042]/[0.03]",
                    )}
                    onClick={() => {
                      if (!item.isRead) markOne(item._id);
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-[#104042]">
                        {item.title}
                      </p>
                      {!item.isRead ? (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#104042]" />
                      ) : null}
                    </div>
                    <p className="text-sm text-slate-600">{item.message}</p>
                    <div className="flex gap-2 text-[11px] uppercase tracking-wide text-slate-400">
                      <span>{item.type || "general"}</span>
                      {item.createdAt ? (
                        <span>
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      ) : null}
                    </div>
                  </button>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
