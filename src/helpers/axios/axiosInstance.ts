/* eslint-disable @typescript-eslint/no-explicit-any */
import { getNewAccessToken } from "@/services/authServices";
import { TResponse } from "@/types/common.type";
import { removeCookie } from "@/utils/deleteCookie";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { saveNewCookieAccessToken } from "@/utils/saveCookie/saveCookie";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  function (response) {
    const responseObject: TResponse = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    // console.log(response);
    return responseObject;
  },
  async function (error) {
    // console.log(error);
    const config = error?.config;
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      try {
        const response = await getNewAccessToken();
        // console.log(response);
        const accessToken = response?.data?.data?.accessToken;
        // console.log(accessToken);
        if (accessToken) {
          config.headers["Authorization"] = accessToken;
          setToLocalStorage("accessToken", accessToken);
          await saveNewCookieAccessToken(accessToken);
          return axiosInstance(config);
        }
      } catch (error: any) {
        console.log("refresh token expired", error);
        if (error?.response?.status === 500) {
          removeFromLocalStorage("accessToken");
          await removeCookie("accessToken", "refreshToken");
          window.location.href = "/login?session=expired";
        }
      }
    } else {
      const responseError = {
        statusCode: error?.response?.data?.statusCode,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages: error?.response?.data?.message,
      };
      // console.log(responseError);
      // return responseError;
      return Promise.reject({
        response: {
          status: error?.response?.status,
          data: responseError,
        },
      });
    }
  }
);

export { axiosInstance };
