import { create } from "zustand";
import { getFetch, setIsGuest, setSessionExpiredCallback } from "../utils/getFetch";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  authProvider: "local" | "google";
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isGuest: false,
  isAuthenticated: false,
  loading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user, isGuest: !user }),

  checkAuth: async () => {
    set({ loading: true });

    try {
      const resData = await getFetch<{
        data: {
          user: User | null;
          isGuest?: boolean;
        };
      }>("/auth", {
        method: "POST",
        private: true,
      });

      set({
        user: resData.data.user,
        isAuthenticated: !!resData.data.user,
        isGuest: !!resData.data.isGuest,
        loading: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isGuest: true, loading: false });
    }
  },
}));

useAuthStore.subscribe((state) => {
  setIsGuest(state.isGuest);
});

setSessionExpiredCallback(() => {
  useAuthStore.getState().setUser(null);
});

export default useAuthStore;