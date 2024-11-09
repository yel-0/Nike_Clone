import useAdminStatus from "@/Hook/Users/useAdminStatus";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const { data, isLoading } = useAdminStatus();
  const { toast } = useToast();

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    if (tokenData && tokenData.expiresAt > new Date().getTime()) {
      setToken(tokenData.value);
    } else {
      localStorage.removeItem("token");
      setToken(null);
    }
  }, [token]);

  const login = (tokenValue) => {
    const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000;
    const tokenData = {
      value: tokenValue,
      expiresAt: expirationTime,
    };

    localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenValue);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out. See you again soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ token, login, data, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
