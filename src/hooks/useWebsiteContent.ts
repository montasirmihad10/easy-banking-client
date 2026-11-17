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
  faqs: [
    {
      question: "How does the deposit service work and when do I get my interest?",
      answer:
        "Deposits are funded securely via card. Savings interest is applied from bank settings. Track growth anytime from My Banking.",
      category: "Deposits",
    },
    {
      question: "Are there any fees for withdrawals and how fast are they processed?",
      answer:
        "Withdrawals create a pending request: funds are held immediately and released after manager/admin approval.",
      category: "Withdrawals",
    },
    {
      question: "Can I transfer money to other EasyBank users?",
      answer:
        "Yes. Transfers between EasyBank accounts are instant and secured. Status shows immediately in your activity list.",
      category: "Transfers",
    },
  ],
  services: [
    {
      id: "deposit",
      title: "Deposit",
      description: "Fund your account securely with card payments",
      highlight: "Stripe secured",
      details: [
        "Card checkout with Stripe",
        "Balance updates after payment confirmation",
        "Track every deposit in Activity",
        "No hidden deposit fees",
      ],
    },
    {
      id: "withdraw",
      title: "Withdraw",
      description: "Request cash-out with branch review",
      highlight: "Reviewed release",
      details: [
        "Funds held on request",
        "Manager/admin approval required",
        "Daily and monthly limits apply",
        "Full status history in Activity",
      ],
    },
    {
      id: "transfer",
      title: "Transfer",
      description: "Send money instantly inside EasyBank",
      highlight: "Instant ledger",
      details: [
        "Transfer to another EasyBank account",
        "Instant balance updates",
        "Account-type limits from settings",
        "Secure encrypted processing",
      ],
    },
  ],
};

const str = (value: string | undefined | null, fallbackValue: string) =>
  value?.trim() || fallbackValue;

export const useWebsiteContent = () => {
  const { data, isLoading, isError } = useGetBankSettingsQuery(undefined);
  const settings = data?.data;
  const cms = settings?.website;

  const website: WebsiteContent = {
    brandName: str(cms?.brandName, fallback.brandName),
    heroEyebrow: str(cms?.heroEyebrow, fallback.heroEyebrow),
    heroTitleLine1: str(cms?.heroTitleLine1, fallback.heroTitleLine1),
    heroTitleLine2: str(cms?.heroTitleLine2, fallback.heroTitleLine2),
    heroSubtitle: str(cms?.heroSubtitle, fallback.heroSubtitle),
    heroPrimaryCta: str(cms?.heroPrimaryCta, fallback.heroPrimaryCta),
    heroSecondaryCta: str(cms?.heroSecondaryCta, fallback.heroSecondaryCta),
    heroStats: cms?.heroStats?.length ? cms.heroStats : fallback.heroStats,
    deliveryTitle: str(cms?.deliveryTitle, fallback.deliveryTitle),
    deliveryBody: str(cms?.deliveryBody, fallback.deliveryBody),
    deliveryImage1: str(cms?.deliveryImage1, fallback.deliveryImage1),
    deliveryImage2: str(cms?.deliveryImage2, fallback.deliveryImage2),
    heroImage: str(cms?.heroImage, fallback.heroImage),
    brandLogo: str(cms?.brandLogo, fallback.brandLogo),
    contactTitle: str(cms?.contactTitle, fallback.contactTitle),
    contactSubtitle: str(cms?.contactSubtitle, fallback.contactSubtitle),
    contactEmail: str(cms?.contactEmail, fallback.contactEmail),
    contactPhone: str(cms?.contactPhone, fallback.contactPhone),
    contactAddress: str(cms?.contactAddress, fallback.contactAddress),
    supportHours: str(cms?.supportHours, fallback.supportHours),
    faqs: cms?.faqs?.length ? cms.faqs : fallback.faqs,
    services: cms?.services?.length ? cms.services : fallback.services,
  };

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
