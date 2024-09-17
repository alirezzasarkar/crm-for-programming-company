import React, { useState, useEffect } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import Title from "../Common/Title";
import moment from "jalali-moment";
import { fetchReports } from "../../services/report"; // Adjust the path as needed

const ReportDetails: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [reports, setReports] = useState<any[]>([]);
  const weekDays = [
    { name: "شنبه", date: "1403/03/01" },
    { name: "یک‌شنبه", date: "1403/03/01" },
    { name: "دوشنبه", date: "1403/03/01" },
    { name: "سه‌شنبه", date: "1403/03/01" },
    { name: "چهارشنبه", date: "1403/03/01" },
    { name: "پنج‌شنبه", date: "1403/03/01" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReports = await fetchReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };

    fetchData();
  }, []);

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="جزئیات گزارش کار" />
      <WeekDaysSlider
        days={weekDays}
        activeDate={weekDays[activeDayIndex].date}
        onDayClick={handleDayClick}
      />
      <div className="bg-gray-100 p-4 rounded mt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {reports.find(
            (report) => report.date === weekDays[activeDayIndex].date
          )?.description || "جزئیات گزارش یافت نشد."}
        </p>
        <div className="text-right mt-2 text-gray-500 text-xs">
          {weekDays[activeDayIndex].date}
        </div>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded mt-4">
        بررسی شد
      </button>
    </div>
  );
};

export default ReportDetails;
