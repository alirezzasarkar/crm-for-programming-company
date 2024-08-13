// ReportFilter.tsx
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface ReportFilterProps {
  filter: string;
  options: string[];
  label: string;
  onFilterChange: (filter: string) => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({
  filter,
  options,
  label,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (newFilter: string) => {
    onFilterChange(newFilter);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-1/3 text-right">
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center w-full bg-white shadow-md rounded-md px-4 py-3 text-sm font-medium text-blue-600 hover:bg-gray-100 focus:outline-none"
      >
        <span className="font-semibold">{label}</span>
        <span className="flex items-center text-gray-600 font-normal">
          {filter}
          <FaChevronDown className="mr-2 text-gray-600" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleFilterChange(option)}
                className={`block w-full text-right px-4 py-2 text-sm ${
                  filter === option
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilter;
