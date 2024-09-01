import React from "react";
import AddProject from "../components/Projects/AddProject";
import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import Swal from "sweetalert2";
import PersianDatePicker from "../components/Common/PersianDatePicker";
import TextField from "../components/Common/TextField";
import Button from "../components/Common/Button";
import { FaUpload, FaSave } from "react-icons/fa";

// Define the form data type
interface ProjectFormInputs {
  projectName: string;
  projectManager: string;
  domain: string;
  startDate: string;
  endDate: string;
  domainExpiryDate: string;
  hostingExpiryDate: string;
  clientName: string;
  clientContact: string;
  projectStatus: string;
  teamMembers: string;
  designFiles?: FileList;
  contractFile?: FileList;
  description: string;
}

type ProjectFormField = keyof ProjectFormInputs;

const AddProjectPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormInputs>();

  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    try {
      console.log("Project Data:", data);
      // Implement your logic to submit the data to the server here

      // Show success message with SweetAlert2
      await Swal.fire({
        icon: "success",
        title: "ثبت اطلاعات موفقیت‌آمیز",
        text: "اطلاعات پروژه با موفقیت ثبت شد.",
      });
    } catch (error) {
      // Show error message with SweetAlert2
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت اطلاعات پروژه رخ داده است.",
      });
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ProjectFormField
  ) => {
    if (event.target.files) {
      setValue(field, event.target.files);
    }
  };

  return (
    <AddProject
      register={register}
      handleSubmit={handleSubmit}
      setValue={setValue as UseFormSetValue<ProjectFormInputs>}
      errors={errors}
      onSubmit={onSubmit}
      handleFileChange={handleFileChange}
    />
  );
};

export default AddProjectPage;
