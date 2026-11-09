"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateAccount from "@/components/adminPages/CreateAccount";
import MyAccount from "@/components/adminPages/MyAccount";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import React, { useEffect, useState } from "react";

const CustomerAccountPage = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);
  const { data: myAccount, isLoading } = useGetMyAccountQuery(undefined, {
    skip: !user,
  });
  // console.log(myAccount);

  if (!user || isLoading) {
    return <Loading />;
  }

  if (myAccount && myAccount?.data?.status === "closed") {
    return (
      <div className="pb-12">
        <h1 className="text-center text-base text-red-500 font-medium">
          Your previous account has been closed or suspended! Try again...
        </h1>
        <CreateAccount />
      </div>
    );
  }
  if (myAccount && myAccount?.data?.status === "suspended") {
    return (
      <div className="pb-12">
        <h1 className="text-center text-base text-red-500 font-medium">
          Your previous account has been closed or suspended! Try again...
        </h1>
        <CreateAccount />
      </div>
    );
  }
  if (myAccount && myAccount?.data?.status === "pending") {
    return (
      <div className="text-center">
        <p className="text-red-500 text-xl font-medium">
          Your account request is in pending
        </p>
        <p className="text-red-500 text-base">Please wait until it approved!</p>
      </div>
    );
  }

  return (
    <div>
      {myAccount && myAccount?.data?.status === "active" ? (
        <MyAccount user={user} myAccount={myAccount} />
      ) : (
        <CreateAccount></CreateAccount>
      )}
    </div>
  );
};

export default CustomerAccountPage;
