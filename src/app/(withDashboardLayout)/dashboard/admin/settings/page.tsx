"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/shared/loading/Loading";
import { cn } from "@/lib/utils";
import ImageUploadField from "@/components/adminPages/settings/ImageUploadField";
import LegalDocumentPanel from "@/components/adminPages/settings/LegalDocumentPanel";
import {
  FaqEditor,
  ServicesEditor,
  StatsEditor,
  type FaqItem,
  type ServiceItem,
  type StatItem,
} from "@/components/adminPages/settings/RepeatableEditors";
import {
  useGetAboutQuery,
  useGetAdminBankSettingsQuery,
  useGetPrivacyQuery,
  useGetTermsQuery,
  useUpdateAboutMutation,
  useUpdateBankSettingsMutation,
  useUpdatePrivacyMutation,
  useUpdateTermsMutation,
} from "@/redux/api/settingsApi";

type BankingForm = {
  currency: string;
  defaultOpeningBalance: number;
  defaultMinimumBalance: number;
  oneAccountPerUser: boolean;
  savingsAnnualInterestRatePercent: number;
  defaultLoanInterestRatePercent: number;
  maxOpenLoansPerUser: number;
  withdrawMaxPerMonth: number;
  withdrawMaxPerDay: number;
  checkingWithdrawDailyAmountLimit: number;
  businessWithdrawDailyAmountLimit: number;
  checkingTransferDailyAmountLimit: number;
  checkingTransferDailyCountLimit: number;
  businessTransferDailyAmountLimit: number;
  allowAdminDirectBalanceEdit: boolean;
};

type WebsiteForm = {
  brandName: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  deliveryTitle: string;
  deliveryBody: string;
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  supportHours: string;
};

