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
    <div className="bg-white p-6 pt-4 rounded-2xl shadow-md rtl">
      <h2 className="text-blue-700 text-md font-bold mb-4">
        کارمندان برتر هفته
      </h2>
      <div className="p-2 rounded-md mb-2">
        <div className="flex justify-between">
          <span className="font-medium text-sm">ردیف</span>
          <span className="font-medium text-sm">نام و نام خانوادگی</span>
          <span className="font-medium text-sm">ساعت کاری</span>
        </div>
      </div>
      <ul className="mt-4">
        {employees.map((employee, index) => (
          <li
            key={employee.id}
            className="flex justify-between items-center p-1 px-3 text-sm rounded-md mb-3 bg-gray-100"
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
