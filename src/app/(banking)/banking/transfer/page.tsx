"use client";
import BankingFlowHeader from "@/components/banking/BankingFlowHeader";
import TransferBalance from "@/components/customerPages/TransferBalance";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const BankingTransferPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !user,
  });

  if (!user || isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <BankingFlowHeader
        title="Transfer money"
        subtitle="Send money instantly to another EasyBank account number."
        steps={[
          { label: "Recipient + amount", current: true },
          { label: "Confirm transfer" },
          { label: "Instant ledger update" },
        ]}
      />
      <TransferBalance user={user} myAccount={myAccount} />
    </div>
  );
};

export default BankingTransferPage;
