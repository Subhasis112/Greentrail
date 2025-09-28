import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Axios instance pointing to Django backend
const api = axios.create({
  baseURL: "http://localhost:8000", // Django backend URL
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Set Authorization header if token exists
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/api/user-profile/"); // Adjust endpoint if needed
      setUser(res.data);
    } catch (error) {
      console.error("Fetching user profile failed:", error.response?.data || error.message);
    }
  };

  const loginUser = async (username, password) => {
    try {
      const res = await api.post("/api/auth/login/", { username, password });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      await fetchUserProfile();
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
