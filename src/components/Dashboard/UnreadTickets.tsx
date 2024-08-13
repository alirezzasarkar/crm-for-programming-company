import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const UnreadTickets: React.FC = () => {
  const tickets = [
    { id: 1, name: "علیرضا سرکار", index: 1 },
    { id: 2, name: "علیرضا سرکار", index: 2 },
    { id: 3, name: "علیرضا سرکار", index: 3 },
  ];

  return (
    <div className="bg-white p-6 pt-4 rounded-2xl shadow-md rtl">
      <h2 className="text-blue-700 text-md font-bold mb-4">
        تیکت های خوانده نشده
      </h2>
      <div className="p-2 rounded-md mb-2">
        <div className="flex justify-between">
          <span className="font-medium text-sm">ردیف</span>
          <span className="font-medium text-sm">نام و نام خانوادگی</span>
          <span className="font-medium text-sm">جزئیات</span>
        </div>
      </div>
      <ul className="mt-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex justify-between items-center p-1 px-3 text-sm rounded-md mb-3 bg-gray-100"
          >
            <span>{ticket.index}</span>
            <span>{ticket.name}</span>
            <button className="text-green-500">
              <FaInfoCircle className="text-green-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnreadTickets;