const AdminSettingsPage = () => {
  const [tab, setTab] = useState<"banking" | "website" | "legal">("banking");
  const { data, isLoading } = useGetAdminBankSettingsQuery(undefined);
  const { data: privacyData } = useGetPrivacyQuery(undefined);
  const { data: termsData } = useGetTermsQuery(undefined);
  const { data: aboutData } = useGetAboutQuery(undefined);

  const [updateSettings, { isLoading: savingBank }] =
    useUpdateBankSettingsMutation();
  const [updatePrivacy, { isLoading: savingPrivacy }] =
    useUpdatePrivacyMutation();
  const [updateTerms, { isLoading: savingTerms }] = useUpdateTermsMutation();
  const [updateAbout, { isLoading: savingAbout }] = useUpdateAboutMutation();

  const settings = data?.data;
  const bankingForm = useForm<BankingForm>();
  const websiteForm = useForm<WebsiteForm>();

  const [heroStats, setHeroStats] = useState<StatItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [deliveryImage1, setDeliveryImage1] = useState("");
  const [deliveryImage2, setDeliveryImage2] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [privacyContent, setPrivacyContent] = useState("");
  const [termsContent, setTermsContent] = useState("");
  const [aboutContent, setAboutContent] = useState("");

  useEffect(() => {
    if (!settings) return;
    const website = settings.website || {};
    bankingForm.reset({
      currency: settings.currency,
      defaultOpeningBalance: settings.defaultOpeningBalance,
      defaultMinimumBalance: settings.defaultMinimumBalance,
      oneAccountPerUser: settings.oneAccountPerUser,
      savingsAnnualInterestRatePercent: Number(
        (settings.savingsAnnualInterestRate * 100).toFixed(2),
      ),
      defaultLoanInterestRatePercent: Number(
        (settings.defaultLoanInterestRate * 100).toFixed(2),
      ),
      maxOpenLoansPerUser: settings.maxOpenLoansPerUser,
      withdrawMaxPerMonth: settings.withdrawMaxPerMonth,
      withdrawMaxPerDay: settings.withdrawMaxPerDay,
      checkingWithdrawDailyAmountLimit:
        settings.checkingWithdrawDailyAmountLimit,
      businessWithdrawDailyAmountLimit:
        settings.businessWithdrawDailyAmountLimit,
      checkingTransferDailyAmountLimit:
        settings.checkingTransferDailyAmountLimit,
      checkingTransferDailyCountLimit: settings.checkingTransferDailyCountLimit,
      businessTransferDailyAmountLimit:
        settings.businessTransferDailyAmountLimit,
      allowAdminDirectBalanceEdit: settings.allowAdminDirectBalanceEdit,
    });
    websiteForm.reset({
      brandName: website.brandName || "EasyBank",
      heroEyebrow: website.heroEyebrow || "",
      heroTitleLine1: website.heroTitleLine1 || "",
      heroTitleLine2: website.heroTitleLine2 || "",
      heroSubtitle: website.heroSubtitle || "",
      heroPrimaryCta: website.heroPrimaryCta || "",
      heroSecondaryCta: website.heroSecondaryCta || "",
      deliveryTitle: website.deliveryTitle || "",
      deliveryBody: website.deliveryBody || "",
      contactTitle: website.contactTitle || "",
      contactSubtitle: website.contactSubtitle || "",
      contactEmail: website.contactEmail || "",
      contactPhone: website.contactPhone || "",
      contactAddress: website.contactAddress || "",
      supportHours: website.supportHours || "",
    });
    setHeroStats(website.heroStats || []);
    setFaqs(website.faqs || []);
    setServices(website.services || []);
    setDeliveryImage1(website.deliveryImage1 || "");
    setDeliveryImage2(website.deliveryImage2 || "");
    setHeroImage(website.heroImage || "");
    setBrandLogo(website.brandLogo || "");
  }, [settings, bankingForm, websiteForm]);

  useEffect(() => {
    setPrivacyContent(privacyData?.data?.description || "");
  }, [privacyData]);
  useEffect(() => {
    setTermsContent(termsData?.data?.description || "");
  }, [termsData]);
  useEffect(() => {
    setAboutContent(aboutData?.data?.description || "");
  }, [aboutData]);

  const saveBanking = bankingForm.handleSubmit(async (form) => {
    const res = await updateSettings({
      currency: form.currency,
      defaultOpeningBalance: Number(form.defaultOpeningBalance),
      defaultMinimumBalance: Number(form.defaultMinimumBalance),
      oneAccountPerUser: Boolean(form.oneAccountPerUser),
      savingsAnnualInterestRate:
        Number(form.savingsAnnualInterestRatePercent) / 100,
      defaultLoanInterestRate:
        Number(form.defaultLoanInterestRatePercent) / 100,
      maxOpenLoansPerUser: Number(form.maxOpenLoansPerUser),
      withdrawMaxPerMonth: Number(form.withdrawMaxPerMonth),
      withdrawMaxPerDay: Number(form.withdrawMaxPerDay),
      checkingWithdrawDailyAmountLimit: Number(
        form.checkingWithdrawDailyAmountLimit,
      ),
      businessWithdrawDailyAmountLimit: Number(
        form.businessWithdrawDailyAmountLimit,
      ),
      checkingTransferDailyAmountLimit: Number(
        form.checkingTransferDailyAmountLimit,
      ),
      checkingTransferDailyCountLimit: Number(
        form.checkingTransferDailyCountLimit,
      ),
      businessTransferDailyAmountLimit: Number(
        form.businessTransferDailyAmountLimit,
      ),
      allowAdminDirectBalanceEdit: Boolean(form.allowAdminDirectBalanceEdit),
    });
    if (res?.data?.success) toast.success("Banking rules saved");
    else toast.error("Failed to save banking rules");
  });

  const saveWebsite = websiteForm.handleSubmit(async (form) => {
    const res = await updateSettings({
      website: {
        ...form,
        heroStats,
        faqs,
        services,
        deliveryImage1,
        deliveryImage2,
        heroImage,
        brandLogo,
      },
    });
    if (res?.data?.success) toast.success("Website content saved");
    else toast.error("Failed to save website content");
  });

  const saveLegal = async () => {
    try {
      await Promise.all([
        updatePrivacy({ description: privacyContent }),
        updateTerms({ description: termsContent }),
        updateAbout({ description: aboutContent }),
      ]);
      toast.success("Legal pages saved");
    } catch {
      toast.error("Failed to save legal pages");
    }
  };

  if (isLoading) return <Loading />;

  const saving =
    savingBank || savingPrivacy || savingTerms || savingAbout;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 pb-10 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#104042] text-white">
          <Settings2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#104042]">
            Platform settings
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Human-friendly editors for banking rules, website copy/images, and
            legal pages — no JSON editing required.
          </p>
        </div>
      </div>

      <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        {(
          [
            ["banking", "Banking rules"],
            ["website", "Website content"],
            ["legal", "Privacy & legal"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
              tab === id
                ? "bg-[#104042] text-white"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "banking" && (
        <form onSubmit={saveBanking} className="space-y-6">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Accounts
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Currency">
                <Input {...bankingForm.register("currency")} />
              </Field>
              <Field label="Opening balance">
                <Input
                  type="number"
                  {...bankingForm.register("defaultOpeningBalance", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Default minimum balance">
                <Input
                  type="number"
                  {...bankingForm.register("defaultMinimumBalance", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <label className="flex items-center gap-2 pt-7 text-sm">
                <input
                  type="checkbox"
                  {...bankingForm.register("oneAccountPerUser")}
                />
                One account per user
              </label>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Interest & loans
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field label="Savings annual interest (%)">
                <Input
                  type="number"
                  step="0.01"
                  {...bankingForm.register("savingsAnnualInterestRatePercent", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Default loan interest (%)">
                <Input
                  type="number"
                  step="0.01"
                  {...bankingForm.register("defaultLoanInterestRatePercent", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Max open loans / user">
                <Input
                  type="number"
                  {...bankingForm.register("maxOpenLoansPerUser", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Withdraw & transfer limits
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Max withdrawals / month">
                <Input
                  type="number"
                  {...bankingForm.register("withdrawMaxPerMonth", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Max withdrawals / day">
                <Input
                  type="number"
                  {...bankingForm.register("withdrawMaxPerDay", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Checking withdraw daily amount">
                <Input
                  type="number"
                  {...bankingForm.register("checkingWithdrawDailyAmountLimit", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Business withdraw daily amount">
                <Input
                  type="number"
                  {...bankingForm.register("businessWithdrawDailyAmountLimit", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Checking transfer daily amount">
                <Input
                  type="number"
                  {...bankingForm.register("checkingTransferDailyAmountLimit", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Checking transfer daily count">
                <Input
                  type="number"
                  {...bankingForm.register("checkingTransferDailyCountLimit", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
              <Field label="Business transfer daily amount">
                <Input
                  type="number"
                  {...bankingForm.register("businessTransferDailyAmountLimit", {
                    valueAsNumber: true,
                  })}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <label className="flex items-start gap-2 text-sm text-amber-950">
              <input
                type="checkbox"
                className="mt-1"
                {...bankingForm.register("allowAdminDirectBalanceEdit")}
              />
              Allow admins to directly edit account balances
            </label>
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#104042] text-white hover:bg-[#0c3334]"
            >
              {savingBank ? "Saving..." : "Save banking rules"}
            </Button>
          </div>
        </form>
      )}

      {tab === "website" && (
        <form onSubmit={saveWebsite} className="space-y-6">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Brand & hero
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Brand name">
                <Input {...websiteForm.register("brandName")} />
              </Field>
              <Field label="Eyebrow">
                <Input {...websiteForm.register("heroEyebrow")} />
              </Field>
              <Field label="Title line 1">
                <Input {...websiteForm.register("heroTitleLine1")} />
              </Field>
              <Field label="Title line 2">
                <Input {...websiteForm.register("heroTitleLine2")} />
              </Field>
              <Field label="Primary CTA">
                <Input {...websiteForm.register("heroPrimaryCta")} />
              </Field>
              <Field label="Secondary CTA">
                <Input {...websiteForm.register("heroSecondaryCta")} />
              </Field>
            </div>
            <Field label="Hero subtitle">
              <Textarea rows={3} {...websiteForm.register("heroSubtitle")} />
            </Field>
            <StatsEditor items={heroStats} onChange={setHeroStats} />
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Website images (Cloudinary)
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <ImageUploadField
                label="Brand logo"
                value={brandLogo}
                onChange={setBrandLogo}
                hint="Used across brand placements"
              />
              <ImageUploadField
                label="Hero image"
                value={heroImage}
                onChange={setHeroImage}
                hint="Optional hero visual"
              />
              <ImageUploadField
                label="Delivery image 1"
                value={deliveryImage1}
                onChange={setDeliveryImage1}
              />
              <ImageUploadField
                label="Delivery image 2"
                value={deliveryImage2}
                onChange={setDeliveryImage2}
              />
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Delivery & contact
            </h2>
            <Field label="Delivery title">
              <Input {...websiteForm.register("deliveryTitle")} />
            </Field>
            <Field label="Delivery body">
              <Textarea rows={4} {...websiteForm.register("deliveryBody")} />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Contact title">
                <Input {...websiteForm.register("contactTitle")} />
              </Field>
              <Field label="Support hours">
                <Input {...websiteForm.register("supportHours")} />
              </Field>
              <Field label="Email">
                <Input {...websiteForm.register("contactEmail")} />
              </Field>
              <Field label="Phone">
                <Input {...websiteForm.register("contactPhone")} />
              </Field>
            </div>
            <Field label="Contact subtitle">
              <Input {...websiteForm.register("contactSubtitle")} />
            </Field>
            <Field label="Address">
              <Input {...websiteForm.register("contactAddress")} />
            </Field>
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <FaqEditor items={faqs} onChange={setFaqs} />
          </section>

          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <ServicesEditor items={services} onChange={setServices} />
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#104042] text-white hover:bg-[#0c3334]"
            >
              {savingBank ? "Saving..." : "Save website content"}
            </Button>
          </div>
        </form>
      )}

      {tab === "legal" && (
        <div className="space-y-6">
          <LegalDocumentPanel
            label="Privacy Policy"
            description="Shown on /privacy. Preview first, then edit with the rich editor."
            value={privacyContent}
            onChange={setPrivacyContent}
          />
          <LegalDocumentPanel
            label="Terms of Service"
            description="Shown on /terms. Preview first, then edit with the rich editor."
            value={termsContent}
            onChange={setTermsContent}
          />
          <LegalDocumentPanel
            label="About Us"
            description="Shown on /about. Preview first, then edit with the rich editor."
            value={aboutContent}
            onChange={setAboutContent}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              disabled={saving}
              onClick={saveLegal}
              className="bg-[#104042] text-white hover:bg-[#0c3334]"
            >
              {savingPrivacy || savingTerms || savingAbout
                ? "Saving..."
                : "Save legal pages"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <Label className="text-slate-700">{label}</Label>
    {children}
  </div>
);

export default AdminSettingsPage;
