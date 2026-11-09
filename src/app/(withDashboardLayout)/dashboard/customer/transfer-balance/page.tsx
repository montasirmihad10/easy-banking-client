"use client";
import TransferBalance from "@/components/customerPages/TransferBalance";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const TransferBalancePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <TransferBalance user={user} myAccount={myAccount} />
    </div>
  );
};

export default TransferBalancePage;
