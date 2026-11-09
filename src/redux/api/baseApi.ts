import { envConfig } from "@/config/envConfig";
import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [
    "auth",
    "admin",
    "user",
    "branch",
    "account",
    "transaction",
    "stripe",
    "loan",
    "types",
    "stats",
    "settings",
    "notification",
    "support",
  ],
  baseQuery: axiosBaseQuery({
    baseUrl: envConfig.baseApi as string,
  }),
  endpoints: () => ({}),
});
