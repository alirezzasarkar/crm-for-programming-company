import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Title from "../Common/Title";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
}

const transactionList: Transaction[] = [
  {
    id: 1,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  // ... سایر تراکنش‌ها
];

const EmployeeSalaries: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md rtl">
      <div className="mb-4">
        <Title title="لیست واریزی حقوق کارمندان" />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="py-2 text-center text-xs sm:text-sm font-medium">
                  ردیف
                </th>
                <th className="py-2 text-center text-xs sm:text-sm font-medium">
                  نام و نام خانوادگی
                </th>
                <th className="py-2 text-center text-xs sm:text-sm font-medium">
                  تاریخ
                </th>
                <th className="py-2 text-center text-xs sm:text-sm font-medium">
                  مبلغ
                </th>
                <th className="py-2 text-center text-xs sm:text-sm font-medium text-yellow-500">
                  ویرایش تراکنش
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionList.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-3 text-xs sm:text-sm text-center">
                    {index + 1}
                  </td>
                  <td className="py-3 text-xs sm:text-sm text-center">
                    {transaction.name}
                  </td>
                  <td className="py-3 text-xs sm:text-sm text-center">
                    {transaction.date}
                  </td>
                  <td className="py-3 text-xs sm:text-sm text-center">
                    {transaction.amount}
                  </td>
                  <td className="py-3 text-center text-yellow-500">
                    <FaEdit className="inline cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaries;
