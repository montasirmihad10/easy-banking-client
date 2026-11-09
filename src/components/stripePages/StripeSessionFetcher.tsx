"use client";
import { useGetStripeTransactionQuery } from "@/redux/api/multipleApi";
import Loading from "@/shared/loading/Loading";
import { useSearchParams } from "next/navigation";
import StripeSuccessPage from "./StripeSuccessPage";

const StripeSessionFetcher = () => {
  const params = useSearchParams();
  const id = params?.get("session_id");

  const { data: stripeTransaction, isLoading } = useGetStripeTransactionQuery(
    id,
    {
      skip: !id,
    }
  );

  if (isLoading || !id) {
    return <Loading />;
  }

  return <StripeSuccessPage data={stripeTransaction} />;
};

export default StripeSessionFetcher;
