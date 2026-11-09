import StripeSessionFetcher from "@/components/stripePages/StripeSessionFetcher";
import Loading from "@/shared/loading/Loading";
import { Suspense } from "react";

const CustomerStripeSuccessPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <StripeSessionFetcher />
      </Suspense>
    </div>
  );
};

export default CustomerStripeSuccessPage;
