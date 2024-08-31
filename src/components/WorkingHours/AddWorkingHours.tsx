import React, { useState, useEffect } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import TimerDisplay from "../Common/TimerDisplay";
import ControlButtons from "../Common/ControlButtons";
import Title from "../Common/Title";
import { getWeekDates, getStartOfWeek } from "../../utils/dateUtils";
import moment from "jalali-moment";
import Swal from "sweetalert2";

const WorkTimeEntry: React.FC = () => {
  const [time, setTime] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [weekDays, setWeekDays] = useState<{ name: string; date: string }[]>(
    []
  );

  useEffect(() => {
    const today = moment();
    const startOfWeek = getStartOfWeek(today);
    setWeekDays(getWeekDates(startOfWeek));
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
    const startTime = Date.now() - elapsedTime;
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      const minutes = Math.floor((elapsed / 1000 / 60) % 60);
      const seconds = Math.floor((elapsed / 1000) % 60);
      setTime(
        `${minutes < 10 ? "0" : ""}${minutes}:${
          seconds < 10 ? "0" : ""
        }${seconds}`
      );
    }, 1000);
    setTimerInterval(interval);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
    if (timerInterval !== null) clearInterval(timerInterval);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (timerInterval !== null) clearInterval(timerInterval);
  };

  const submitTime = async () => {
    try {
      await Swal.fire({
        icon: "success",
        title: "زمان ثبت شد",
        text: `زمان ثبت شده برای ${weekDays[activeDayIndex].name}: ${time}`,
      });
      // Reset timer
      setTime("00:00");
      setElapsedTime(0);
      setIsRunning(false);
      setIsPaused(false);
      if (timerInterval !== null) clearInterval(timerInterval);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت زمان رخ داد.",
      });
    }
  };

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
  };

  // محاسبه تاریخ جاری
  const today = moment().format("jYYYY/jMM/jDD"); // تاریخ جاری شمسی

  // محاسبه تاریخ شروع هفته
  const startOfWeek = getStartOfWeek(moment(today, "jYYYY/jMM/jDD"));

  // محاسبه تاریخ‌های هفته
  const weekDates = getWeekDates(startOfWeek);

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="وارد کردن زمان کاری" />
      <WeekDaysSlider
        days={weekDates}
        activeDate={today} // پاس کردن تاریخ جاری
        onDayClick={(index) => console.log("Clicked day index:", index)}
      />
      <div className="mt-20">
        <TimerDisplay time={time} />
      </div>
      <div className="mt-20 mb-5">
        <ControlButtons
          onStart={startTimer}
          onPause={pauseTimer}
          onStop={stopTimer}
          onSubmit={submitTime}
          isRunning={isRunning}
          isPaused={isPaused}
        />
      </div>
    </div>
  );
};

export default WorkTimeEntry;
