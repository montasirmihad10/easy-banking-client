"use client";

import { useEffect } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { toast } from "sonner";
import { getMessagingInstance } from "@/lib/firebase/firebase";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const setupListener = async () => {
      if (typeof window === "undefined") return;
      if (!("serviceWorker" in navigator)) return;

      try {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          scope: "/",
        });
        await navigator.serviceWorker.ready;

        const messaging = await getMessagingInstance();
        if (!messaging) return;

        unsubscribe = onMessage(messaging, (payload) => {
          const title = payload.notification?.title || "EasyBank";
          const body = payload.notification?.body || "";

          toast(title, {
            description: body,
            duration: 5000,
            position: "top-center",
          });

          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            const notification = new Notification(title, {
              body,
              icon: "/favicon.ico",
              tag: "easybank-notification",
            });
            notification.onclick = () => {
              window.focus();
              notification.close();
            };
          }
        });
      } catch (err) {
        console.error("FCM listener setup failed:", err);
      }
    };

    setupListener();
    return () => unsubscribe?.();
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
