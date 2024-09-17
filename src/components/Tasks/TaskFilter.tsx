import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface TaskFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (newFilter: string) => {
    onFilterChange(newFilter);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-1/3 text-right mr-2 shadow-md shadow-gray-200">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full bg-white h-10 rounded-md px-4 py-3 text-sm text-blue-600 hover:bg-gray-100 focus:outline-none"
      >
        <span className="font-normal">فیلتر بر اساس</span>
        <span className="flex items-center text-gray-600 font-normal">
          {filter === "all"
            ? "همه"
            : filter === "sent"
            ? "ارسال شده"
            : "دریافت شده"}
          <FaChevronDown className="mr-2 text-gray-600" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleFilterChange("all")}
              className={`block w-full text-right px-4 py-2 text-sm ${
                filter === "all" ? "bg-blue-100 text-blue-600" : "text-gray-700"
              }`}
            >
              همه
            </button>
            <button
              onClick={() => handleFilterChange("sent")}
              className={`block w-full text-right px-4 py-2 text-sm ${
                filter === "sent"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              ارسال شده
            </button>
            <button
              onClick={() => handleFilterChange("received")}
              className={`block w-full text-right px-4 py-2 text-sm ${
                filter === "received"
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              دریافت شده
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
