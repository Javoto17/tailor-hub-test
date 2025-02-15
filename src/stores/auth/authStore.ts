import { create } from 'zustand';

import { User } from '@/modules/auth/domain/Auth';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  verifyToken: (userData: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  verifyToken: (userData) => set({ isAuthenticated: true, user: userData }),
}));

export default useAuthStore;
