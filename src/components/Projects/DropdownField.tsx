import React from "react";
import { FieldErrors } from "react-hook-form";

interface DropdownFieldProps {
  id: string;
  label: string;
  placeholder: string;
  employees: { id: number; last_name: string }[];
  selectedItems: number[];
  dropdownOpen: boolean;
  handleToggle: () => void;
  handleSelect: (id: number) => void;
  value: string;
  errors: FieldErrors<any>;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  id,
  label,
  placeholder,
  employees,
  selectedItems,
  dropdownOpen,
  handleToggle,
  handleSelect,
  value,
  errors,
}) => (
  <div className="col-span-2 md:col-span-1 flex items-center mt-2">
    <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
      {label}
    </label>
    <div className="w-2/3 relative">
      <input
        type="text"
        placeholder={placeholder}
        readOnly
        onClick={handleToggle}
        value={value}
        className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-300 text-right"
      />
      {dropdownOpen && (
        <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleSelect(employee.id)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {employee.last_name}
            </div>
          ))}
        </div>
      )}
      {errors[id] && (
        <p className="text-red-500 text-xs pt-1">
          {(errors[id]?.message as string) || "خطای ناشناخته"}
        </p>
      )}
    </div>
  </div>
);

export default DropdownField;
