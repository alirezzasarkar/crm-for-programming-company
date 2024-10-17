import { useState } from "react";
import AddContentProject from "../components/Projects/AddContentProduction";
import { useForm } from "react-hook-form";
import { ContentProjectFormInputs } from "../components/Projects/AddContentProduction";
import { createContentProjects } from "../services/contentProject"; // Import API function

export const AddContentProductionPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContentProjectFormInputs>();

  const [employees] = useState([]); // بدون اطلاعات پیش‌فرض

  const [selectedTeamMembers, setSelectedTeamMembers] = useState<
    Array<{ id: number; first_name: string; last_name: string }>
  >([]);

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

  const handleClearSelection = (
    newMembers: Array<{ id: number; last_name: string; first_name: string }>
  ) => {
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
