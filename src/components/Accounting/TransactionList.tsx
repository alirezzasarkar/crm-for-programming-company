import React, { useState } from "react";
import { FaInfoCircle, FaFileInvoice } from "react-icons/fa";
import Title from "../Common/Title";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  description: string;
  invoiceImage: string;
}

const depositTransactions: Transaction[] = [
  {
    id: 1,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
    description: "این تراکنش مربوط به تسویه حساب ماهانه است.",
    invoiceImage: "/path/to/invoice1.jpg", // Replace with actual image path
  },
  // Additional transactions...
];

const withdrawalTransactions: Transaction[] = [
  {
    id: 1,
    name: "حمیدرضا کریمی",
    date: "1403/03/03",
    amount: "50,000,000 تومان",
    description: "این تراکنش مربوط به برداشت از حساب شخصی است.",
    invoiceImage: "/path/to/invoice2.jpg", // Replace with actual image path
  },
  // Additional transactions...
];

const EmployeeSalaries: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdrawal">(
    "deposit"
  );
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(
    null
  );
  const [hoveredInvoice, setHoveredInvoice] = useState<number | null>(null);

  const renderTransactionTable = (transactions: Transaction[]) => (
    <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
      <thead>
        <tr>
          <th className="py-2 text-center text-sm font-medium">ردیف</th>
          <th className="py-2 text-center text-sm font-medium">
            نام و نام خانوادگی
          </th>
          <th className="py-2 text-center text-sm font-medium">تاریخ</th>
          <th className="py-2 text-center text-sm font-medium">مبلغ</th>
          <th className="py-2 text-center text-sm font-medium text-blue-500">
            توضیحات
          </th>
          <th className="py-2 text-center text-sm font-medium text-green-500">
            نمایش فاکتور
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr
            key={transaction.id}
            className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <td className="py-3 text-sm text-center">{index + 1}</td>
            <td className="py-3 text-sm text-center">{transaction.name}</td>
            <td className="py-3 text-sm text-center">{transaction.date}</td>
            <td className="py-3 text-sm text-center">{transaction.amount}</td>
            <td className="py-3 text-center text-blue-500 relative">
              <div
                onMouseEnter={() => setHoveredTransaction(transaction.id)}
                onMouseLeave={() => setHoveredTransaction(null)}
                className="inline-block"
              >
                <FaInfoCircle className="cursor-pointer" />
                {hoveredTransaction === transaction.id && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-48 p-2 bg-white border rounded-lg shadow-lg z-10">
                    <p className="text-xs text-gray-700">
                      {transaction.description}
                    </p>
                  </div>
                )}
              </div>
            </td>
            <td className="py-3 text-center text-green-500 relative">
              <div
                onMouseEnter={() => setHoveredInvoice(transaction.id)}
                onMouseLeave={() => setHoveredInvoice(null)}
                className="inline-block"
              >
                <FaFileInvoice className="cursor-pointer" />
                {hoveredInvoice === transaction.id && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-48 p-2 bg-white border rounded-lg shadow-lg z-10">
                    <img
                      src={transaction.invoiceImage}
                      alt="Invoice"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="bg-white rounded-lg w-full">
        <div className="items-center mb-4">
          <Title title="لیست تراکنش‌ها" />
          <div className="flex justify-center mb-5 mt-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "deposit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => setActiveTab("deposit")}
            >
              تراکنش‌های واریزی
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "withdrawal"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => setActiveTab("withdrawal")}
            >
              تراکنش‌های برداشتی
            </button>
          </div>
          {activeTab === "deposit" &&
            renderTransactionTable(depositTransactions)}
          {activeTab === "withdrawal" &&
            renderTransactionTable(withdrawalTransactions)}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalaries;
