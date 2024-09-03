import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import TextField from "../Common/TextField";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
}) => (
  <div className="col-span-2 md:col-span-1 flex items-center mt-2">
    <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
      {label}
    </label>
    <div className="w-2/3">
      <TextField
        type={type}
        placeholder={placeholder}
        {...register(id, { required: `${label} الزامی است` })}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs pt-1">
          {(errors[id]?.message as string) || "خطای ناشناخته"}
        </p>
      )}
    </div>
  </div>
);

export default InputField;
