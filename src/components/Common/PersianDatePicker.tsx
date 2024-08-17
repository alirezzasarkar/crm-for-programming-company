import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaCalendarAlt } from "react-icons/fa";

interface MyDatePickerProps {
  placeholder?: string;
  onChange?: (date: DateObject | null) => void; // Explicitly type the onChange prop
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  placeholder,
  onChange,
}) => {
  const [value, setValue] = useState<DateObject | null>(null);

  const handleDateChange = (date: DateObject | null) => {
    setValue(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="flex items-center relative border border-gray-200 rounded-xl p-2">
      {/* Calendar Icon */}
      <FaCalendarAlt className="absolute left-2 text-gray-400 pointer-events-none" />

      {/* Date Picker Field */}
      <DatePicker
        value={value}
        onChange={handleDateChange}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        placeholder={placeholder}
        inputClass="pl-8 outline-none w-full" // Space for icon
      />
    </div>
  );
};

export default MyDatePicker;
