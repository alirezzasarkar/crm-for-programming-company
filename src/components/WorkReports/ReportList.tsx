import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import moment from "jalali-moment";
import Title from "../Common/Title";
import ReportFilter from "./ReportFilter";
import Search from "../Common/Search";

interface Report {
  id: number;
  user: number;
  last_name: string;
  team: string;
  is_approved: boolean;
  date: string;
  content: string; // این ویژگی را اضافه کنید تا در هر دو جا یکسان باشد
}

interface ReportListProps {
  reports: Report[];
  dateFilter: string;
  searchQuery: string;
  dateOptions: string[];
  onDateFilterChange: (date: string) => void;
  onSearchChange: (query: string) => void;
  onReportClick: (report: Report) => void;
}

const ReportList: React.FC<ReportListProps> = ({
  reports,
  dateFilter,
  searchQuery,
  dateOptions,
  onDateFilterChange,
  onSearchChange,
  onReportClick,
}) => {
  // اضافه کردن فیلتر جستجو و تاریخ
  const filteredReports = reports.filter((report) => {
    const dateMatches =
      dateFilter === "همه زمان‌ها" || report.date === dateFilter;

    const searchMatches =
      searchQuery === "" ||
      report.last_name.toLowerCase().includes(searchQuery.toLowerCase()); // فیلتر بر اساس نام خانوادگی

    return dateMatches && searchMatches; // فیلتر تاریخ و جستجو
  });

  return (
    <>
      <div className="flex rtl mb-5">
        <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
        <div className="mr-5"></div>
        {/* <ReportFilter
          filter={dateFilter}
          options={dateOptions}
          label="فیلتر بر اساس تاریخ"
          onFilterChange={onDateFilterChange}
        /> */}
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
            {filteredReports
              .slice()
              .reverse()
              .map((report, id) => (
                <tr key={id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="py-3 text-sm text-center">
                    {report.last_name}
                  </td>
                  <td
                    className={`py-3 text-sm text-center ${
                      report.is_approved ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {report.is_approved ? "بررسی شده" : "بررسی نشده"}
                  </td>
                  <td className="py-3 text-sm text-center">
                    {moment(report.date).format("jYYYY/jMM/jDD")}{" "}
                    {/* Convert to Jalali */}
                  </td>
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
