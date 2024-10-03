import React from "react";
import { FieldErrors } from "react-hook-form";

interface Employee {
  id: number;
  last_name: string;
}

interface DropdownFieldProps {
  id: string;
  label: string;
  placeholder: string;
  employees: Employee[];
  selectedItems: Employee[];
  dropdownOpen: boolean;
  handleToggle: () => void;
  handleSelect: (id: number) => void;
  handleRemove?: (id: number) => void; // Optional remove function
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
  handleRemove = () => {}, // Default empty function for optional remove
  value,
  errors,
}) => {
  // نمایش لیست کاربران
  const renderEmployeeList = () => (
    <div>
      {employees.map((employee) => (
        <div
          key={employee.id}
          onClick={() => {
            handleSelect(employee.id); // انتخاب کاربر
            handleToggle(); // بستن دراپ‌داون پس از انتخاب
          }}
          className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
        >
          {employee.last_name}
          {selectedItems.some((item) => item.id === employee.id) && (
            <span className="text-red-500 text-xs ml-2">(انتخاب شده)</span>
          )}
        </div>
      ))}
    </div>
  );

  // نمایش کاربران انتخاب شده
  const renderSelectedItems = () => (
    <div>
      {selectedItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mt-1"
        >
          <span>{item.last_name}</span>
          {handleRemove && (
            <button
              onClick={() => handleRemove(item.id)} // حذف کاربر
              className="text-red-500 text-xs"
            >
              حذف
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="col-span-2 md:col-span-1 flex items-center mt-2">
      <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
        {label}
      </label>
      <div className="w-2/3 relative">
        {/* اینپوت برای نمایش اسامی انتخاب‌شده */}
        <input
          type="text"
          placeholder={placeholder}
          readOnly
          onClick={handleToggle} // باز و بسته کردن دراپ‌داون
          value={value} // نمایش نام اعضای انتخاب‌شده
          className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-300 text-right"
        />

        {/* نمایش لیست کارمندان دراپ‌داون */}
        {dropdownOpen && (
          <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10">
            {renderEmployeeList()}
          </div>
        )}

        {/* نمایش اعضای انتخاب‌شده در زیر فیلد */}
        {selectedItems.length > 0 && (
          <div className="mt-2">{renderSelectedItems()}</div>
        )}

        {/* نمایش خطاها */}
        {errors[id] && (
          <p className="text-red-500 text-xs pt-1">
            {(errors[id]?.message as string) || "خطای ناشناخته"}
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownField;
