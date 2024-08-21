import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const UnreadReports: React.FC = () => {
  const reports = [
    { id: 1, name: "علیرضا سرکار", project: "قاب میلوینیون", index: 1 },
    { id: 2, name: "علیرضا سرکار", project: "قاب میلوینیون", index: 2 },
    { id: 3, name: "علیرضا سرکار", project: "قاب میلوینیون", index: 3 },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md rtl">
      <h2 className="text-blue-700 text-sm md:text-md font-bold mb-3 md:mb-4">
        گزارش کار های خوانده نشده
      </h2>
      <div className="p-2 rounded-md mb-2">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="font-medium">ردیف</span>
          <span className="font-medium">نام و نام خانوادگی</span>
          <span className="font-medium">جزئیات</span>
        </div>
      </div>
      <ul className="mt-2">
        {reports.map((report) => (
          <li
            key={report.id}
            className="flex justify-between items-center p-2 rounded-md mb-2 bg-gray-100 text-xs md:text-sm"
          >
            <span>{report.index}</span>
            <span>{report.name}</span>
            <button className="text-green-500">
              <FaInfoCircle className="text-green-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnreadReports;
