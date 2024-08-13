import React from "react";
import { FiMenu, FiUser, FiMessageCircle } from "react-icons/fi";
import logo from "../../assets/images/logo-navbar.png"; // مسیر لوگو را به درستی تنظیم کنید

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between p-4 w-full gradient-navbar shadow-md">
      <div className="flex items-center ml-4">
        <button className="bg-white p-2 rounded-full mr-4">
          <FiUser className="w-6 h-6 text-blue-600" />
        </button>
        <button className="bg-white p-2 rounded-full mr-4">
          <FiMessageCircle className="w-6 h-6 text-blue-600" />
        </button>
      </div>
      <div className="flex justify-center flex-1">
        <img src={logo} alt="Logo" className="h-14" />
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-200 focus:outline-none ml-4"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
