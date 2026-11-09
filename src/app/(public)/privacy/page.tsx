"use client";

import LegalPage from "@/components/legal/LegalPage";
import { useGetPrivacyQuery } from "@/redux/api/settingsApi";

const PrivacyPage = () => {
  const { data, isLoading } = useGetPrivacyQuery(undefined);
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How EasyBank collects, uses, and protects your personal and financial information."
      html={data?.data?.description}
      isLoading={isLoading}
    />
  );
};

export default PrivacyPage;
