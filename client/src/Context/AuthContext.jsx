import { AuthContext } from "./AuthContextCreation.js";
import { useState, useEffect } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      setUser(parsed.user || null);
      setToken(parsed.token || null);
    }
    setLoading(false)
  }, [token]);

  const login = (UserData, TokenData) => {
    setToken(TokenData);
    setUser(UserData);
    localStorage.setItem(
      "auth",
      JSON.stringify({ user: UserData, token: TokenData })
    );
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth");
  };
  return (
    <AuthContext.Provider
      value={{ login, logout, user, token, setUser, setToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
