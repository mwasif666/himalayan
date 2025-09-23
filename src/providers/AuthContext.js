import { createContext, useContext, useState, useEffect } from "react";
import { request } from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedToken) setToken(savedToken);
  }, []);

  const storeDataInLS = (res) => {
    localStorage.setItem("user", JSON.stringify(res.user)); 
    localStorage.setItem("token", res.token);

    setUser(res.user);
    setToken(res.token);
    console.log("Saved in LS:", res);
  };

  const loginUser = async (loginData) => {
    try {
      const res = await request({
        url: "LoginUser",
        method: "POST",
        data: loginData,
      });
      storeDataInLS(res);
      return res;
    } catch (err) {
      return err;
    }
  };

  const registerUser = async (registerData) => {
    try {
      const res = await request({
        url: "RegisterNewUser",
        method: "POST",
        data: registerData,
      });
      storeDataInLS(res);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const userId = user ? user.id : null;
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, userId, isAuthenticated, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
