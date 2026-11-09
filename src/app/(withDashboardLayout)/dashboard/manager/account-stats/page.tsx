/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AccountStats from "@/components/multiplePages/AccountStats";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { useGetAccountStatsQuery } from "@/redux/api/multipleApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import React, { useEffect, useState } from "react";

const ManagerAccountStatPage = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !user,
  });
  const { data: accountStats, isLoading: statisLoading } =
    useGetAccountStatsQuery(undefined, { skip: isLoading });
  const accountStat = accountStats?.data?.[0];

  if (statisLoading) {
    return <Loading />;
  }
  if (!myAccount) {
    return (
      <div>
        <p>You do not have an account!</p>
      </div>
    );
  }

  return (
    <div>
      <AccountStats accountStat={accountStat} />
    </div>
  );
};

export default ManagerAccountStatPage;
