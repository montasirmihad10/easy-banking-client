"use client";

import LegalPage from "@/components/legal/LegalPage";
import { useGetAboutQuery } from "@/redux/api/settingsApi";

const AboutPage = () => {
  const { data, isLoading } = useGetAboutQuery(undefined);
  return (
    <LegalPage
      title="About EasyBank"
      subtitle="A modern digital banking platform for customers, managers, and administrators."
      html={data?.data?.description}
      isLoading={isLoading}
    />
  );
};

export default AboutPage;
