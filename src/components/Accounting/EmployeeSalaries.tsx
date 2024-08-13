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
  {
    id: 2,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 3,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 4,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 5,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 6,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 7,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
  {
    id: 8,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
  },
];

const EmployeeSalaries: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="bg-white rounded-lg  w-full max-w-5xl">
        <Title title="لیست واریزی حقوق کارمندان" />
        <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="py-2 text-center text-sm font-medium">ردیف</th>
              <th className="py-2 text-center text-sm font-medium">
                نام و نام خانوادگی
              </th>
              <th className="py-2 text-center text-sm font-medium">تاریخ</th>
              <th className="py-2 text-center text-sm font-medium">مبلغ</th>
              <th className="py-2 text-center text-sm font-medium text-yellow-500">
                ویرایش تراکنش
              </th>
              <th className="py-2 text-center text-sm font-medium text-red-600">
                حذف تراکنش
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <td className="py-3 text-sm text-center">{index + 1}</td>
                <td className="py-3 text-sm text-center">{transaction.name}</td>
                <td className="py-3 text-sm text-center">{transaction.date}</td>
                <td className="py-3 text-sm text-center">
                  {transaction.amount}
                </td>
                <td className="py-3 text-center text-yellow-500">
                  <FaEdit className="inline cursor-pointer" />
                </td>
                <td className="py-3 text-center text-red-600">
                  <FaTrashAlt className="inline cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSalaries;
