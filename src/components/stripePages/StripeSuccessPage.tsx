"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { JwtPayload } from "@/types/common.type";
import { getUser } from "@/services/authServices";
import Link from "next/link";
import { Button } from "../ui/button";
import { getMyAccountPath } from "@/utils/rolePaths";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StripeSuccessPage = ({ data }: { data: any }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const user = useMemo(() => getUser() as JwtPayload, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardContent className="p-8 text-center">
          {/* Animated Success Icon */}
          <div className="mb-6 flex justify-center">
            <div
              className={`relative transition-all duration-1000 ease-out ${
                showAnimation
                  ? "scale-100 opacity-100 rotate-0"
                  : "scale-0 opacity-0 rotate-180"
              }`}
            >
              <div className="absolute inset-0 bg-[#104042] rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-[#104042] rounded-full p-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#104042] mb-2">
              {data?.data?.status === "completed"
                ? `${data?.data?.transactionType || "Payment"} Successful`
                : "Payment Received"}
            </h1>
            <p className="text-gray-600 text-lg">
              {data?.data?.status === "completed"
                ? "Your payment has been applied to your account."
                : "Stripe payment received. Balance will update once the webhook confirms (usually a few seconds). Refresh your account if needed."}
            </p>
            {data?.data?.status && (
              <p className="text-sm text-gray-500 mt-2 capitalize">
                Status: {data.data.status}
              </p>
            )}
          </div>

          {/* Action Message */}
          <div className="text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              You can download the{" "}
              <span className="text-black font-bold">Transaction Reciept</span>{" "}
              from your transaction list. Stay with EasyBank ! Thank you
            </p>
          </div>

          <Button className="text-center mt-5">
            <Link href={getMyAccountPath(user?.role)}>
              Go to Your Account section
            </Link>
          </Button>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#104042] to-[#1a6b6e]"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeSuccessPage;
