import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (data.success) {
        setUser(data.user);
        setIsLoggedin(true);
      } else {
        setUser(null);
        setIsLoggedin(false);
      }
    } catch {
      setUser(null);
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedin(true);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } finally {
      setUser(null);
      setIsLoggedin(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ backendUrl, isLoggedin, user, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
