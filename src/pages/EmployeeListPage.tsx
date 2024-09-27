// src/pages/EmployeeListPage.tsx
import React, { useState, useMemo, useEffect } from "react";
import EmployeeList from "../components/EmployeeInfo/EmployeeList";
import EmployeeModal from "../components/EmployeeInfo/EmployeeModal";
import EmployeeFilter from "../components/EmployeeInfo/EmployeeFilter";
import Title from "../components/Common/Title";
import { getEmployees, deleteEmployee } from "../services/employee";
import LoadingSpinner from "../components/Common/Loading"; // Import LoadingSpinner component

export interface Employee {
  id: number;
  index: number;
  name: string;
  last_name: string;
  phone_number: string;
  work_position: string;
  post_code: string;
  date_of_birth: string;
  email: string;
  picture: string;
}

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "ascending" | "descending";
  } | null>(null);
  const [filter, setFilter] = useState("نام و نام خانوادگی");
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchEmployees();
  }, []);

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
      "شماره تماس": "phone_number",
      "سمت شغلی": "work_position",
    };
    requestSort(filterKeyMap[newFilter]);
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while data is being fetched
  }

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
