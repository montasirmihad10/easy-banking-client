import FeatureBanner from "@/components/featurePages/FeatureBanner";
import AccountTypes from "@/components/featurePages/AccountTypes";
import TransactionFeature from "@/components/featurePages/TransactionFeature";

const page = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50 overflow-x-hidden overflow-y-hidden">
      <FeatureBanner />
      <AccountTypes />
      <TransactionFeature />
    </div>
  );
};

export default page;
