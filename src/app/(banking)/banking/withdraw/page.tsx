"use client";
import BankingFlowHeader from "@/components/banking/BankingFlowHeader";
import WithdrawBalance from "@/components/customerPages/WithdrawBalance";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const BankingWithdrawPage = () => {
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
        title="Withdraw money"
        subtitle="Submit a withdrawal request. Funds are held until a manager or admin reviews it."
        steps={[
          { label: "Request amount", current: true },
          { label: "Branch review" },
          { label: "Completed or rejected" },
        ]}
      />
      <WithdrawBalance user={user} myAccount={myAccount} />
    </div>
  );
};

export default BankingWithdrawPage;
