/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BankingFlowHeader from "@/components/banking/BankingFlowHeader";
import DepositBalance from "@/components/customerPages/DepositBalance";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const BankingDepositPage = () => {
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
        title="Deposit money"
        subtitle="Add funds with card. Your balance updates after payment confirmation."
        steps={[
          { label: "Enter amount", current: true },
          { label: "Pay securely" },
          { label: "Balance updated" },
        ]}
      />
      <DepositBalance user={user} myAccount={myAccount} />
    </div>
  );
};

export default BankingDepositPage;
