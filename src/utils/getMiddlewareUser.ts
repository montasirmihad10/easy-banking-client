import { envConfig } from "@/config/envConfig";

export const getUserById = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${envConfig.baseApi}/users/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
