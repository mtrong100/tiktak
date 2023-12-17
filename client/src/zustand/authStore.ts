import { TCurrentUser } from "@/utils/types";
import create from "zustand";

interface AuthState {
  user: TCurrentUser | null;
  storeCurrentUser: (data: TCurrentUser) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  storeCurrentUser: (data) => set({ user: data }),
}));
