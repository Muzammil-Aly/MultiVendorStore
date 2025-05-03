import { useAuth } from "../ContextProvider/Contextprovider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { logout } = useAuth(); // ✅ use logout from context

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logout(); // ✅ context logout handles API + setUser(null)
      toast.success("Logged out successfully");
      localStorage.removeItem("user"); // optional if you're storing user
      navigate("/SignIn"); // optional: if you want to redirect
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err.message || "Server error during logout");
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={logoutHandler}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
