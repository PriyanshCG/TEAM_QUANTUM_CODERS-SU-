// frontend/store/authStore.ts
// Zustand auth store — handles login, register, logout, and session rehydration.

import { create } from 'zustand';
import api from '@/lib/api';
import { setTokens, removeTokens } from '@/lib/auth';

export type UserRole = 'student' | 'institute' | 'industry' | 'government' | 'admin';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  authProvider?: 'local' | 'google' | 'github';
  isActive: boolean;
  createdAt: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  loading: false,
  error: null,

  // ── Login ─────────────────────────────────────────────────────────────────
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // HACKATHON DEMO: Bypass API
      const user = { _id: 'demo123', name: 'Demo User', email: 'demo@skillsense.ai', role: 'student' as UserRole, isActive: true, createdAt: new Date().toISOString() };
      const jwt = 'demo_token';
      setTokens(jwt, 'demo_refresh');
      if (typeof window !== 'undefined') {
        localStorage.setItem('ss_user', JSON.stringify({ name: user.name, role: user.role, email: user.email }));
      }
      set({ user, accessToken: jwt, loading: false });
    } catch (err: unknown) {
      set({ loading: false, error: 'Login failed.' });
      throw err;
    }
  },

  // ── Register ──────────────────────────────────────────────────────────────
  register: async (name: string, email: string, password: string, role: UserRole) => {
    set({ loading: true, error: null });
    try {
      // HACKATHON DEMO: Bypass API
      const user = { _id: 'demo123', name, email: 'demo@skillsense.ai', role, isActive: true, createdAt: new Date().toISOString() };
      const jwt = 'demo_token';
      setTokens(jwt, 'demo_refresh');
      if (typeof window !== 'undefined') {
        localStorage.setItem('ss_user', JSON.stringify({ name: user.name, role: user.role, email: user.email }));
      }
      set({ user, accessToken: jwt, loading: false });
    } catch (err: unknown) {
      set({ loading: false, error: 'Registration failed.' });
      throw err;
    }
  },

  // ── Logout ────────────────────────────────────────────────────────────────
  logout: async () => {
    try {
      // HACKATHON DEMO: Bypass API
    } catch {
      // Ignore
    } finally {
      removeTokens();
      set({ user: null, accessToken: null });
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
  },

  // ── Check Auth (rehydrate on page load) ───────────────────────────────────
  checkAuth: async () => {
    const token = typeof window !== 'undefined'
      ? (localStorage.getItem('accessToken') || localStorage.getItem('token'))
      : null;
    if (!token) return;

    set({ loading: true });
    try {
      // HACKATHON DEMO: Bypass API
      let role = 'student' as UserRole;
      if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('ss_user');
          if (stored) {
              const parsed = JSON.parse(stored);
              role = parsed.role || 'student';
          }
      }
      const user = { _id: 'demo123', name: 'Demo User', email: 'demo@skillsense.ai', role, isActive: true, createdAt: new Date().toISOString() };
      set({ user, accessToken: token, loading: false });
    } catch {
      removeTokens();
      localStorage.removeItem('token');
      set({ user: null, accessToken: null, loading: false });
    }
  },

  // ── Helpers ───────────────────────────────────────────────────────────────
  clearError: () => set({ error: null }),

  // ── setToken (used by OAuth callback) ─────────────────────────────────────
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('token', token);
    }
    set({ accessToken: token });
  },
}));
