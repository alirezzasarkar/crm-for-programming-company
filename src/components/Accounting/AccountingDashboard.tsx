import { FaEllipsisV } from "react-icons/fa";
import TransactionChart from "../Common/TransactionChart"; // Make sure the path is correct
import Title from "../Common/Title";
import { dashboardInfo } from "../../services/accounting"; // Import your API call
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [hoveredTransaction, setHoveredTransaction] = useState(null); // State for hovered transaction

  // Fetch dashboard data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await dashboardInfo();
        setData(dashboardData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  const {
    income_transactions,
    outcome_transactions,
    total_account_balance,
    transactions_grouped_by_5days,
  } = data;

  const handleMouseEnter = (transaction) => {
    setHoveredTransaction(transaction); // Set hovered transaction
  };

  const handleMouseLeave = () => {
    setHoveredTransaction(null); // Clear hovered transaction when mouse leaves
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Income Transactions */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md rtl">
          <Title title="لیست آخرین تراکنش های واریزی" />
          <table className="min-w-full bg-white border-separate border-spacing-y-3">
            <thead>
              <tr className="text-right">
                <th className="py-2 text-center text-sm font-medium">مبلغ</th>
                <th className="py-2 text-center text-sm font-medium">تاریخ</th>
                <th className="py-2 text-center text-sm font-medium">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {income_transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-2 text-sm text-center">
                    {transaction.amount.toLocaleString()} تومان
                  </td>
                  <td className="py-2 text-sm text-center">
                    {new Date(transaction.date).toLocaleDateString("fa-IR")}{" "}
                    {/* Convert to Persian date */}
                  </td>
                  <td
                    className="py-2 text-sm text-center relative"
                    onMouseEnter={() => handleMouseEnter(transaction)} // Show details on hover
                    onMouseLeave={handleMouseLeave} // Hide details on mouse leave
                  >
                    <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
                    {hoveredTransaction?.id === transaction.id && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 w-64 bg-white border rounded shadow-md z-10">
                        <p className="text-sm text-gray-700">
                          {transaction.description || "بدون توضیحات"}
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Outcome Transactions */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md rtl">
          <Title title="لیست آخرین تراکنش های برداشتی" />
          <table className="min-w-full bg-white border-separate border-spacing-y-3">
            <thead>
              <tr className="text-right">
                <th className="py-2 text-center text-sm font-medium">مبلغ</th>
                <th className="py-2 text-center text-sm font-medium">تاریخ</th>
                <th className="py-2 text-center text-sm font-medium">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {outcome_transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-2 text-sm text-center">
                    {transaction.amount.toLocaleString()} تومان
                  </td>
                  <td className="py-2 text-sm text-center">
                    {new Date(transaction.date).toLocaleDateString("fa-IR")}
                  </td>
                  <td
                    className="py-2 text-sm text-center relative"
                    onMouseEnter={() => handleMouseEnter(transaction)} // Show details on hover
                    onMouseLeave={handleMouseLeave} // Hide details on mouse leave
                  >
                    <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
                    {hoveredTransaction?.id === transaction.id && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 w-64 bg-white border rounded shadow-md z-10">
                        <p className="text-sm text-gray-700">
                          {transaction.description || "بدون توضیحات"}
                        </p>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sm:col-span-1">
          <div className="bg-white p-4 sm:p-5 flex rtl justify-between rounded-xl shadow-md">
            <h2 className="text-sm font-medium text-blue-600">
              موجودی فعلی حساب شرکت
            </h2>
            <p className="text-sm font-medium ">
              {total_account_balance.toLocaleString()} تومان
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <Link to="/dashboard/accounting/add-transaction">
              <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
                وارد کردن تراکنش جدید
              </button>
            </Link>
            <Link to="/dashboard/accounting/transaction-list">
              <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
                لیست تراکنش های واریزی
              </button>
            </Link>
            <Link to="/dashboard/accounting/transaction-list">
              <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
                لیست تراکنش های برداشتی
              </button>
            </Link>
            <Link to="/dashboard/accounting/employee-salaries">
              <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md">
                لیست حقوق کارمندان
              </button>
            </Link>
          </div>
          <div className="bg-white rounded shadow-md">
            <TransactionChart
              transactionsGroupedBy5Days={transactions_grouped_by_5days}
            />{" "}
            {/* Pass grouped transactions */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
