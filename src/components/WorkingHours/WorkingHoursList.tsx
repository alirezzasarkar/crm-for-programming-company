import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import Search from "../Common/Search";
import moment from "jalali-moment"; // Import jalali-moment for day of the week

interface WorkTimeEntry {
  id: number;
  user: number;
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
              <th className="py-2 text-center text-sm font-medium pb-5">
                تاریخ ثبت
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                روز هفته
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                زمان ثبت شده
              </th>
              {/* <th className="py-2 text-center text-sm font-medium pb-5">
                نمایش جزئیات
              </th> */}
            </tr>
          </thead>
          <tbody>
            {workTimeEntries.map((entry, index) => (
              <tr
                key={index}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <td className="py-3 text-sm text-center">{entry.user}</td>
                <td className="py-3 text-sm text-center">
                  {entry.jalali_date}
                </td>{" "}
                {/* Display Jalali date */}
                <td className="py-3 text-sm text-center">
                  {moment(entry.jalali_date, "jYYYY/jMM/jDD")
                    .locale("fa")
                    .format("dddd")}{" "}
                  {/* Display day of the week in Persian */}
                </td>
                <td className="py-3 text-sm text-center text-green-500">
                  {entry.total_worked_time}
                </td>
                {/* <td className="py-3 text-sm text-center">
                  <FaEllipsisV
                    className="text-gray-500 mx-auto cursor-pointer"
                    onClick={() => onEntryClick(entry)}
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkingHoursList;
