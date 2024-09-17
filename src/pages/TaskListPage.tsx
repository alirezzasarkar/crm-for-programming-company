import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/Tasks/TaskList";
import Search from "../components/Common/Search";
import TaskFilter from "../components/Tasks/TaskFilter";
import { fetchTasks, getUserProfile } from "../services/task"; // ایمپورت تابع API
import moment from "jalali-moment"; // ایمپورت کتابخانه برای تبدیل تاریخ
import { jwtDecode } from "jwt-decode"; // برای دیکود کردن JWT

interface Task {
  id: number;
  sender: string;
  receiver: number; // اضافه کردن receiver به مدل
  team: string;
  title: string;
  due_date: string;
  status: string;
  details: string;
  type: "sent" | "received"; // نوع تسک
}

interface JwtPayload {
  user_id: number; // فرض اینکه id در توکن موجود است
  // می‌توانید فیلدهای بیشتری اضافه کنید که در JWT شما موجود هستند
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [usid, setUsId] = useState<number | null>(null); // ذخیره ID فرستنده
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // دریافت JWT Token از localStorage و دیکود کردن آن
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // گرفتن JWT از localStorage
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token); // دیکود کردن JWT
        setUsId(decoded.user_id); // ذخیره ID فرستنده
      } catch (error) {
        console.error("خطا در دیکود کردن JWT:", error);
      }
    }
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();

        // دریافت نام خانوادگی بر اساس id و جایگزینی آن با sender
        const updatedTasks = await Promise.all(
          data.map(async (task: any) => {
            const userProfile = await getUserProfile(task.sender);

            // تبدیل تاریخ میلادی به شمسی
            const persianDueDate = moment(task.due_date)
              .locale("fa")
              .format("YYYY/MM/DD");

            // تعیین نوع تسک
            const type = task.receiver === usid ? "received" : "sent";

            return {
              ...task,
              sender: userProfile.last_name,
              due_date: persianDueDate,
              type: type, // تعیین نوع تسک
            };
          })
        );

        setTasks(updatedTasks);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };

    getTasks();
  }, [usid]);

  // فیلتر کردن تسک‌ها براساس نوع آن‌ها
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.type === filter);

  // تابع کلیک بر روی تسک
  const handleTaskClick = (id: number) => {
    navigate(`/dashboard/tasks/detail/${id}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>
      <TaskList tasks={filteredTasks} onTaskClick={handleTaskClick} />
    </>
  );
};

export default TaskListPage;
