import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // اضافه کردن SweetAlert2
import AddContentProject from "../components/Projects/AddContentProduction";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createContentProjects,
  getEmployees,
} from "../services/contentProject"; // Import API functions
import LoadingSpinner from "../components/Common/Loading";

export interface Employee {
  id: number;
  last_name: string;
}

export interface ContentProjectFormInputs {
  id: number;
  full_name: string;
  contact_number: string;
  start_date: string;
  end_date: string;
  photo_frequency: number;
  project_status: string;
  team_members: number[];
  photos_per_month: number;
  videos_per_month: number;
  organization_colors: string;
  collaboration_duration: string;
  contract_file?: FileList;
  damage: string;
  consultation: boolean;
  caption_writing: boolean;
  cover_design: boolean;
  post_scenario_writing: boolean;
  teaser: boolean;
  drone_shot: boolean;
  outside_shoot: boolean;
  out_of_city_shoot: boolean;
}

export const AddContentProductionPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContentProjectFormInputs>();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]); // تغییر به آرایه‌ای از شناسه‌ها (IDها)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // فراخوانی API برای دریافت لیست کارمندان
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        setError("خطا در دریافت اطلاعات کارمندان");
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // به‌روزرسانی فرم با اعضای تیم انتخاب شده
  useEffect(() => {
    setValue("team_members", selectedTeamMembers);
  }, [selectedTeamMembers, setValue]);

  const handleTeamMemberSelect = (id: number) => {
    setSelectedTeamMembers((prev) => [...prev, id]);
  };

  const handleClearSelection = (
    newSelectedMembers: { id: number; last_name: string }[]
  ) => {
    const newSelectedIds = newSelectedMembers.map((member) => member.id);
    setSelectedTeamMembers(newSelectedIds);
  };

  const onSubmit: SubmitHandler<ContentProjectFormInputs> = async (data) => {
    try {
      await createContentProjects(data);
      // استفاده از SweetAlert برای نمایش پیام موفقیت
      Swal.fire({
        icon: "success",
        title: "پروژه با موفقیت ثبت شد!",
        showConfirmButton: true,
        timer: 2000,
      });
    } catch (error) {
      console.error("خطا در ثبت پروژه:", error);

      // نمایش پیام خطا
      Swal.fire({
        icon: "error",
        title: "خطا در ثبت پروژه",
        text: "لطفا دوباره تلاش کنید.",
      });
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
          selectedTeamMembers={employees.filter((emp) =>
            selectedTeamMembers.includes(emp.id)
          )}
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
