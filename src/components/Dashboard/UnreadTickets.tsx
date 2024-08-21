import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const UnreadTickets: React.FC = () => {
  const tickets = [
    { id: 1, name: "علیرضا سرکار", index: 1 },
    { id: 2, name: "علیرضا سرکار", index: 2 },
    { id: 3, name: "علیرضا سرکار", index: 3 },
  ];

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md rtl">
      <h2 className="text-blue-700 text-sm md:text-md font-bold mb-3 md:mb-4">
        تیکت های خوانده نشده
      </h2>
      <div className="p-2 rounded-md mb-2">
        <div className="flex justify-between text-xs md:text-sm">
          <span className="font-medium">ردیف</span>
          <span className="font-medium">نام و نام خانوادگی</span>
          <span className="font-medium">جزئیات</span>
        </div>
      </div>
      <ul className="mt-2">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex justify-between items-center p-2 rounded-md mb-2 bg-gray-100 text-xs md:text-sm"
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
