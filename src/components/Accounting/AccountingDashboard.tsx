import { FaEllipsisV } from "react-icons/fa";
import TransactionChart from "../Common/TransactionChart"; // Make sure the path is correct
import Title from "../Common/Title";

const Dashboard = () => {
  const transactions = [
    { id: 1, amount: "100,000  تومان", date: "1403/03/02" },
    { id: 2, amount: "100,000  تومان", date: "1403/03/02" },
    { id: 3, amount: "100,000 تومان", date: "1403/03/02" },
    // ... more transactions
  ];

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="grid grid-cols-3 gap-6">
        {/* Withdrawals */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1 rtl">
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
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-2 text-sm text-center">
                    {transaction.amount}
                  </td>
                  <td className="py-2 text-sm text-center">
                    {transaction.date}
                  </td>
                  <td className="py-2 text-sm text-center">
                    <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deposits */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
          <Title title="لیست آخرین تراکنش های برداشتی" />
          <table className="min-w-full bg-white border-separate border-spacing-y-3 rtl">
            <thead>
              <tr className="text-right">
                <th className="py-2 text-center text-sm font-medium">مبلغ</th>
                <th className="py-2 text-center text-sm font-medium">تاریخ</th>
                <th className="py-2 text-center text-sm font-medium">جزئیات</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-2 text-sm text-center">
                    {transaction.amount}
                  </td>
                  <td className="py-2 text-sm text-center">
                    {transaction.date}
                  </td>
                  <td className="py-2 text-sm text-center">
                    <FaEllipsisV className="text-gray-500 mx-auto cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-5 flex rtl justify-between rounded-xl shadow-md">
            <h2 className="text-sm font-medium text-blue-600">
              موجودی فعلی حساب شرکت
            </h2>
            <p className="text-sm font-medium ">100,000,000 تومان</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
              وارد کردن تراکنش جدید
            </button>
            <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
              لیست تراکنش های واریزی
            </button>
            <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md mb-2">
              لیست تراکنش های برداشتی
            </button>
            <button className="w-full text-sm py-2 px-4 gradient-navbar text-white rounded-md">
              لیست حقوق کارمندان
            </button>
          </div>
          <div className="bg-white rounded shadow-md">
            <TransactionChart /> {/* This is where the chart is included */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
