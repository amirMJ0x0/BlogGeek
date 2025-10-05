import { create } from "zustand";

type AuthState = {
  user: any | null;
  setUser: (user: any) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
