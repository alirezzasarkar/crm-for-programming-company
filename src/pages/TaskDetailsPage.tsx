import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskDetails from "../components/Tasks/TaskDetails";
import { getTaskDetails, updateTask } from "../services/task"; // ایمپورت تابع API
import moment from "jalali-moment"; // ایمپورت کتابخانه برای تبدیل تاریخ
import { jwtDecode } from "jwt-decode"; // ایمپورت تابع برای دیکود کردن JWT
import LoadingSpinner from "../components/Common/Loading";

interface JwtPayload {
  user_id: number; // فرض اینکه id در توکن موجود است
}

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null); // استفاده از نوع any برای تست
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); // ذخیره ID کاربر
  const [originalDueDate, setOriginalDueDate] = useState<string>(""); // ذخیره تاریخ میلادی اصلی

  // دریافت و دیکود کردن توکن JWT
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setUserId(decoded.user_id);
      } catch (error) {
        console.error("خطا در دیکود کردن JWT:", error);
      }
    }
  }, []);

  // دریافت اطلاعات تسک
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskDetails(Number(id));

        // ذخیره تاریخ میلادی اصلی برای استفاده در PUT
        setOriginalDueDate(taskData.due_date);

        // تبدیل تاریخ میلادی به شمسی برای نمایش
        const persianDueDate = moment(taskData.due_date)
          .locale("fa")
          .format("YYYY/MM/DD");

        // اطمینان از اینکه فایل هم در تسک وجود دارد
        setTask({ ...taskData, due_date: persianDueDate });
      } catch (error) {
        setError("خطا در بارگذاری تسک");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // تابع برای تکمیل کردن تسک
  const handleCompleteTask = async () => {
    if (task) {
      try {
        await updateTask(Number(id), {
          ...task,
          due_date: originalDueDate, // ارسال تاریخ میلادی اصلی
          status: "done", // تغییر وضعیت به "done"
        });
        // به روزرسانی وضعیت محلی تسک و نمایش تغییرات بلافاصله
        setTask((prevTask: any) => ({
          ...prevTask,
          status: "done", // تغییر وضعیت به صورت محلی
        }));
      } catch (error) {
        setError("خطا در به روز رسانی تسک");
      }
    }
  };

  // کنترل بارگذاری و نمایش خطا
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <TaskDetails
      sender={task.sender}
      team={task.team}
      due_date={task.due_date} // نمایش تاریخ شمسی
      status={task.status}
      title={task.title}
      description={task.description}
      fileUrl={task.file} // لینک فایل از تسک
      onComplete={handleCompleteTask} // اضافه کردن تابع به کامپوننت TaskDetails
      showCompleteButton={task.receiver === userId} // نمایش دکمه فقط اگر کاربر دریافت‌کننده نباشد
    />
  );
};

export default TaskDetailsPage;
