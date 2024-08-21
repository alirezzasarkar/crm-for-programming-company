import React, { useState } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import Title from "../Common/Title";
import moment from "jalali-moment";

const ReportDetails: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const weekDays = [
    { name: "شنبه", date: "1403/03/01" },
    { name: "یک‌شنبه", date: "1403/03/01" },
    { name: "دوشنبه", date: "1403/03/01" },
    { name: "سه‌شنبه", date: "1403/03/01" },
    { name: "چهارشنبه", date: "1403/03/01" },
    { name: "پنج‌شنبه", date: "1403/03/01" },
  ];

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="جزئیات گزارش کار" />
      <WeekDaysSlider
        days={weekDays}
        activeIndex={activeDayIndex}
        onDayClick={handleDayClick}
      />
      <div className="bg-gray-100 p-4 rounded mt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </p>
        <div className="text-right mt-2 text-gray-500 text-xs">1403/03/01</div>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded mt-4">
        بررسی شد
      </button>
    </div>
  );
};

export default ReportDetails;
