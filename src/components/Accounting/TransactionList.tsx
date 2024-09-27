import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaFileInvoice } from "react-icons/fa";
import Title from "../Common/Title";
import { fetchTransactions } from "../../services/accounting"; // Import API
import moment from "jalali-moment"; // Import the jalaali-moment library
import LoadingSpinner from "../Common/Loading"; // Import LoadingSpinner component

interface Transaction {
  id: number;
  date: string; // تاریخ در فرمت میلادی
  amount: string;
  description: string;
  file: string; // فاکتور
  transaction_type: "income" | "expense"; // نوع تراکنش
}

const TransactionList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hoveredTransaction, setHoveredTransaction] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  // Fetch transactions from the API
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("خطا در دریافت تراکنش‌ها:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getTransactions();
  }, []);

  const renderTransactionTable = (filteredTransactions: Transaction[]) => (
    <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
      <thead>
        <tr>
          <th className="py-2 text-center text-sm font-medium">ردیف</th>
          <th className="py-2 text-center text-sm font-medium">تاریخ</th>
          <th className="py-2 text-center text-sm font-medium">مبلغ</th>
          <th className="py-2 text-center text-sm font-medium text-blue-500">
            توضیحات
          </th>
          <th className="py-2 text-center text-sm font-medium text-green-500">
            فاکتور
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredTransactions.map((transaction, index) => (
          <tr
            key={transaction.id}
            className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <td className="py-3 text-sm text-center">{index + 1}</td>
            <td className="py-3 text-sm text-center">
              {moment(transaction.date).locale("fa").format("jYYYY/jMM/jDD")}{" "}
              {/* Convert to Shamsi */}
            </td>
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
            <td className="py-3 text-center text-green-500">
              <div className="inline-block">
                <a
                  href={transaction.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFileInvoice className="cursor-pointer" />
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Filter transactions based on the active tab
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.transaction_type === activeTab
  );

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is being fetched
  }

  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="bg-white rounded-lg w-full">
        <div className="items-center mb-4">
          <Title title="لیست تراکنش‌ها" />
          <div className="flex justify-center mb-5 mt-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "income"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => setActiveTab("income")}
            >
              تراکنش‌های واریزی
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "expense"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded`}
              onClick={() => setActiveTab("expense")}
            >
              تراکنش‌های برداشتی
            </button>
          </div>
          {renderTransactionTable(filteredTransactions)}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
