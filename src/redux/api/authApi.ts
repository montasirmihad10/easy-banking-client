import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    signupUser: build.mutation({
      query: (data) => ({
        url: "/users/create-customer",
        method: "POST",
        contentType: "multipart/formdata",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/users/verify-otp",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
} = authApi;
