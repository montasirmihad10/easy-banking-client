import axios from "axios";
import { envConfig } from "@/config/envConfig";

export const axiosUrl = axios.create({
  baseURL: envConfig.baseApi,
});
