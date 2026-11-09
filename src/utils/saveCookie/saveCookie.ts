"use server";
import { cookies } from "next/headers";

export const saveCookie = async (accessToken: string, refreshToken: string) => {
  if (accessToken && refreshToken) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 8,
    });
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 35,
    });
  }
};

export const saveNewCookieAccessToken = async (accessToken: string) => {
  if (accessToken) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 8,
    });
  }
};

export const getToken = async (key: string) => {
  const cookie = await cookies();
  const token = cookie.get(key)?.value as string;
  if (token) {
    return token;
  }
};
