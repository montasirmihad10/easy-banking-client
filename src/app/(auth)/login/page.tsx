import Loading from "@/shared/loading/Loading";
import Login from "@/shared/Login";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    </div>
  );
};

export default LoginPage;
