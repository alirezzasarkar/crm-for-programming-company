import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import Search from "../Common/Search";
import moment from "jalali-moment"; // Import jalali-moment for day of the week

interface WorkTimeEntry {
  id: number;
  user: string; // Change from number to string to store last name
  team: string;
  total_worked_time: string;
  jalali_date: string; // Include jalali_date here
}

interface WorkingHoursListProps {
  workTimeEntries: WorkTimeEntry[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEntryClick: (entry: WorkTimeEntry) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedEntry: WorkTimeEntry) => void;
  setPeriod: (period: "week" | "month" | "all") => void; // اضافه کردن پروپ برای setPeriod
}

const WorkingHoursList: React.FC<WorkingHoursListProps> = ({
  workTimeEntries,
  searchQuery,
  onSearchChange,
  onEntryClick,
  onDelete,
  onUpdate,
  setPeriod, // دریافت setPeriod به عنوان یک پروپ
}) => {
  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 mr-10 w-24 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => setPeriod("all")}
          >
            همه
          </button>
          <button
            className="bg-blue-500 mx-4 w-24 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => setPeriod("week")}
          >
            هفتگی
          </button>
          <button
            className="bg-blue-500 w-24 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => setPeriod("month")}
          >
            ماهانه
          </button>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow-md rtl">
        <Title title="لیست زمان کاری" />

        <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th className="py-2 text-center text-sm font-medium pb-5">
                نام خانوادگی
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                تاریخ ثبت
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                روز هفته
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                زمان ثبت شده
              </th>
            </tr>
          </thead>
          <tbody>
            {workTimeEntries
              .slice()
              .reverse()
              .map((entry) => (
                <tr
                  key={entry.id} // تغییر key به entry.id به جای index
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => onEntryClick(entry)} // افزودن قابلیت کلیک روی ردیف
                >
                  <td className="py-3 text-sm text-center">{entry.user}</td>
                  <td className="py-3 text-sm text-center">
                    {entry.jalali_date}
                  </td>
                  <td className="py-3 text-sm text-center">
                    {moment(entry.jalali_date, "jYYYY/jMM/jDD")
                      .locale("fa")
                      .format("dddd")}
                  </td>
                  <td className="py-3 text-sm text-center text-green-500">
                    {entry.total_worked_time}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkingHoursList;
