import { useState, useEffect } from "react";
import AddContentProject from "../components/Projects/AddContentProduction";
import { useForm } from "react-hook-form";
import { ContentProjectFormInputs } from "../components/Projects/AddContentProduction";
import {
  createContentProjects,
  getEmployees,
} from "../services/contentProject"; // Import API functions
import LoadingSpinner from "../components/Common/Loading";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

export const AddContentProductionPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContentProjectFormInputs>();

  const [employees, setEmployees] = useState<Employee[]>([]); // تعریف نوع آرایه به عنوان Employee[]
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<Employee[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true); // برای حالت بارگذاری
  const [error, setError] = useState<string | null>(null); // برای مدیریت خطا

  // useEffect برای فراخوانی API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(); // فراخوانی API
        setEmployees(data); // ذخیره داده‌های دریافت‌شده
      } catch (error) {
        setError("خطا در دریافت اطلاعات کارمندان");
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false); // اتمام حالت بارگذاری
      }
    };

    fetchEmployees(); // فراخوانی تابع
  }, []); // اجرا فقط در بارگذاری اولیه

  const handleTeamMemberSelect = (id: number) => {
    const selectedEmployee = employees.find((employee) => employee.id === id);
    if (
      selectedEmployee &&
      !selectedTeamMembers.some((member) => member.id === id)
    ) {
      setSelectedTeamMembers((prevMembers) => [
        ...prevMembers,
        selectedEmployee,
      ]);
    }
  };

  const handleClearSelection = (newMembers: Employee[]) => {
    setSelectedTeamMembers(newMembers);
  };

  const onSubmit = async (data: ContentProjectFormInputs) => {
    try {
      const result = await createContentProjects(data);
      console.log("پروژه با موفقیت ایجاد شد:", result);
      // پیام موفقیت یا ریدایرکت
    } catch (error) {
      console.error("خطا در ثبت پروژه:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddContentProject
          employees={employees}
          selectedTeamMembers={selectedTeamMembers}
          register={register}
          setValue={setValue}
          errors={errors}
          onTeamMemberSelect={handleTeamMemberSelect}
          onClearSelection={handleClearSelection}
        />
      </form>
    </>
  );
};
