import { decodeToken } from "./decodeToken";
import { JwtPayload } from "@/types/common.type";

export const getCookieToken = (token: string) => {
  if (token) {
    const decoded = decodeToken(token) as JwtPayload;
    return decoded;
  }
};

// export const getToken = async (key: string) => {
//   const cookie = await cookies();
//   const token = cookie.get(key)?.value as string;
//   if (token) {
//     return token;
//   }
// };
