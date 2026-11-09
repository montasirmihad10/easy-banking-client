"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useGetUnreadCountQuery } from "@/redux/api/notificationApi";
import { cn } from "@/lib/utils";

const NotificationBell = ({
  href = "/notifications",
  className,
}: {
  href?: string;
  className?: string;
}) => {
  const { data } = useGetUnreadCountQuery(undefined, {
    pollingInterval: 60000,
  });
  const count = Number(data?.data?.count || 0);

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#104042] transition hover:bg-[#104042]/5",
        className,
      )}
      aria-label="Notifications"
    >
      <Bell className="h-4 w-4" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold leading-4 text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
};

export default NotificationBell;
