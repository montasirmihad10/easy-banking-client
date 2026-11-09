"use client";

import { getToken } from "firebase/messaging";
import { envConfig } from "@/config/envConfig";
import { getMessagingInstance } from "@/lib/firebase/firebase";

export const getFcmToken = async (): Promise<string> => {
  try {
    if (typeof window === "undefined") return "";
    if (!("Notification" in window)) return "";
    if (!("serviceWorker" in navigator)) return "";

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
    if (Notification.permission !== "granted") return "";

    const messaging = await getMessagingInstance();
    if (!messaging) return "";

    const registration = await navigator.serviceWorker.getRegistration("/");
    if (!registration) {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/",
      });
    }

    const swRegistration = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: envConfig.firebase.vapidKey,
      serviceWorkerRegistration: swRegistration,
    });

    return token || "";
  } catch (err) {
    console.error("FCM token error:", err);
    return "";
  }
};
