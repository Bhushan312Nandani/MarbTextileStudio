import { apiClient } from "./client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Matches backend/src/services/public/auth.service.js once implemented
export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post("/public/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post("/public/auth/register", payload);
  return data;
}
