import { createContext, useContext, useState } from "react";
import { request } from "../api/axiosInstance";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storeDataInLS = (res) => {
    console.log("res",res);
  };

  const loginUser = async (loginData) => {
    try {
      const res = await request({
        url: `LoginUser`,
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
        url: `RegisterNewUser`,
        method: "POST",
        data: registerData,
      });
      storeDataInLS(res)
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
