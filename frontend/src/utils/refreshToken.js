import mem from "mem";
import { axiosPublic } from "./axiosPublic";
import { apiRoutes } from "../types/api-routes";

const refreshTokenFn = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));

  try {
    const response = await axiosPublic.post(apiRoutes.REFRESH_TOKEN, {
      refresh: refreshToken,
    });


    if (!response.data?.access) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    localStorage.setItem("access_token", response.data.access);

    return response?.data;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

const maxAge = 50000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});