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
} from "../../services/workingHours";

const WorkTimeEntry: React.FC = () => {
  const [time, setTime] = useState("00:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0); // زمان گذشته
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [weekDays, setWeekDays] = useState<{ name: string; date: string }[]>(
    []
  );

  // بازیابی وضعیت تایمر از LocalStorage هنگام بارگذاری صفحه
  useEffect(() => {
    const today = moment();
    const startOfWeek = getStartOfWeek(today);
    setWeekDays(getWeekDates(startOfWeek));

    const savedStartTime = localStorage.getItem("startTime");
    const savedElapsedTime = localStorage.getItem("elapsedTime");

    if (savedStartTime && savedElapsedTime) {
      const startTime = parseInt(savedStartTime, 10);
      const elapsed = parseInt(savedElapsedTime, 10);

      // محاسبه زمان فعلی
      const currentTime = Date.now() - startTime + elapsed;
      setElapsedTime(currentTime);
      updateTimeDisplay(currentTime);

      // اگر تایمر در حال اجرا بود، آن را ادامه دهید
      if (localStorage.getItem("isRunning") === "true") {
        resumeTimerFromReload(currentTime);
      }
    }
  }, []);

  // تابع برای به‌روزرسانی نمایش زمان
  const updateTimeDisplay = (elapsed: number) => {
    const minutes = Math.floor((elapsed / 1000 / 60) % 60);
    const seconds = Math.floor((elapsed / 1000) % 60);
    setTime(
      `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`
    );
  };

  // شروع تایمر
  const startTimer = async () => {
    try {
      await startWorking();
      const startTime = Date.now() - elapsedTime;
      localStorage.setItem("startTime", startTime.toString());
      localStorage.setItem("isRunning", "true");
      setIsRunning(true);
      setIsPaused(false);

      const interval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        setElapsedTime(elapsed);
        localStorage.setItem("elapsedTime", elapsed.toString());
        updateTimeDisplay(elapsed);
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

  // وقفه تایمر
  const pauseTimer = async () => {
    try {
      await pauseWorking();
      setIsRunning(false);
      setIsPaused(true);
      if (timerInterval !== null) clearInterval(timerInterval);
      localStorage.setItem("isRunning", "false");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در وقفه زمان کاری رخ داد.",
      });
    }
  };

  // ادامه تایمر بعد از وقفه
  const resumeTimer = async () => {
    try {
      await resumeWorking();
      const startTime = Date.now() - elapsedTime;
      localStorage.setItem("startTime", startTime.toString());
      localStorage.setItem("isRunning", "true");
      setIsPaused(false);

      const interval = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        setElapsedTime(elapsed);
        localStorage.setItem("elapsedTime", elapsed.toString());
        updateTimeDisplay(elapsed);
      }, 1000);

      setTimerInterval(interval);
      setIsRunning(true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ادامه زمان کاری رخ داد.",
      });
    }
  };

  // ادامه تایمر بعد از ریلود صفحه
  const resumeTimerFromReload = (currentElapsedTime: number) => {
    const startTime = Date.now() - currentElapsedTime;
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      localStorage.setItem("elapsedTime", elapsed.toString());
      updateTimeDisplay(elapsed);
    }, 1000);

    setTimerInterval(interval);
    setIsRunning(true);
    setIsPaused(false);
  };

  // ثبت زمان کاری و ریست تایمر
  const submitTime = async () => {
    stopWorking();
    try {
      await Swal.fire({
        icon: "success",
        title: "زمان ثبت شد",
        text: `زمان ثبت شده : ${time}`,
      });
      resetTimer();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت زمان رخ داد.",
      });
    }
  };

  // ریست تایمر
  const resetTimer = () => {
    setTime("00:00");
    setElapsedTime(0);
    setIsRunning(false);
    setIsPaused(false);
    if (timerInterval !== null) clearInterval(timerInterval);
    localStorage.removeItem("startTime");
    localStorage.removeItem("elapsedTime");
    localStorage.removeItem("isRunning");
  };

  const handleDayClick = (index: number) => {
    setActiveDayIndex(index);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="وارد کردن زمان کاری" />
      <div className="mt-20">
        <TimerDisplay time={time} />
      </div>
      <div className="mt-20 mb-5">
        <ControlButtons
          onStart={startTimer}
          onPause={pauseTimer}
          onSubmit={submitTime}
          isRunning={isRunning}
          isPaused={isPaused}
          onResume={resumeTimer}
        />
      </div>
    </div>
  );
};

export default WorkTimeEntry;
