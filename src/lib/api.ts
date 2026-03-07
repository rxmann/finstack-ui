import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1"
    : "/api/v1";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

