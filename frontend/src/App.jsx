import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./components/ContextProvider/authService";
import "./App.css";
import { useAuth } from "./components/ContextProvider/Contextprovider";

import { Outlet } from "react-router-dom";
import { Footer, Header } from "../src/components/index";

function App() {
  const [loading, setLoading] = useState(true);
  const { login, logout } = useAuth();
  useEffect(() => {
    // Simulate loading time
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          login({ userData });
        } else {
          logout();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#4682B4]">
      <div className="w-full block">
        <Header />
        <main className="min-h-[70vh]">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center bg-gray-400">
      <p className="text-white text-xl">Loading...</p>
    </div>
  );
}

export default App;
