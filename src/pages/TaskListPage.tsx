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
  receiver: number;
  team: string;
  title: string;
  due_date: string;
  status: string;
  details: string;
  type: "sent" | "received";
}

interface JwtPayload {
  user_id: number;
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [usid, setUsId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(""); // برای ذخیره عبارت جستجو
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setUsId(decoded.user_id);
      } catch (error) {
        console.error("خطا در دیکود کردن JWT:", error);
      }
    }
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();

        const updatedTasks = await Promise.all(
          data.map(async (task: any) => {
            const userProfile = await getUserProfile(task.sender);

            const persianDueDate = moment(task.due_date)
              .locale("fa")
              .format("YYYY/MM/DD");

            const type = task.receiver === usid ? "received" : "sent";

            return {
              ...task,
              sender: userProfile.last_name, // استفاده از نام خانوادگی
              due_date: persianDueDate,
              type: type,
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

  // فیلتر کردن تسک‌ها بر اساس نوع آنها
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.type === filter);

  // جستجوی تسک‌ها بر اساس نام خانوادگی فرستنده
  const searchedTasks = filteredTasks.filter((task) =>
    task.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskClick = (id: number) => {
    navigate(`/dashboard/tasks/detail/${id}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />{" "}
        {/* جستجو */}
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>
      <TaskList tasks={searchedTasks} onTaskClick={handleTaskClick} />{" "}
      {/* استفاده از تسک‌های فیلتر شده */}
    </>
  );
};

export default TaskListPage;
