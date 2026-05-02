import React from "react";
import authService from "../../appwrite/auth";
import { logout as storeLogout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
export default function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    try {
      await authService.logout();
      dispatch(storeLogout());
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white 
             bg-indigo-600 rounded-lg 
             hover:bg-indigo-700 
             active:scale-95 
             transition-all duration-200 shadow-sm"
    >
      Logout
    </button>
  );
}
