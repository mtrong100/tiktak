import { TCurrentUser } from "@/utils/types";
import create from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: TCurrentUser | null;
  storeCurrentUser: (data: TCurrentUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      storeCurrentUser: (data) => set({ user: data }),
    }),
    {
      name: "user",
    }
  )
);
