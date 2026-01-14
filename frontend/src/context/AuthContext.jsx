import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    accessToken ? localStorage.setItem("accessToken", accessToken) : localStorage.removeItem("accessToken");
    refreshToken ? localStorage.setItem("refreshToken", refreshToken) : localStorage.removeItem("refreshToken");
  }, [accessToken, refreshToken]);

  useEffect(() => {
    apiClient.interceptors.request.use((config) => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }, [accessToken]);

  async function fetchMe() {
    if (!accessToken) return;
    try {
      const res = await apiClient.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => { fetchMe(); }, [accessToken]);

  async function login(username, password) {
    const res = await apiClient.post("/api/auth/login", { username, password });
    setAccessToken(res.data.result.accessToken);
    setRefreshToken(res.data.result.refreshToken);
    setUser(res.data.result.user);
  }

  async function refreshAccessToken() {
    if (!refreshToken) throw new Error("No refresh token");
    const res = await apiClient.post("/api/auth/refresh", { refreshToken });
    setAccessToken(res.data.result.accessToken);
    setRefreshToken(res.data.result.refreshToken);
    return res.data.result.accessToken;
  }

  async function logout() {
    try {
      if (refreshToken) await apiClient.post("/api/auth/logout", { refreshToken });
    } catch {}
    setAccessToken(""); setRefreshToken(""); setUser(null);
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
