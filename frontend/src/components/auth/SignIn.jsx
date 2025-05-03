import React, { useState } from "react";
import { useAuth } from "../ContextProvider/Contextprovider.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function SignIn() {
  const { login } = useAuth(); // ✅ get login from AuthContext
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const addData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const SendData = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      await login(email, password); // ✅ call context login
      toast.success("Successfully Logged In", { position: "top-center" });
      navigate("/");
      setData({ email: "", password: "" });
    } catch (err) {
      toast.error(err.message || "Login failed", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse drop-shadow-lg mb-10 text-center">
        Multivendor Store
      </h1>

      <form
        onSubmit={SendData}
        className="space-y-6 w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        <div className="form_data">
          <label htmlFor="email" className="block mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            onChange={addData}
            value={data.email}
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form_data">
          <label htmlFor="password" className="block mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            onChange={addData}
            value={data.password}
            name="password"
            id="password"
            placeholder="Enter Your Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Continue
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-700">New to Multivendor Store?</p>
        <Link
          to="/signUp"
          className="text-blue-600 hover:underline mt-1 font-medium"
        >
          Create Your Account
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
