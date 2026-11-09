import { IMeta } from "@/types/common.type";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    unknown
  > =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ url, method, data, params, headers, contentType, responseType }) => {
    try {
      const isFormData =
        typeof FormData !== "undefined" && data instanceof FormData;
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        responseType,
        headers: {
          ...(isFormData
            ? {}
            : { "Content-Type": contentType || "application/json" }),
          ...headers,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      // console.log(err.response);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
