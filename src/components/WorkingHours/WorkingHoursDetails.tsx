import React from "react";
import moment from "jalali-moment";
import Title from "../Common/Title";

interface WorkingHoursDetailsProps {
  date: string;
  recordedTime: string;
}

const WorkingHoursDetails: React.FC<WorkingHoursDetailsProps> = ({
  date,
  recordedTime,
}) => {
  // Format the date
  const formattedDate = moment(date, "jYYYY/jMM/jDD")
    .locale("fa")
    .format("dddd، jYYYY/jMM/jDD");

  return (
    <div className="p-4 bg-white rounded shadow-md rtl">
      <Title title="جزئیات تایم کاری" />

      <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3 ">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium pb-5">تاریخ</th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              زمان ثبت شده
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="py-3 px-2 text-sm text-center">{formattedDate}</td>
            <td className="py-3 px-2 text-sm text-center text-green-500">
              {recordedTime}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WorkingHoursDetails;
