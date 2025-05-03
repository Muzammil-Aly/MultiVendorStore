import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../ContextProvider/authService";

const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(null);
  const [sellerOrderQuantity, setSellerOrderQuantity] = useState(null);

  // Check if user data exists in localStorage and set it on page load
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    const storedQuantity = Number(localStorage.getItem("cartQuantity") || 0);
    setCartQuantity(storedQuantity);
    // const cartQuantity = localStorage.getItem("cartQuantity");

    const sellerOrderQuantity = localStorage.getItem("sellerOrderQuantity");
    const userRole = localStorage.getItem("userRole");
    if (savedUser) {
      try {
        const parsedUser = savedUser; // Parse the user data
        setUser(parsedUser); // Set user data
        setStatus(true);
        setCartQuantity(cartQuantity);
        setSellerOrderQuantity(sellerOrderQuantity);
        setUserRole(userRole);
      } catch (err) {
        console.error("Error parsing user data from localStorage", err);
        setUser(null); // If parsing fails, reset user data
        setStatus(false);
      }
    } else {
      checkAuth(); // Call checkAuth if no saved user
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  const checkAuth = async () => {
    try {
      const data = await authService.getCurrentUser(); // calls protected route
      setUser(data.user);
      setStatus(true);
      console.log("current user", data);
      localStorage.setItem("userInfo", data.user); // Store user info in localStorage
    } catch (err) {
      setUser(null);
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    setStatus(true);
    localStorage.setItem("userInfo", JSON.stringify(data.user)); // Store user info on login
    localStorage.setItem("authToken", data.token); // Optionally store token if needed
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setStatus(false);
    localStorage.removeItem("userInfo"); // Remove user info on logout
    localStorage.removeItem("authToken"); // Optionally remove token
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        login,
        logout,
        status,
        userRole,
        setUserRole,
        cartQuantity,
        setCartQuantity,
        sellerOrderQuantity,
        setSellerOrderQuantity,
      }}
    >
      {!loading && children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => useContext(LoginContext);
