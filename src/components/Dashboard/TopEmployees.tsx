import React from "react";

const TopEmployees: React.FC = () => {
  const employees = [
    { id: 1, name: "علیرضا سرکار", workingHours: 30 },
    { id: 2, name: "علی محمدی", workingHours: 28 },
    { id: 3, name: "مریم رضایی", workingHours: 25 },
    { id: 4, name: "احمد حسینی", workingHours: 22 },
    { id: 5, name: "زهرا کریمی", workingHours: 20 },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md rtl">
      <h2 className="text-blue-700 text-sm md:text-md font-bold mb-3 md:mb-4">
        کارمندان برتر هفته
      </h2>
      <div className="p-2 rounded-md mb-2">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="font-medium">ردیف</span>
          <span className="font-medium">نام و نام خانوادگی</span>
          <span className="font-medium">ساعت کاری</span>
        </div>
      </div>
      <ul className="mt-2">
        {employees.map((employee, index) => (
          <li
            key={employee.id}
            className="flex justify-between items-center p-2 rounded-md mb-2 bg-gray-100 text-xs md:text-sm"
          >
            <span>{index + 1}</span>
            <span>{employee.name}</span>
            <span>{employee.workingHours} ساعت</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopEmployees;
