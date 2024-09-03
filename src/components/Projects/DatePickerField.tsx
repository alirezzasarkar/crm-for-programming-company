import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { ProjectFormInputs } from "../../pages/AddProjectPage";
import PersianDatePicker from "../Common/PersianDatePicker"; // Adjust the path if needed

interface DatePickerFieldProps {
  id: keyof ProjectFormInputs;
  label: string;
  placeholder: string;
  register: UseFormRegister<ProjectFormInputs>;
  errors: FieldErrors<ProjectFormInputs>;
  setValue: UseFormSetValue<ProjectFormInputs>;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  placeholder,
  register,
  errors,
  setValue,
}) => (
  <div className="flex items-center mt-2">
    <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
      {label}
    </label>
    <div className="w-2/3">
      <PersianDatePicker
        placeholder={placeholder}
        onChange={(date) => {
          // تنظیم مقدار انتخاب شده به فرمت میلادی و ثبت در فرم
          setValue(id, date ? date.toDate().toISOString().split("T")[0] : "");
        }}
      />
      {errors[id] && (
        <p className="text-red-500 text-xs pt-1">
          {errors[id]?.message || "این فیلد الزامی است"}
        </p>
      )}
    </div>
  </div>
);

export default DatePickerField;
