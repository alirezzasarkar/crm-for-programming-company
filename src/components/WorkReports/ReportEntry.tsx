import React, { useState, useEffect } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import Title from "../Common/Title";
import { getWeekDates, getStartOfWeek } from "../../utils/dateUtils";
import moment from "jalali-moment";
import Swal from "sweetalert2";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate a form submission or any processing here
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay

      Swal.fire({
        title: "موفقیت",
        text: "گزارش کار با موفقیت ارسال شد.",
        icon: "success",
        confirmButtonText: "باشه",
      });

      // Optionally reset the form
      setDescription("");
      setActiveDayIndex(0);
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "مشکلی در ارسال گزارش پیش آمد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
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
