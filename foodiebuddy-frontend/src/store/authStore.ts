import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setToken: (token) => {
        try {
          const decoded = jwtDecode<{
            sub?: string;
            id?: string;
            email: string;
            name: string;
            role?: string;
          }>(token);
          const user: User = {
            id: decoded.sub || decoded.id || '',
            email: decoded.email,
            name: decoded.name,
            role: decoded.role || 'USER',
          };
          set({ token, user });
        } catch (error) {
          console.error('Failed to decode token:', error);
          set({ token: null, user: null });
        }
      },
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
