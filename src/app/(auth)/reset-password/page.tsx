import ResetPassword from "@/components/multiplePages/ResetPassword";
import Loading from "@/shared/loading/Loading";
import React, { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
