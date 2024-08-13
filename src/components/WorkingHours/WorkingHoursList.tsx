import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import { useNavigate } from "react-router-dom";

interface WorkTimeEntry {
  index: number;
  name: string;
  team: string;
  timeRecorded: string;
}

const workTimeEntries: WorkTimeEntry[] = [
  {
    index: 1,
    name: "علیرضا سرکار",
    team: "وردپرس",
    timeRecorded: "48 ساعت و 45 دقیقه",
  },
  {
    index: 2,
    name: "علیرضا سرکار",
    team: "وردپرس",
    timeRecorded: "48 ساعت و 45 دقیقه",
  },
  {
    index: 3,
    name: "علیرضا سرکار",
    team: "وردپرس",
    timeRecorded: "48 ساعت و 45 دقیقه",
  },
  {
    index: 4,
    name: "علیرضا سرکار",
    team: "وردپرس",
    timeRecorded: "48 ساعت و 45 دقیقه",
  },
];

const WorkTimeList: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (detail: WorkTimeEntry) => {
    navigate(`/dashboard/work-time/detail/${detail.index}`);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="لیست زمان کاری" />
      <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3 ">
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
                  onClick={() => handleClick(entry)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkTimeList;
