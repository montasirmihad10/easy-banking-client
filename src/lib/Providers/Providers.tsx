"use client";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { Toaster } from "@/components/ui/sonner";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <NotificationProvider>{children}</NotificationProvider>
      </Provider>
      <Toaster position="top-center" />
    </>
  );
};

export default Providers;
