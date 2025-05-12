import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentStoredUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentStoredUser) {
        setUser(currentStoredUser);
      } else if (!["/login", "/register"].includes(window.location.pathname)) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      toast.error("Failed to load user session");
    }
  }, []);

  const authenticate = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    try {
      localStorage.removeItem("currentUser");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout properly");
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ user, authenticate, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
