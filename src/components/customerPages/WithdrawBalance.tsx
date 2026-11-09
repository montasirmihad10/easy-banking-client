"use client";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import type { FieldValues } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  DollarSign,
  FileText,
  CreditCard,
  Wallet,
} from "lucide-react";
import { useWithdrawBalanceMutation } from "@/redux/api/transactionApi";
import { TGlobalResponse } from "@/types/global.type";
import { toast } from "sonner";
import AuthLoading from "@/shared/loader/AuthLoading";
import { JwtPayload } from "@/types/common.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/shared/loading/Loading";
import { getMyAccountPath } from "@/utils/rolePaths";

const WithdrawBalance = ({
  myAccount,
  user,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myAccount: any;
  user: JwtPayload;
}) => {
  const router = useRouter();
  const { accountNumber, balance } = myAccount?.data ?? {};
  const [withdrawBalance, { isLoading }] = useWithdrawBalanceMutation();

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
      const withdrawData = {
        ...data,
        amount: Number(data?.amount),
      };
      console.log(withdrawData);
      const res = (await withdrawBalance(withdrawData)) as TGlobalResponse;
      if (res?.data?.success) {
        toast.success(
          res?.data?.message ||
            "Withdrawal submitted. Waiting for admin/manager approval.",
          { duration: 4000 },
        );
      } else {
        toast.error(res?.error?.data?.message || "Balance Withdraw failed", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="rounded-xl border border-amber-200 bg-amber-50">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Available balance: ৳{Number(balance || 0).toLocaleString()}
                </p>
                <p className="text-xs text-amber-700">
                  Keep your minimum balance. Requests are reviewed before release.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg text-[#104042]">
              Withdrawal details
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8">
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
                    className="border-none transition-colors bg-white"
                    defaultValue={accountNumber}
                    readOnly={true}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Transaction Type
                    </span>
                  </div>
                  <EBInput
                    label="Transaction Type"
                    name="transactionType"
                    readOnly={true}
                    type="text"
                    defaultValue="withdraw"
                    className="border-none bg-slate-50"
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Withdrawal Amount
                    </span>
                  </div>
                  <EBInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="1000"
                    className="bg-white border-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-[#104042]" />
                    <span className="text-sm  text-[#104042]">
                      Withdrawal Purpose
                    </span>
                  </div>
                  <EBInput
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Rent payment"
                    className="bg-white border-none focus:border-[#104042] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-7 flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#104042] to-[#1a5a5d] text-white px-8 py-2 rounded-lg font-semibold text-lg hover:from-[#0d3537] hover:to-[#164d50] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {isLoading ? <AuthLoading /> : "Process Withdrawal"}
                </button>
              </div>
            </EBForm>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-slate-500 text-sm space-y-1">
          <p>🔒 Your transaction is secured with bank-level encryption</p>
          <p className="text-xs text-red-500">
            ⚠️ Please ensure you have sufficient funds before processing
            withdrawal
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawBalance;
