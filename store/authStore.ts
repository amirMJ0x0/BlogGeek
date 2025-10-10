import { User } from "@/features/auth/types";
import { create } from "zustand";

type AuthState = {
  credential: string | null;
  setCredential: (value: string) => void;
  clearCredential: () => void;
  otpExpireTime: string | null;
  setOtpExpireTime: (value: string) => void;
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  otpExpireTime: null,
  setOtpExpireTime: (value) => set({ otpExpireTime: value }),
  credential: null,
  setCredential: (value) => set({ credential: value }),
  clearCredential: () => set({ credential: null }),
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
