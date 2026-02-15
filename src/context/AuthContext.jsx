import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const HARDCODED_EMAIL = "intern@demo.com";
const HARDCODED_PASSWORD = "intern123";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  // Loading the user from localStorage when page refreshes
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password, rememberMe) => {
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      const userData = { email };

      if (rememberMe) {
        localStorage.setItem("authUser", JSON.stringify(userData));
      }
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
