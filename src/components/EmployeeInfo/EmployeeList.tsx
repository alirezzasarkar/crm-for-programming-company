import React, { useState, useMemo } from "react";
import { FaTrashAlt, FaPencilAlt, FaInfoCircle } from "react-icons/fa";
import Title from "../Common/Title";
import EmployeeModal from "./EmployeeModal";
import EmployeeFilter from "./EmployeeFilter";

interface Employee {
  id: number;
  index: number;
  name: string;
  contactNumber: string;
  jobTitle: string;
  nationalId: string;
  birthDate: string;
  email: string;
  profileImage: string;
}

const employeesData: Employee[] = [
  {
    id: 1,
    index: 1,
    name: "علیرضا سرکار",
    contactNumber: "09029828541",
    jobTitle: "مدیر بخش فرانت",
    nationalId: "1234567890",
    birthDate: "1365/05/20",
    email: "alireza@example.com",
    profileImage: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    index: 2,
    name: "علیرضا سرکار",
    contactNumber: "09901032844",
    jobTitle: "مدیر بخش بک اند",
    nationalId: "1234567891",
    birthDate: "1365/05/20",
    email: "alireza@example.com",
    profileImage: "https://via.placeholder.com/150",
  },
  // other employees...
];

const EmployeeList: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "ascending" | "descending";
  } | null>(null);
  const [filter, setFilter] = useState("نام و نام خانوادگی");

  const sortedEmployees = useMemo(() => {
    let sortableEmployees = [...employeesData];
    if (sortConfig !== null) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [sortConfig]);

  const requestSort = (key: keyof Employee) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleMoreInfoClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    const filterKeyMap: { [key: string]: keyof Employee } = {
      "نام و نام خانوادگی": "name",
      "شماره تماس": "contactNumber",
      "سمت شغلی": "jobTitle",
    };
    requestSort(filterKeyMap[newFilter]);
  };

  return (
    <>
      <div className="rtl mb-5">
        <EmployeeFilter
          filter={filter}
          options={["نام و نام خانوادگی", "شماره تماس", "سمت شغلی"]}
          label="مرتب سازی بر اساس"
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست کارمندان" />
        <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-right">
              <th
                className="py-2 text-center text-sm font-medium pb-5 cursor-pointer"
                onClick={() => requestSort("index")}
              >
                ردیف
              </th>
              <th
                className="py-2 text-center text-sm font-medium pb-5 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                نام و نام خانوادگی
              </th>
              <th
                className="py-2 text-center text-sm font-medium pb-5 cursor-pointer"
                onClick={() => requestSort("contactNumber")}
              >
                شماره تماس
              </th>
              <th
                className="py-2 text-center text-sm font-medium pb-5 cursor-pointer"
                onClick={() => requestSort("jobTitle")}
              >
                سمت شغلی
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                اطلاعات بیشتر
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">
                ویرایش اطلاعات
              </th>
              <th className="py-2 text-center text-sm font-medium pb-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee) => (
              <tr key={employee.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="py-3 text-sm text-center">{employee.index}</td>
                <td className="py-3 text-sm text-center">{employee.name}</td>
                <td className="py-3 text-sm text-center">
                  {employee.contactNumber}
                </td>
                <td className="py-3 text-sm text-center">
                  {employee.jobTitle}
                </td>
                <td className="py-3 text-sm text-center">
                  <FaInfoCircle
                    className="text-green-500 cursor-pointer mx-auto"
                    onClick={() => handleMoreInfoClick(employee)}
                  />
                </td>
                <td className="py-3 text-sm text-center">
                  <FaPencilAlt className="text-orange-500 cursor-pointer mx-auto" />
                </td>
                <td className="py-3 text-sm text-center">
                  <FaTrashAlt className="text-red-500 cursor-pointer mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEmployee && (
          <EmployeeModal
            employee={selectedEmployee}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeList;
