import { apiClient } from "./client";
import type { AuthUser } from "../store/useAuthStore";

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

export interface AuthResponse {
  success: boolean;
  message?: string;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/public/auth/login", payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post("/public/auth/register", payload);
  return data;
}

export async function logout(refreshToken?: string) {
  const { data } = await apiClient.post("/public/auth/logout", { refreshToken });
  return data;
}

export async function getProfile() {
  const { data } = await apiClient.get<{ success: boolean; data: AuthUser }>("/public/auth/me");
  return data.data;
}
