import React, { useState, useEffect } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import Title from "../Common/Title";
import { getWeekDates, getStartOfWeek } from "../../utils/dateUtils";
import moment from "jalali-moment";

const WorkReportForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [weekDays, setWeekDays] = useState<{ name: string; date: string }[]>(
    []
  );

  useEffect(() => {
    const today = moment();
    const startOfWeek = getStartOfWeek(today);
    setWeekDays(getWeekDates(startOfWeek));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = moment();
      const startOfWeek = getStartOfWeek(today);
      setWeekDays(getWeekDates(startOfWeek));
    }, 24 * 60 * 60 * 1000); // Every 24 hours

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Work report submitted:", description);
  };

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="ارسال گزارش کار" />
      <WeekDaysSlider
        days={weekDays}
        activeIndex={activeDayIndex}
        onDayClick={handleDayClick}
      />
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-40 p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="توضیحات"
        ></textarea>
        <button
          type="submit"
          className="px-10 py-1 bg-blue-600 text-white rounded"
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default WorkReportForm;
