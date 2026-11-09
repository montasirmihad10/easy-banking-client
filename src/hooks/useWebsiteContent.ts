"use client";

import { useGetBankSettingsQuery } from "@/redux/api/settingsApi";

export type WebsiteFaq = {
  question: string;
  answer: string;
  category: string;
};

export type WebsiteService = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  details: string[];
};

export type WebsiteContent = {
  brandName: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroStats: { value: string; label: string }[];
  deliveryTitle: string;
  deliveryBody: string;
  deliveryImage1: string;
  deliveryImage2: string;
  heroImage: string;
  brandLogo: string;
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  supportHours: string;
  faqs: WebsiteFaq[];
  services: WebsiteService[];
};

const fallback: WebsiteContent = {
  brandName: "EasyBank",
  heroEyebrow: "ENTERPRISE FINANCIAL PLATFORM",
  heroTitleLine1: "The Future of",
  heroTitleLine2: "Digital Banking",
  heroSubtitle:
    "Experience seamless banking with our comprehensive platform. Deposit, Withdraw, Transfer & Secure Loans - all powered by enterprise-grade security and lightning-fast processing.",
  heroPrimaryCta: "Start Your Journey",
  heroSecondaryCta: "Features",
  heroStats: [
    { value: "99.9%", label: "Uptime" },
    { value: "500K+", label: "Active Users" },
    { value: "4.9", label: "App Rating" },
  ],
  deliveryTitle: "Delivering the Best Banking Experience",
  deliveryBody:
    "EasyBank focuses on giving you the most efficient and reliable digital banking service. Our team ensures that every transaction is secure, smooth, and lightning fast.",
  deliveryImage1: "",
  deliveryImage2: "",
  heroImage: "",
  brandLogo: "",
  contactTitle: "Contact Us",
  contactSubtitle: "We are here to help with accounts, payments, and loans.",
  contactEmail: "support@easybank.com",
  contactPhone: "+880 1700-000000",
  contactAddress: "EasyBank HQ, Dhaka, Bangladesh",
  supportHours: "24/7 customer support",
  faqs: [],
  services: [],
};

export const useWebsiteContent = () => {
  const { data, isLoading, isError } = useGetBankSettingsQuery(undefined);
  const settings = data?.data;
  const website = {
    ...fallback,
    ...(settings?.website || {}),
    heroStats: settings?.website?.heroStats?.length
      ? settings.website.heroStats
      : fallback.heroStats,
    faqs: settings?.website?.faqs || fallback.faqs,
    services: settings?.website?.services || fallback.services,
  } as WebsiteContent;

  return {
    website,
    settings,
    isLoading,
    isError,
    rates: {
      savingsAnnualInterestRate: settings?.savingsAnnualInterestRate ?? 0.06,
      defaultLoanInterestRate: settings?.defaultLoanInterestRate ?? 0.05,
      currency: settings?.currency ?? "BDT",
      defaultMinimumBalance: settings?.defaultMinimumBalance ?? 2000,
    },
  };
};
