/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DepositBalance from "@/components/customerPages/DepositBalance";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const DepositBalancePage = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !user,
  });
  //   console.log(myAccount);

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <DepositBalance user={user} myAccount={myAccount} />
    </div>
  );
};

export default DepositBalancePage;
