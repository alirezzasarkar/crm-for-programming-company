import React, { useEffect, useState } from "react";
import AddProject from "../components/Projects/AddProject";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { getEmployees, createProject } from "../services/project";

export interface ProjectFormInputs {
  project_name: string;
  responsible_person: number;
  domain: string;
  start_date: string;
  end_date: string;
  domain_end_date: string;
  host_end_date: string;
  phone_number: string;
  status: string;
  team_members: number[];
  design_files?: FileList;
  contract_files?: FileList;
  description: string;
}

export interface Employee {
  id: number;
  last_name: string;
}

const AddProjectPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormInputs>();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([]);
  const [selectedResponsiblePerson, setSelectedResponsiblePerson] =
    useState<number>(0);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(
          employeesData.map((employee: any) => ({
            id: employee.id,
            last_name: employee.last_name,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch employees", error);
      }
    };

    fetchEmployees();
  }, []);

  // به‌روزرسانی فرم بعد از تغییر اعضای تیم
  useEffect(() => {
    setValue("team_members", selectedTeamMembers);
  }, [selectedTeamMembers, setValue]);

  // به‌روزرسانی فرم بعد از تغییر مسئول پروژه
  useEffect(() => {
    setValue("responsible_person", selectedResponsiblePerson);
  }, [selectedResponsiblePerson, setValue]);

  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    console.log("Submitted data:", data);

    try {
      await createProject(data);
      await Swal.fire({
        icon: "success",
        title: "ثبت اطلاعات موفقیت‌آمیز",
        text: "اطلاعات پروژه با موفقیت ثبت شد",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت اطلاعات پروژه رخ داده است",
      });
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProjectFormInputs
  ) => {
    if (event.target.files) {
      setValue(field, event.target.files);
    }
  };

  const handleTeamMemberSelect = (id: number) => {
    setSelectedTeamMembers((prev) => [...prev, id]);
  };

  const handleResponsiblePersonSelect = (id: number) => {
    setSelectedResponsiblePerson(id);
  };

  const handleClearSelection = (
    newSelectedMembers: { id: number; last_name: string }[]
  ) => {
    const newSelectedIds = newSelectedMembers.map((member) => member.id);
    setSelectedTeamMembers(newSelectedIds);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddProject
        handleFileChange={handleFileChange}
        employees={employees}
        onTeamMemberSelect={handleTeamMemberSelect}
        selectedTeamMembers={employees.filter((emp) =>
          selectedTeamMembers.includes(emp.id)
        )}
        selectedResponsiblePerson={selectedResponsiblePerson}
        onResponsiblePersonSelect={handleResponsiblePersonSelect}
        register={register}
        errors={errors}
        setValue={setValue}
        onClearSelection={handleClearSelection}
      />
    </form>
  );
};

export default AddProjectPage;
