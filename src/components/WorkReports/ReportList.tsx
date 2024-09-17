import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Title from "../Common/Title";
import ReportFilter from "./ReportFilter";
import Search from "../Common/Search";

interface Report {
  index: number;
  name: string;
  team: string;
  status: string;
  date: string;
}

interface ReportListProps {
  reports: Report[];
  teamFilter: string;
  dateFilter: string;
  searchQuery: string;
  teamOptions: string[];
  dateOptions: string[];
  onTeamFilterChange: (team: string) => void;
  onDateFilterChange: (date: string) => void;
  onSearchChange: (query: string) => void;
  onReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  teamFilter,
  dateFilter,
  searchQuery,
  teamOptions,
  dateOptions,
  onTeamFilterChange,
  onDateFilterChange,
  onSearchChange,
  onReportClick,
}) => {
  const filteredReports = reports.filter((report) => {
    const teamMatches =
      teamFilter === "همه تیم‌ها" || report.team === teamFilter;
    const dateMatches =
      dateFilter === "همه زمان‌ها" || report.date === dateFilter;
    return teamMatches && dateMatches;
  });

  return (
    <>
      <div className="flex rtl mb-5">
        <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />

        <ReportFilter
          filter={teamFilter}
          options={teamOptions}
          label="فیلتر بر اساس تیم"
          onFilterChange={onTeamFilterChange}
        />
        <div className="mr-5"></div>
        <ReportFilter
          filter={dateFilter}
          options={dateOptions}
          label="فیلتر بر اساس تاریخ"
          onFilterChange={onDateFilterChange}
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
                    onClick={() => onReportClick(report)}
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
