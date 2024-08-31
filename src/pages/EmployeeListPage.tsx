// EmployeeListPage.tsx
import React, { useState, useMemo } from "react";
import EmployeeList from "../components/EmployeeInfo/EmployeeList";
import EmployeeModal from "../components/EmployeeInfo/EmployeeModal";
import EmployeeFilter from "../components/EmployeeInfo/EmployeeFilter";
import Title from "../components/Common/Title";

// صادر کردن نوع Employee
export interface Employee {
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

const initialEmployeesData: Employee[] = [
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

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployeesData);
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
    let sortableEmployees = [...employees];
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
  }, [employees, sortConfig]);

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

  const handleDeleteEmployee = (id: number) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
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
        <EmployeeList
          employees={sortedEmployees}
          onMoreInfoClick={handleMoreInfoClick}
          onDeleteClick={handleDeleteEmployee}
        />
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

export default EmployeeListPage;
