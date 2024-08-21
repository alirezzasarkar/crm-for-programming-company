import React, { useState } from "react";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import TaskFilter from "./TaskFilter";
import { useNavigate } from "react-router-dom";
import Search from "../Common/Search";

interface Task {
  index: number;
  sender: string;
  team: string;
  title: string;
  deliveryDate: string;
  status: string;
  details: string;
  type: "sent" | "received";
}

const tasks: Task[] = [
  {
    index: 1,
    sender: "سجاد باقریان",
    team: "وردپرس",
    title: "این یک متن تستی است",
    deliveryDate: "1403/03/01",
    status: "انجام شده",
    details: "این یک متن تستی از طرف سجاد باقریان، به علیرضا سرکار می باشد",
    type: "sent",
  },
  {
    index: 2,
    sender: "علی مرادی",
    team: "فرانت اند",
    title: "این یک متن تستی است",
    deliveryDate: "1403/03/01",
    status: "در حال انجام",
    details: "این یک متن تستی از طرف علی مرادی، به علیرضا سرکار می باشد",
    type: "received",
  },
  // More tasks...
];

const TaskListPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("sent");
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => task.type === filter);

  const handleTaskClick = (task: Task) => {
    navigate(`/dashboard/tasks/detail/${task.index}`);
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست تسک ها" />
        <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th className="py-2 text-center text-sm font-medium pb-5">
                ردیف
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                ارسال شده از
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                عنوان
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                زمان تحویل
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                وضعیت
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                نمایش جزئیات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={index}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <td className="py-3 text-sm text-center">{task.index}</td>
                <td className="py-3 text-sm text-center">{task.sender}</td>
                <td className="py-3 text-sm text-center">{task.title}</td>
                <td className="py-3 text-sm text-center">
                  {task.deliveryDate}
                </td>
                <td className="py-3 text-sm text-center flex justify-center items-center">
                  {task.status}
                  <FaCheckCircle className="text-green-500 mr-2" />
                </td>
                <td className="py-3 text-sm text-center">
                  <FaEllipsisV
                    className="text-gray-500 mx-auto cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskListPage;
