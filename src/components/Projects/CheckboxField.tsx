import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CheckboxFieldProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  register,
}) => {
  return (
    <div className="flex items-center mt-4">
      <input
        id={id}
        type="checkbox"
        {...register(id)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label htmlFor={id} className="mr-2 text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
