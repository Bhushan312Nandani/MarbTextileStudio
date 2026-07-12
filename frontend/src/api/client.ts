import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Matches backend/.env.example PORT=5000 and the /api/v1 prefix in backend/src/app.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the access token (once auth.middleware.js / auth.service.js are implemented)
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
