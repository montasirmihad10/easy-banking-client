/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyCCsI1ZX6OnFtXUUTV9XHJ7s1pxouqyVSk",
  authDomain: "notification-test-ed116.firebaseapp.com",
  projectId: "notification-test-ed116",
  storageBucket: "notification-test-ed116.firebasestorage.app",
  messagingSenderId: "239580428059",
  appId: "1:239580428059:web:657d7680bbd9630e28c5be",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "EasyBank";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "easybank-notification",
    data: payload.data || {},
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(urlToOpen);
      }),
  );
});
