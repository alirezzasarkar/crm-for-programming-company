// EmployeeList.tsx
import React from "react";
import { FaTrashAlt, FaPencilAlt, FaInfoCircle } from "react-icons/fa";
import { Employee } from "../../pages/EmployeeListPage";
import { Link } from "react-router-dom"; // افزودن این خط

interface EmployeeListProps {
  employees: Employee[];
  onMoreInfoClick: (employee: Employee) => void;
  onDeleteClick: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onMoreInfoClick,
  onDeleteClick,
}) => {
  return (
    <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
      <thead>
        <tr className="text-right">
          <th className="py-2 text-center text-sm font-medium pb-5">ردیف</th>
          <th className="py-2 text-center text-sm font-medium pb-5">
            نام و نام خانوادگی
          </th>
          <th className="py-2 text-center text-sm font-medium pb-5">
            شماره تماس
          </th>
          <th className="py-2 text-center text-sm font-medium pb-5">
            سمت شغلی
          </th>
          <th className="py-2 text-center text-sm font-medium pb-5">
            اطلاعات بیشتر
          </th>
          {/* <th className="py-2 text-center text-sm font-medium pb-5">
            ویرایش اطلاعات
          </th> */}
          <th className="py-2 text-center text-sm font-medium pb-5">حذف</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={employee.id} className="bg-gray-100 hover:bg-gray-200">
            <td className="py-3 text-sm text-center">{index + 1}</td>
            <td className="py-3 text-sm text-center">
              {employee.name} {employee.last_name}
            </td>
            <td className="py-3 text-sm text-center">
              {employee.phone_number}
            </td>
            <td className="py-3 text-sm text-center">
              {employee.work_position}
            </td>
            <td className="py-3 text-sm text-center">
              <FaInfoCircle
                className="text-green-500 cursor-pointer mx-auto"
                onClick={() => onMoreInfoClick(employee)}
              />
            </td>
            {/* <td className="py-3 text-sm text-center">
              <Link
                to={`/dashboard/profile/${employee.id}`}
                className="text-orange-500"
              >
                <FaPencilAlt className="cursor-pointer mx-auto" />
              </Link>
            </td> */}
            <td className="py-3 text-sm text-center">
              <FaTrashAlt
                className="text-red-500 cursor-pointer mx-auto"
                onClick={() => onDeleteClick(employee.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
