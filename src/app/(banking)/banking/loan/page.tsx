"use client";
import BankingFlowHeader from "@/components/banking/BankingFlowHeader";
import MyLoan from "@/components/customerPages/MyLoan";
import RequestLoan from "@/components/customerPages/RequestLoan";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { useGetMyLoanQuery } from "@/redux/api/loanApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const BankingLoanPage = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const { data: myAccount, isLoading: accountLoading } = useGetMyAccountQuery(
    undefined,
    {
      skip: !user,
    },
  );

  const { data: myLoan, isLoading: loanLoading } = useGetMyLoanQuery(
    undefined,
    {
      skip: accountLoading || !myAccount,
    },
  );

  if (loanLoading || accountLoading) {
    return <Loading />;
  }

  const hasActiveLoan =
    !!myLoan && myLoan?.data?.status !== "rejected";

  return (
    <div>
      <BankingFlowHeader
        title={hasActiveLoan ? "Your loan" : "Apply for a loan"}
        subtitle={
          hasActiveLoan
            ? "Track status, schedule, and repayments in one place."
            : "Submit a loan request for branch review. Approval unlocks disbursement."
        }
        steps={
          hasActiveLoan
            ? [
                { label: "Requested", done: true },
                {
                  label: "Review / active",
                  current: ["pending", "active"].includes(
                    myLoan?.data?.status || "",
                  ),
                },
                { label: "Repay" },
              ]
            : [
                { label: "Request", current: true },
                { label: "Branch approval" },
                { label: "Disburse & repay" },
              ]
        }
      />
      {!myLoan || myLoan?.data?.status === "rejected" ? (
        <RequestLoan myAccount={myAccount} />
      ) : (
        <MyLoan myLoan={myLoan} />
      )}
    </div>
  );
};

export default BankingLoanPage;
