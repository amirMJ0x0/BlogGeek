import { create } from "zustand";

type AuthState = {
  credential: string | null;
  otpExpireTime: string | null;
  setCredential: (value: string) => void;
  clearCredential: () => void;
  setOtpExpireTime: (value: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  credential: null,
  otpExpireTime: null,
  setCredential: (value) => set({ credential: value }),
  clearCredential: () => set({ credential: null }),
  setOtpExpireTime: (value) => set({ otpExpireTime: value }),
}));
