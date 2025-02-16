// import { HOST } from "@/utils/constants.js";
// import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: HOST,
// });

import axios from "axios";
import Cookies from "js-cookie";
import { HOST } from "@/utils/constants.js";

export const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access-token");

    if (
      token &&
      !config.url.includes("/login") &&
      !config.url.includes("/signup")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
