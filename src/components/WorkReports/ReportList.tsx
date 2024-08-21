// ReportList.tsx
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import ReportFilter from "./ReportFilter";
import { useNavigate } from "react-router-dom";

interface Report {
  index: number;
  name: string;
  team: string;
  status: string;
  date: string;
}

const reports: Report[] = [
  {
    index: 1,
    name: "علیرضا سرکار",
    team: "تیم طراحی وبسایت",
    status: "بررسی شده",
    date: "1403/03/01",
  },
  {
    index: 2,
    name: "علیرضا سرکار",
    team: "تیم تولید محتوا",
    status: "درحال بررسی",
    date: "1403/03/01",
  },
  // More reports...
];

const ReportList: React.FC = () => {
  const [teamFilter, setTeamFilter] = useState<string>("همه تیم‌ها");
  const [dateFilter, setDateFilter] = useState<string>("همه زمان‌ها");

  const teamOptions = ["همه تیم‌ها", "تیم طراحی وبسایت", "تیم تولید محتوا"];
  const dateOptions = ["همه زمان‌ها", "هفته گذشته", "ماه گذشته"];

  const filteredReports = reports.filter((report) => {
    const teamMatches =
      teamFilter === "همه تیم‌ها" || report.team === teamFilter;
    const dateMatches =
      dateFilter === "همه زمان‌ها" || report.date === dateFilter;
    return teamMatches && dateMatches;
  });

  const navigate = useNavigate();

  const handleClick = (detail: Report) => {
    navigate(`/dashboard/reports/detail/${detail.index}`);
  };

  return (
    <>
      <div className="flex rtl mb-5">
        <ReportFilter
          filter={teamFilter}
          options={teamOptions}
          label="فیلتر بر اساس تیم"
          onFilterChange={setTeamFilter}
        />
        <div className="mr-5"></div>
        <ReportFilter
          filter={dateFilter}
          options={dateOptions}
          label="فیلتر بر اساس تاریخ"
          onFilterChange={setDateFilter}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست گزارش کار" />
        <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th className="py-2 text-center text-sm font-medium pb-5">
                نام و نام خانوادگی
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">تیم</th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                وضعیت
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                تاریخ ثبت
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                نمایش جزئیات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                <td className="py-3 text-sm text-center">{report.name}</td>
                <td className="py-3 text-sm text-center">{report.team}</td>
                <td
                  className={`py-3 text-sm text-center ${
                    report.status === "بررسی شده"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {report.status}
                </td>
                <td className="py-3 text-sm text-center">{report.date}</td>
                <td className="py-3 text-sm flex justify-center items-center">
                  <FaEllipsisV
                    className="text-gray-500 cursor-pointer"
                    onClick={() => handleClick(report)}
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

export default ReportList;
