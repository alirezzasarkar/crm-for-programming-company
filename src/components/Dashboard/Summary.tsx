import React from "react";

const Summary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
      <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-md">
        <h2 className="text-blue-700 text-sm md:text-md font-bold">
          تعداد کل پروژه های فعال
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-md">3</p>
      </div>
      <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-md">
        <h2 className="text-blue-700 text-sm md:text-md font-bold">
          تعداد گزارش‌های کاری ثبت شده
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-md">89</p>
      </div>
      <div className="bg-white flex flex-col justify-center items-center p-4 rounded-lg shadow-md">
        <h2 className="text-blue-700 text-sm md:text-md font-bold">
          تعداد کل کارکنان
        </h2>
        <p className="mt-2 text-gray-600 text-sm md:text-md">10</p>
      </div>
    </div>
  );
};

export default Summary;
