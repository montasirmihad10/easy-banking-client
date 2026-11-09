"use client";

import LegalPage from "@/components/legal/LegalPage";
import { useGetTermsQuery } from "@/redux/api/settingsApi";

const TermsPage = () => {
  const { data, isLoading } = useGetTermsQuery(undefined);
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The rules for using EasyBank’s website, customer banking, and staff tools."
      html={data?.data?.description}
      isLoading={isLoading}
    />
  );
};

export default TermsPage;
