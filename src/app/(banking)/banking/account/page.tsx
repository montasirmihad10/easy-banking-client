"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import BankingFlowHeader from "@/components/banking/BankingFlowHeader";
import CreateAccount from "@/components/adminPages/CreateAccount";
import MyAccount from "@/components/adminPages/MyAccount";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const BankingAccountPage = () => {
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

  const status = myAccount?.data?.status;
  const isActive = status === "active";

  return (
    <div>
      <BankingFlowHeader
        title={isActive ? "Account details" : "Account setup"}
        subtitle={
          isActive
            ? "Your profile, account number, branch, and balances."
            : "Complete account setup, then wait for branch approval before banking."
        }
        steps={
          isActive
            ? [
                { label: "Submitted", done: true },
                { label: "Approved", done: true },
                { label: "Active", current: true },
              ]
            : status === "pending"
              ? [
                  { label: "Submitted", done: true },
                  { label: "Under review", current: true },
                  { label: "Active" },
                ]
              : [
                  { label: "Submit details", current: true },
                  { label: "Branch review" },
                  { label: "Start banking" },
                ]
        }
      />

      {status === "closed" || status === "suspended" ? (
        <div className="pb-12">
          <h1 className="mb-4 text-center text-base font-medium text-red-500">
            Your previous account has been closed or suspended. You can request
            a new one below.
          </h1>
          <CreateAccount />
        </div>
      ) : status === "pending" ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-xl font-medium text-amber-800">
            Your account request is pending
          </p>
          <p className="mt-1 text-base text-amber-700">
            Please wait until a manager or admin approves it.
          </p>
        </div>
      ) : isActive ? (
        <MyAccount user={user} myAccount={myAccount} />
      ) : (
        <CreateAccount />
      )}
    </div>
  );
};

export default BankingAccountPage;
