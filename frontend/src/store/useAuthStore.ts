import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Owner: Member 3 / Member 4 (wherever auth UI ends up living)
 * Wire this up once POST /public/auth/login actually returns a real token
 * (see backend/src/services/public/auth.service.js).
 */

interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  setAuth: (accessToken: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (accessToken, user) => set({ accessToken, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    { name: "auth-storage" },
  ),
);
