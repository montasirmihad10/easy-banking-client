"use client";
import { useRouter, useSearchParams } from "next/navigation";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { KeySquare } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AuthLoading from "@/shared/loader/AuthLoading";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { envConfig } from "@/config/envConfig";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const token = searchParams?.get("token");

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const dataInfo = {
        email: email,
        newPassword: data.newPassword,
      };
      const res = await axiosInstance({
        url: `${envConfig.baseApi}/auth/reset-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // ✅ Fixed format
        },
        withCredentials: true,
        data: dataInfo, // ✅ Removed nested object
      });
      console.log(res);
      if (res?.data.success) {
        toast.success("Password reset successfull ✅", { duration: 3000 });
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#104042" }}
        >
          Reset Your Password
        </h1>
        <EBForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <EBInput
              label="Enter Your New Password"
              name="newPassword"
              type="password"
              placeholder="Enter Your New Password"
              icon={<KeySquare />}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#104042] text-white hover:bg-[#0d3436]"
            >
              {loading ? <AuthLoading /> : "Submit"}
            </Button>
          </div>
        </EBForm>
      </div>
    </div>
  );
}
