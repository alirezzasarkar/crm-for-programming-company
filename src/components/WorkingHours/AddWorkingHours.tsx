import React, { useState, useEffect } from "react";
import WeekDaysSlider from "../Common/WeekDays";
import TimerDisplay from "../Common/TimerDisplay";
import ControlButtons from "../Common/ControlButtons";
import Title from "../Common/Title";
import { getWeekDates, getStartOfWeek } from "../../utils/dateUtils";
import moment from "jalali-moment";
import Swal from "sweetalert2";
import {
  startWorking,
  pauseWorking,
  resumeWorking,
  stopWorking,
} from "../../services/workingHours"; // Import the working time API functions

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

  const startTimer = async () => {
    try {
      await startWorking(); // Call the API to start working
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در شروع زمان کاری رخ داد.",
      });
    }
  };

  const pauseTimer = async () => {
    try {
      await pauseWorking(); // Call the API to pause working
      setIsRunning(false);
      setIsPaused(true);
      if (timerInterval !== null) clearInterval(timerInterval);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در وقفه زمان کاری رخ داد.",
      });
    }
  };

  const resumeTimer = async () => {
    try {
      await resumeWorking(); // Call the API to resume working
      startTimer();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ادامه زمان کاری رخ داد.",
      });
    }
  };

  const stopTimer = async () => {
    try {
      await stopWorking(); // Call the API to stop working
      setIsRunning(false);
      setIsPaused(false);
      if (timerInterval !== null) clearInterval(timerInterval);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت زمان کاری رخ داد.",
      });
    }
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
          onResume={resumeTimer} // Add resume function for resuming
        />
      </div>
    </div>
  );
};

export default WorkTimeEntry;
