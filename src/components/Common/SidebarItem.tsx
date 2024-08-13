import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  isOpen,
  children,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    if (children) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <>
      <Link
        to={to}
        className={`flex items-center w-full mt-3 p-3 pr-7 gradient-sidebaritem rounded-xl transition ${
          isDropdownOpen && children ? "gradient-sidebaritem-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="w-6 h-6 text-gray-400 pt-1">{icon}</div>
        <span
          className={`mr-2 text-right text-gray-200 ${!isOpen && "hidden"}`}
        >
          {label}
        </span>
        {children && (
          <div className="mr-auto">
            {isDropdownOpen ? (
              <IoIosArrowDown className="text-blue-600" />
            ) : (
              <IoIosArrowBack className="text-blue-400" />
            )}
          </div>
        )}
      </Link>
      {isDropdownOpen && children && (
        <div className="text-sm w-11/12">{children}</div>
      )}
    </>
  );
};

export default SidebarItem;
