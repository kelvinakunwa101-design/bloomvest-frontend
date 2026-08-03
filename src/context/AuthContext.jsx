import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API_URL from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  setLoading(false);
}, []);

useEffect(() => {
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        return;
      }

      const userData = await response.json();

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, []);

  const login = (userData, token) => {
    console.log("TOKEN:", token);

    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
          user,
        loading,
        login,
        logout,
        setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);