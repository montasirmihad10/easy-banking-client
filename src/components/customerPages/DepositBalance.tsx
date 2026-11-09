"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import type { FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, FileText, CreditCard } from "lucide-react";
import { useDepositBalanceMutation } from "@/redux/api/transactionApi";
import { toast } from "sonner";
import { TGlobalResponse } from "@/types/global.type";
import AuthLoading from "@/shared/loader/AuthLoading";
import { JwtPayload } from "@/types/common.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/shared/loading/Loading";
import { getMyAccountPath } from "@/utils/rolePaths";

const DepositBalance = ({
  myAccount,
  user,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myAccount: any;
  user: JwtPayload;
}) => {
  const router = useRouter();
  const { accountNumber } = myAccount?.data ?? {};
  const [depositBalance, { isLoading }] = useDepositBalanceMutation();
  const shouldRedirect = !myAccount?.data || !accountNumber;

  useEffect(() => {
    if (shouldRedirect) {
      router.push(getMyAccountPath(user?.role));
    }
  }, [shouldRedirect, router, user?.role]);

  if (shouldRedirect) {
    return <Loading />; // or a loading spinner if needed
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      const depositData = {
        ...data,
        amount: Number(data?.amount),
      };
      const res = (await depositBalance(depositData)) as TGlobalResponse;
      console.log(res.data.data);
      if (res?.data?.success) {
        // toast.success("Balance Deposit successfull", { duration: 3000 });
        if (res.data?.data?.startsWith("http")) {
          window.location.href = res?.data?.data;
        }
      } else {
        toast.error(res?.error?.data?.message || "Balance Deposit failed", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 sm:p-2">
      <div className="mx-auto max-w-4xl space-y-5">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg text-[#104042]">
              Deposit details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 sm:px-8">
            <EBForm onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Account Information
                    </span>
                  </div>
                  <EBInput
                    label="Account Number"
                    name="account"
                    type="text"
                    className="border-none focus transition-colors bg-white"
                    defaultValue={accountNumber}
                    readOnly={true}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Transaction Type
                    </span>
                  </div>
                  <EBInput
                    label="Transaction Type"
                    name="transactionType"
                    readOnly={true}
                    type="text"
                    defaultValue="deposit"
                    className="border-none  bg-slate-50"
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Deposit Amount
                    </span>
                  </div>
                  <EBInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="2000"
                    className="border-none bg-white  focus transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Transaction Details
                    </span>
                  </div>
                  <EBInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Deposit summery"
                    className="border-none bg-white  focus transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white px-8 py-2 rounded-lg  text-lg hover:from-[#0d3537] hover:to-[#164d50] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {isLoading ? <AuthLoading /> : "Complete Deposit"}
                </button>
              </div>
            </EBForm>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm">
          <p>🔒 Your transaction is secured with bank-level encryption</p>
        </div>
      </div>
    </div>
  );
};

export default DepositBalance;
