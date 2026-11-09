"use server";
import { cookies } from "next/headers";

export const removeCookie = async (key1: string, key2: string) => {
  const cookie = await cookies();
  cookie.delete(key1);
  cookie.delete(key2);
};
