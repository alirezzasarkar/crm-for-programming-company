import React, { useState } from "react";
import { FaInfoCircle, FaFileInvoice } from "react-icons/fa";
import Title from "../Common/Title";

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  description?: string; // Optional for details
  invoiceImage?: string; // Optional for invoice display
}

const transactionList: Transaction[] = [
  {
    id: 1,
    name: "علیرضا سرکار",
    date: "1403/03/02",
    amount: "100,000,000 تومان",
    description: "این تراکنش مربوط به پرداخت حقوق ماهانه است.",
    invoiceImage: "/path/to/invoice1.jpg",
  },
  // Add more transactions as needed
];

const TransactionList: React.FC = () => {
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(
    null
  );
  const [hoveredInvoice, setHoveredInvoice] = useState<number | null>(null);

  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="items-center mb-4">
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
              <th className="py-2 text-center text-sm font-medium text-blue-500">
                جزئیات
              </th>
              <th className="py-2 text-center text-sm font-medium text-green-500">
                نمایش فاکتور
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
                <td className="py-3 text-center text-blue-500 relative">
                  <div
                    onMouseEnter={() => setHoveredTransaction(transaction.id)}
                    onMouseLeave={() => setHoveredTransaction(null)}
                    className="inline-block"
                  >
                    <FaInfoCircle className="cursor-pointer" />
                    {hoveredTransaction === transaction.id &&
                      transaction.description && (
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
                    {hoveredInvoice === transaction.id &&
                      transaction.invoiceImage && (
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
      </div>
    </div>
  );
};

export default TransactionList;
