"use client";
import { Button } from "@/components/ui/button";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import EBForm from "@/shared/form/EBForm";
import EBInput from "@/shared/form/EBInput";
import { MailIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";
import AuthLoading from "@/shared/loader/AuthLoading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await forgetPassword({ email: data.email });
      if (res?.data.success) {
        toast.success("Reset link sent to your email!", { duration: 3000 });
        router.push("/");
      } else {
        toast.error("❌ Failed to send reset link", { duration: 3000 });
      }
    } catch (err) {
      console.error("❌ Failed to send reset link", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#104042" }}
        >
          Forgot Your Password?
        </h1>
        <EBForm onSubmit={onSubmit}>
          <div className="space-y-4">
            <EBInput
              name="email"
              label="Your Account Email"
              type="email"
              placeholder="Enter your email"
              icon={<MailIcon />}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#104042] text-white hover:bg-[#0d3436]"
            >
              {isLoading ? <AuthLoading /> : "Send Reset Link"}
            </Button>
          </div>
        </EBForm>
      </div>
    </div>
  );
};

export default ForgetPassword;
