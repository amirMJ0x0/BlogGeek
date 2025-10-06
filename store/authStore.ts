import { create } from "zustand";

type AuthState = {
  credential: string | null;
  setCredential: (value: string) => void;
  clearCredential: () => void;
  otpExpireTime: string | null;
  setOtpExpireTime: (value: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  otpExpireTime: null,
  setOtpExpireTime: (value) => set({ otpExpireTime: value }),
  credential: null,
  setCredential: (value) => set({ credential: value }),
  clearCredential: () => set({ credential: null }),
}));
