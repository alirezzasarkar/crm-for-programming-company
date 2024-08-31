import React from "react";
import { getStartOfWeek, getWeekDates } from "../../utils/dateUtils"; // مسیر صحیح به فایل توابع

interface WeekDaysSliderProps {
  days: { name: string; date: string }[];
  activeDate: string; // تاریخ فعال برای مقایسه
  onDayClick?: (index: number) => void;
}

const WeekDaysSlider: React.FC<WeekDaysSliderProps> = ({
  days,
  activeDate,
  onDayClick,
}) => {
  return (
    <div className="my-6 relative text-center flex justify-between">
      {days.map((day, index) => (
        <div
          key={index}
          onClick={() =>
            day.date === activeDate && onDayClick && onDayClick(index)
          }
          className={`p-9 py-1 mx-1 rounded-lg cursor-pointer text-sm transition-transform transform ${
            day.date === activeDate
              ? "bg-blue-600 text-white scale-105"
              : "bg-blue-100 text-gray-500 cursor-not-allowed"
          }`}
        >
          <div className="mb-1">{day.name}</div>
          <div>{day.date}</div>
        </div>
      ))}
    </div>
  );
};

export default WeekDaysSlider;
