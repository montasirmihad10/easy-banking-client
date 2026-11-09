import { envConfig } from "@/config/envConfig";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/decodeToken";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getToken } from "@/utils/saveCookie/saveCookie";

export const getUser = () => {
  const accessToken = getFromLocalStorage("accessToken");
  if (accessToken) {
    const decoded = decodeToken(accessToken);
    return decoded;
  }
};

export const getNewAccessToken = async () => {
  const refreshToken = await getToken("refreshToken");
  // console.log(refreshToken);
  return await axiosInstance({
    url: `${envConfig.baseApi}/auth/refresh-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: { refreshToken },
  });
};
