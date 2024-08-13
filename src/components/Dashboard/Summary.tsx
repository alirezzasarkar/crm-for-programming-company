import React from "react";

const Summary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="bg-white flex rtl justify-around items-baseline p-3 pb-5 rounded-2xl shadow-md">
        <h2 className="text-blue-700 text-md font-bold">
          تعداد کل پروژه های فعال
        </h2>
        <p className="mt-2 text-gray-600 text-md">3</p>
      </div>
      <div className="bg-white flex rtl justify-around items-baseline p-3 pb-5 rounded-2xl shadow-md">
        <h2 className="text-blue-700 text-md font-bold">
          تعداد گزارش‌های کاری ثبت شده
        </h2>
        <p className="mt-2 text-gray-600 text-md">89</p>
      </div>
      <div className="bg-white flex rtl justify-around items-baseline p-3 pb-5 rounded-2xl shadow-md">
        <h2 className="text-blue-700 text-md font-bold">تعداد کل کارکنان</h2>
        <p className="mt-2 text-gray-600 text-md">10</p>
      </div>
    </div>
  );
};

export default Summary;
