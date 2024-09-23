import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaFileInvoice } from "react-icons/fa";
import Title from "../Common/Title";
import { fetchSalaries } from "../../services/accounting"; // ایمپورت API
import moment from "jalali-moment"; // برای تبدیل تاریخ به شمسی

interface Transaction {
  id: number;
  date: string;
  amount: string;
  description?: string; // Optional for details
  file?: string; // Optional for invoice display
}

const TransactionList: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(
    null
  );

  // دریافت داده‌های API
  useEffect(() => {
    const getSalaries = async () => {
      try {
        const data = await fetchSalaries();
        setTransactionList(data);
      } catch (error) {
        console.error("خطا در دریافت لیست حقوق:", error);
      }
    };

    getSalaries();
  }, []);

  const handleInvoiceClick = (file: string | undefined) => {
    if (file) {
      window.open(file, "_blank"); // باز کردن تصویر در یک تب جدید
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="items-center mb-4">
        <Title title="لیست واریزی حقوق کارمندان" />
        <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="py-2 text-center text-sm font-medium">ردیف</th>
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
                <td className="py-3 text-sm text-center">
                  {moment(transaction.date)
                    .locale("fa")
                    .format("jYYYY/jMM/jDD")}{" "}
                  {/* تبدیل تاریخ به شمسی */}
                </td>
                <td className="py-3 text-sm text-center">
                  {transaction.amount} تومان
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
                <td className="py-3 text-center relative text-green-500">
                  <div className="inline-block">
                    <FaFileInvoice
                      className="cursor-pointer"
                      onClick={() => handleInvoiceClick(transaction.file)} // باز کردن فاکتور در تب جدید
                    />
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
