import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        rows={4}
        {...register(id, { required: `${label} الزامی است` })}
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default TextareaField;
