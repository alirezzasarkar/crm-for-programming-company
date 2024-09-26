import React, { useState, useEffect } from "react";
import Title from "../Common/Title";
import moment from "jalali-moment";
import Swal from "sweetalert2";
import { createReport } from "../../services/report"; // Adjust the path as needed

const WorkReportForm: React.FC = () => {
  const [content, setContent] = useState("");
  const [todayDate, setTodayDate] = useState<string>("");

  // تنظیم تاریخ امروز در فرمت شمسی برای نمایش
  useEffect(() => {
    const today = moment().format("jYYYY/jMM/jDD"); // تاریخ امروز به صورت شمسی
    setTodayDate(today);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createReport({
        content, // فقط فیلد content ارسال می‌شود
      });

      Swal.fire({
        title: "موفقیت",
        text: "گزارش کار با موفقیت ارسال شد.",
        icon: "success",
        confirmButtonText: "باشه",
      });

      // پاکسازی فرم بعد از ارسال موفق
      setContent("");
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "مشکلی در ارسال گزارش پیش آمد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="ارسال گزارش کار" />
      <div className="text-right my-4 text-gray-500 text-xs">
        تاریخ امروز: {todayDate} {/* نمایش تاریخ شمسی */}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-40 p-2 border rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
