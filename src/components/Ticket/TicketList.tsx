import React from "react";
import { FaEllipsisV } from "react-icons/fa";

interface Ticket {
  id: number;
  title: string;
  status: string;
  dateSent: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onDetailsClick: (ticket: Ticket) => void;
  onNewClick: () => void;
  onDeleteClick: (id: number) => void;
}

const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onDetailsClick,
  onNewClick,
  onDeleteClick,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-semibold text-blue-600">لیست تیکت ها</h2>
        <button
          onClick={() => onNewClick()}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          ایجاد تیکت جدید
        </button>
      </div>
      <div className="border-t border-gray-300 w-full"></div>
      <table className="min-w-full bg-white mt-4 border-separate border-spacing-y-3">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium">شماره تیکت</th>
            <th className="py-2 text-center text-sm font-medium">عنوان</th>
            <th className="py-2 text-center text-sm font-medium">وضعیت</th>
            <th className="py-2 text-center text-sm font-medium">
              تاریخ ارسال
            </th>
            <th className="py-2 text-center text-sm font-medium">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={index}
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <td className="py-3 text-sm text-center">{ticket.id}</td>
              <td className="py-3 text-sm text-center">{ticket.title}</td>
              <td
                className={`py-3 text-sm text-center ${
                  ticket.status === "درحال بررسی"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {ticket.status}
              </td>
              <td className="py-3 text-sm text-center">{ticket.dateSent}</td>
              <td className="py-3 text-sm text-center flex justify-around">
                <FaEllipsisV
                  className="text-gray-500 mx-auto cursor-pointer"
                  onClick={() => onDetailsClick(ticket)}
                />
                <button
                  onClick={() => onDeleteClick(ticket.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
