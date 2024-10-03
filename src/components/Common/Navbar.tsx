import React, { useState } from "react";
import { FiMenu, FiUser, FiMessageCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import logo from "../../assets/images/logo-navbar.png";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isMessageDropdownOpen, setMessageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // نمونه داده‌های فرضی (در واقعیت باید این داده‌ها را از سرور یا Context دریافت کنید)
  const unreadTickets = 3;
  const uncheckedTasks = 2;

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
          <button
            className="bg-white p-2 rounded-full mr-4"
            onClick={handleUserIconClick}
          >
            <FiUser className="w-6 h-6 text-blue-600" />
          </button>
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
        {/* <div className="relative">
          <button
            className="bg-white p-2 rounded-full mr-4"
            onClick={handleMessageIconClick}
          >
            <FiMessageCircle className="w-6 h-6 text-blue-600" />
            {(unreadTickets > 0 || uncheckedTasks > 0) && (
              <FiAlertCircle className="w-4 h-4 text-orange-500 absolute top-0 right-0" />
            )}
          </button>
          {isMessageDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleTicketsClick}
                className="block w-full text-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
              >
                شما {unreadTickets} تیکت خوانده نشده دارید
              </button>
              <div className="border-t border-gray-200 w-11/12 m-auto"></div>
              <button
                onClick={handleTasksClick}
                className="block w-full text-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
              >
                شما {uncheckedTasks} تسک بررسی نشده دارید
              </button>
            </div>
          )}
        </div> */}
      </div>
      <div className="flex justify-center flex-1">
        <img src={logo} alt="Logo" className="h-14" />
      </div>
      {/* <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-200 focus:outline-none ml-4"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div> */}
    </header>
  );
};

export default Navbar;
