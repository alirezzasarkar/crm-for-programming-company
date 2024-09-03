import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import Search from "../Common/Search";

interface WorkTimeEntry {
  id: number;
  name: string;
  team: string;
  timeRecorded: string;
}

interface WorkingHoursListProps {
  workTimeEntries: WorkTimeEntry[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEntryClick: (entry: WorkTimeEntry) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedEntry: WorkTimeEntry) => void;
}

const WorkingHoursList: React.FC<WorkingHoursListProps> = ({
  workTimeEntries,
  searchQuery,
  onSearchChange,
  onEntryClick,
  onDelete,
  onUpdate,
}) => {
  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
      </div>
      <div className="p-4 bg-white rounded shadow-md rtl">
        <Title title="لیست زمان کاری" />
        <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th className="py-2 text-center text-sm font-medium pb-5">
                نام و نام خانوادگی
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">تیم</th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                زمان ثبت شده
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                نمایش جزئیات
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">حذف</th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {workTimeEntries.map((entry, index) => (
              <tr
                key={index}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <td className="py-3 text-sm text-center">{entry.name}</td>
                <td className="py-3 text-sm text-center">{entry.team}</td>
                <td className="py-3 text-sm text-center text-green-500">
                  {entry.timeRecorded}
                </td>
                <td className="py-3 text-sm text-center">
                  <FaEllipsisV
                    className="text-gray-500 mx-auto cursor-pointer"
                    onClick={() => onEntryClick(entry)}
                  />
                </td>
                <td className="py-3 text-sm text-center">
                  <button
                    className="text-red-500"
                    onClick={() => onDelete(entry.id)}
                  >
                    حذف
                  </button>
                </td>
                <td className="py-3 text-sm text-center">
                  <button
                    className="text-blue-500"
                    onClick={() =>
                      onUpdate(entry.id, {
                        ...entry,
                        name: "نام جدید", // برای مثال: نام جدیدی که می‌خواهید ویرایش کنید
                      })
                    }
                  >
                    ویرایش
                  </button>
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
