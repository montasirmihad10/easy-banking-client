"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotificationsPage from "@/components/notifications/NotificationsPage";
import { getUser } from "@/services/authServices";
import { JwtPayload } from "@/types/common.type";

const NotificationsRedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = getUser() as JwtPayload | null;
    if (!user?.role) {
      router.replace("/login");
      return;
    }
    if (user.role === "customer") {
      router.replace("/banking/notifications");
      return;
    }
    if (user.role === "manager") {
      router.replace("/portal/notifications");
      return;
    }
    if (user.role === "admin") {
      router.replace("/dashboard/admin/notifications");
    }
  }, [router]);

  return <NotificationsPage />;
};

export default NotificationsRedirectPage;