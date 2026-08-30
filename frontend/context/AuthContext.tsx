"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api/axios";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to request user details using the access token
  const fetchUser = async (accessToken: string) => {
    try {
      const res = await api.get("/admin/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(res.data.data);
    } catch (err) {
      console.error("Failed to fetch user info", err);
      setUser(null);
    }
  };

  // Function to refresh the access token via HttpOnly refresh cookie
  const refreshSession = async () => {
    try {
      const res = await api.post("/admin/refresh-token");
      const { accessToken } = res.data;
      setToken(accessToken);
      await fetchUser(accessToken);
    } catch (err) {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Perform initial session check on mount
  useEffect(() => {
    refreshSession();
  }, []);

  // Request interceptor to automatically add the Authorization header
  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Response interceptor to handle token refresh automatically on 401s
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          originalRequest.url !== "/admin/login" &&
          originalRequest.url !== "/admin/refresh-token"
        ) {
          originalRequest._retry = true;
          try {
            const res = await api.post("/admin/refresh-token");
            const { accessToken } = res.data;
            setToken(accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          } catch (refreshErr) {
            setToken(null);
            setUser(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/admin/login", { email, password });
      const { accessToken, admin } = res.data;
      setToken(accessToken);
      setUser(admin);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/admin/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
