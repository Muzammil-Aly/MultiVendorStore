import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../ContextProvider/Contextprovider";

const AccountInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userRole, setUserRole } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post("api/v1/users/current-user");
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleRoleSwitch = async () => {
    setLoading(true);
    try {
      const newRole = user.role === "buyer" ? "seller" : "buyer";
      await axios.post("api/v1/users/updateRole", {
        role: newRole,
      });
      setUser({ ...user, role: newRole });
      setUserRole(newRole);
      localStorage.setItem("userRole", newRole);
    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700">
        <p className="text-red-500 text-lg">No user found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 transform hover:scale-105 transition duration-500">
        {/* Name Section */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">{user.fullName}</h2>
        </div>

        {/* Profile Info Section */}
        <div className="flex flex-col md:flex-row w-full items-center justify-between space-y-6 md:space-y-0">
          {/* Profile Image with hover effect */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-32 h-32 rounded-full shadow-xl border-4 border-white hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* User Details Section */}
          <div className="flex flex-col w-full md:w-2/3 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-600">Username:</p>
              <p className="text-gray-700">{user.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-600">Email:</p>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-600">Phone:</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-600">Role:</p>
              <p className="text-gray-700">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Role Switch Button with Hover Effects */}
        <div className="w-full flex justify-center mt-8">
          <button
            onClick={handleRoleSwitch}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition duration-300"
          >
            Switch to {user.role === "buyer" ? "Seller" : "Buyer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
