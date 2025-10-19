import { createContext, useContext, useState, useEffect } from "react";
import { request } from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
      if (savedUser && savedToken) setIsAuthenticated(true);
    }
  }, []);

  const storeDataInLS = (res) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(res.data || res.user));
      localStorage.setItem("token", res?.token || null);
    }

    setUser(res.user || res.data);
    setToken(res.token);
    setIsAuthenticated(true);
  };

  const loginUser = async (loginData) => {
    const res = await request({
      url: "LoginUser",
      method: "POST",
      data: loginData,
    });
    storeDataInLS(res);
    return res;
  };

  const registerUser = async (registerData) => {
    const res = await request({
      url: "RegisterNewUser",
      method: "POST",
      data: registerData,
    });
    storeDataInLS(res);
    return res;
  };

  const userId = user ? user.id : null;

  const logout = () => {
    return new Promise((resolve) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
      resolve();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId,
        isAuthenticated,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
