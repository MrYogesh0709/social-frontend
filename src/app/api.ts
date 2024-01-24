import axios, { AxiosError } from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  // baseURL: "https://social-3k7h.onrender.com/api/v1",
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const responseError = error.response.data;
      return Promise.reject(responseError || "An unknown error occurred");
    } else {
      return Promise.reject("An unknown error occurred");
    }
  }
);

export default api;
