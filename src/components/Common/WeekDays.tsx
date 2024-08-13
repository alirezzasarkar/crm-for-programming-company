import React from "react";

interface WeekDaysSliderProps {
  days: { name: string; date: string }[];
  activeIndex?: number;
  onDayClick?: (index: number) => void;
}

const WeekDaysSlider: React.FC<WeekDaysSliderProps> = ({
  days,
  activeIndex = 0,
  onDayClick,
}) => {
  return (
    <div className="my-6 relative text-center flex justify-between">
      {days.map((day, index) => (
        <div
          key={index}
          onClick={() => onDayClick && onDayClick(index)}
          className={`p-9 py-1 mx-1 rounded-lg cursor-pointer text-sm transition-transform transform ${
            index === activeIndex
              ? "bg-blue-600 text-white scale-105"
              : "bg-blue-100"
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
