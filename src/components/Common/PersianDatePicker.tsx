import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaCalendarAlt } from "react-icons/fa";

interface MyDatePickerProps {
  placeholder?: string;
  onChange?: (date: DateObject | null) => void;
}

const PersianDatePicker: React.FC<MyDatePickerProps> = ({
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
    <div className="w-full">
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={value}
        onChange={handleDateChange}
        render={(value, openCalendar) => {
          return (
            <div
              className="w-full flex justify-between px-3 py-2 text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-300 text-right"
              onClick={openCalendar}
            >
              <span className="text-gray-400">
                {value || placeholder || "تاریخ را انتخاب کنید"}
              </span>
              <FaCalendarAlt className="text-gray-500 mr-2" />
            </div>
          );
        }}
      />
    </div>
  );
};

export default PersianDatePicker;
