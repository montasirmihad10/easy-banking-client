"use client";
import MyLoan from "@/components/customerPages/MyLoan";
import RequestLoan from "@/components/customerPages/RequestLoan";
import { useGetMyAccountQuery } from "@/redux/api/accountApi";
import { useGetMyLoanQuery } from "@/redux/api/loanApi";
import { getUser } from "@/services/authServices";
import Loading from "@/shared/loading/Loading";
import { JwtPayload } from "@/types/common.type";
import { useEffect, useState } from "react";

const ManagerMyLoanPage = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  useEffect(() => {
    setUser(getUser() as JwtPayload);
  }, []);

  const { data: myAccount, isLoading: accountLoading } = useGetMyAccountQuery(
    undefined,
    {
      skip: !user,
    }
  );
  const { data: myLoan, isLoading: loanLoading } = useGetMyLoanQuery(
    undefined,
    {
      skip: accountLoading || !myAccount,
    }
  );

  if (loanLoading || accountLoading) {
    return <Loading />;
  }

  return (
    <div>
      {myLoan ? (
        <MyLoan myLoan={myLoan} />
      ) : (
        <RequestLoan myAccount={myAccount} />
      )}
    </div>
  );
};

export default ManagerMyLoanPage;
