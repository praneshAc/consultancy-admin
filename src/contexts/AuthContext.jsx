import React, { useEffect, createContext, useState, useContext } from "react";

const initialAuthValue = {
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  userData: null,
};
export const AuthContext = createContext(initialAuthValue);
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const storedData = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setAuthenticated(true);
    }
  }, []);

  const login = (newToken, newData) => {
    localStorage.setItem(
      "user_data",
      JSON.stringify({ userToken: newToken, user: newData })
    );
    setToken(newToken);
    setUserData(newData);
    setAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("user_data");
    setToken(null);
    setUserData(null);
    setAuthenticated(false);
    window.location.href = "/";
  };

  const contextValue = {
    token: token,
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    userData: userData,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
