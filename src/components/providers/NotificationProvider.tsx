"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { toast } from "sonner";
import { getMessagingInstance } from "@/lib/firebase/firebase";
import { baseApi } from "@/redux/api/baseApi";

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

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

          dispatch(baseApi.util.invalidateTags(["notification"]));

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
  }, [dispatch]);

  return <>{children}</>;
};

export default NotificationProvider;
