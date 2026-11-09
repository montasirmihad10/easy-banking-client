const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const envConfig = {
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV || "development",
  baseApi: isProd
    ? process.env.NEXT_PUBLIC_BASE_API
    : process.env.NEXT_PUBLIC_URL || "http://localhost:8080/api/v1",
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "",
  },
};
