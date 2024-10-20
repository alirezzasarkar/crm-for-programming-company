import React, { useState, useEffect } from "react";
import { FiMenu, FiMessageCircle, FiAlertCircle, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import logo from "../../assets/images/logo-navbar.png";
import { getUserProfile } from "../../services/profile"; // Adjust the import path as necessary

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isMessageDropdownOpen, setMessageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // State to store user profile image and loading state
  const [userProfileImage, setUserProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data for unread tickets and unchecked tasks
  const unreadTickets = 3;
  const uncheckedTasks = 2;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfileImage(profileData.picture); // Adjust based on your actual API response
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUserIconClick = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    if (isMessageDropdownOpen) {
      setMessageDropdownOpen(false);
    }
  };

  const handleMessageIconClick = () => {
    setMessageDropdownOpen(!isMessageDropdownOpen);
    if (isUserDropdownOpen) {
      setUserDropdownOpen(false);
    }
  };

  const handleTicketsClick = () => {
    setMessageDropdownOpen(false);
    navigate("tickets/list");
  };

  const handleTasksClick = () => {
    setMessageDropdownOpen(false);
    navigate("tasks/list");
  };

  return (
    <header className="flex items-center justify-between p-4 w-full gradient-navbar shadow-md">
      <div className="flex items-center ml-4">
        <div className="relative">
          {userProfileImage ? (
            <button
              className="bg-white rounded-full mr-4"
              onClick={handleUserIconClick}
              disabled={loading} // Disable while loading
            >
              {loading ? (
                <div className="w-10 h-10 animate-spin border-2 border-gray-300 border-t-blue-600 rounded-full"></div> // Loading spinner
              ) : (
                <img
                  src={userProfileImage || "fallback_image_url"} // Add a fallback image URL here
                  className="w-10 h-10 rounded-full"
                />
              )}
            </button>
          ) : (
            <button
              className="bg-white p-2 rounded-full mr-4"
              onClick={handleUserIconClick}
            >
              <FiUser className="w-6 h-6 text-blue-600" />
            </button>
          )}

          {isUserDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-center px-4 py-2 text-red-500 hover:bg-gray-200"
              >
                خروج از پروفایل
              </button>
            </div>
          )}
        </div>
        {/* Message icon and dropdown logic remains unchanged */}
      </div>
      <div className="flex justify-center flex-1">
        <img src={logo} alt="Logo" className="h-14" />
      </div>
      {/* Sidebar toggle button remains unchanged */}
    </header>
  );
};

export default Navbar;
