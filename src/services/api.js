import axios from "axios";
import Constants from "expo-constants";
// import { getToken } from "./auth";

const api = axios.create({
  baseURL: Constants.manifest.extra.SERVER_URL + "/api",
});

// api.interceptors.request.use(async (config) => {
//   //   const token = getToken();
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiaWQiOiI2MGFjMDdjZGM1YWVmMjRkZGY5YmJkNmIifSwiaWF0IjoxNjIyMDU2NjQxfQ.YR_5QYJfYQPKnPEo5CHe_ezi0NwjWu17reJgBgUp0YY";
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
