import React from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import PersianDatePicker from "../Common/PersianDatePicker";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import { FaUpload, FaSave } from "react-icons/fa";
import Title from "../Common/Title";

// تعریف نوع داده‌های فرم
interface ProjectFormInputs {
  project_name: string;
  projectManager: string;
  domain: string;
  start_date: string;
  end_date: string;
  domain_end_date: string;
  host_end_date: string;
  manager_full_name: string;
  phone_number: string;
  status: string;
  teamMembers: string;
  design_files?: FileList;
  contract_files?: FileList;
  description: string;
}

interface AddProjectProps {
  register: UseFormRegister<ProjectFormInputs>;
  handleSubmit: UseFormHandleSubmit<ProjectFormInputs>;
  setValue: UseFormSetValue<ProjectFormInputs>;
  errors: FieldErrors<ProjectFormInputs>;
  onSubmit: (data: ProjectFormInputs) => void;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProjectFormInputs
  ) => void;
}

const AddProject: React.FC<AddProjectProps> = ({
  register,
  handleSubmit,
  setValue,
  errors,
  onSubmit,
  handleFileChange,
}) => {
  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="وارد کردن اطلاعات پروژه" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5"
      >
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="project_name"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            نام پروژه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="نام پروژه"
              {...register("project_name", {
                required: "نام پروژه الزامی است",
              })}
            />
            {errors.project_name && (
              <p className="text-red-500 text-xs pt-1">
                {errors.project_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="domain_end_date"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام دامین
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام دامین" />
            {errors.domain_end_date && (
              <p className="text-red-500 text-xs pt-1">
                {errors.domain_end_date.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="projectManager"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            مدیر پروژه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="مدیر پروژه"
              {...register("projectManager", {
                required: "مدیر پروژه الزامی است",
              })}
            />
            {errors.projectManager && (
              <p className="text-red-500 text-xs pt-1">
                {errors.projectManager.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="host_end_date"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام هاست
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام هاست" />
            {errors.host_end_date && (
              <p className="text-red-500 text-xs pt-1">
                {errors.host_end_date.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="domain"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            دامنه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="دامنه"
              {...register("domain", { required: "دامنه الزامی است" })}
            />
            {errors.domain && (
              <p className="text-red-500 text-xs pt-1">
                {errors.domain.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد نام کارفرما */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="manager_full_name"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            نام کارفرما
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="نام کارفرما"
              {...register("manager_full_name", {
                required: "نام کارفرما الزامی است",
              })}
            />
            {errors.manager_full_name && (
              <p className="text-red-500 text-xs pt-1">
                {errors.manager_full_name.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد شماره تماس کارفرما */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="phone_number"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            شماره تماس کارفرما
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="شماره تماس کارفرما"
              {...register("phone_number", {
                required: "شماره تماس کارفرما الزامی است",
              })}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs pt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد تاریخ شروع */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="start_date"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ شروع
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ شروع" />
            {errors.start_date && (
              <p className="text-red-500 text-xs pt-1">
                {errors.start_date.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد وضعیت پروژه */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="status"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            وضعیت پروژه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="وضعیت پروژه"
              {...register("status", {
                required: "وضعیت پروژه الزامی است",
              })}
            />
            {errors.status && (
              <p className="text-red-500 text-xs pt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد اعضای تیم */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="teamMembers"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            اعضای تیم
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="اعضای تیم"
              {...register("teamMembers", { required: "اعضای تیم الزامی است" })}
            />
            {errors.teamMembers && (
              <p className="text-red-500 text-xs pt-1">
                {errors.teamMembers.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد تاریخ اتمام */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="end_date"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام" />
            {errors.end_date && (
              <p className="text-red-500 text-xs pt-1">
                {errors.end_date.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد فایل‌های دیزاین */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="design_files"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            فایل‌های دیزاین
          </label>
          <div className="w-2/3">
            <input
              id="design_files"
              type="file"
              accept=".zip"
              onChange={(e) => {
                if (e.target.files) {
                  setValue("design_files", e.target.files);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="design_files"
              className="flex items-center cursor-pointer"
            >
              <span className="text-gray-400 border border-gray-200 py-2 px-3 rounded-xl">
                آپلود به صورت فایل زیپ
              </span>
              <FaUpload className="text-gray-400 mr-2" />
            </label>
          </div>
        </div>

        {/* فیلد فایل قرارداد */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="contract_files"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            فایل قرارداد
          </label>
          <div className="w-2/3">
            <input
              id="contract_files"
              type="file"
              accept=".zip"
              onChange={(e) => {
                if (e.target.files) {
                  setValue("contract_files", e.target.files);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="contract_files"
              className="flex items-center cursor-pointer"
            >
              <span className="text-gray-400 border border-gray-200 py-2 px-3 rounded-xl">
                آپلود به صورت فایل زیپ
              </span>
              <FaUpload className="text-gray-400 mr-2" />
            </label>
          </div>
        </div>

        {/* فیلد توضیحات */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="description"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            توضیحات
          </label>
          <div className="w-2/3">
            <textarea
              id="description"
              placeholder="توضیحات"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("description", { required: "توضیحات الزامی است" })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs pt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* دکمه ثبت اطلاعات */}
        <div className="col-span-2 flex justify-end w-2/5 mt-10 mx-auto">
          <Button
            type="submit"
            className="bg-green-500 w-2/5 flex items-center justify-center"
            hoverClass="hover:bg-green-600"
          >
            ثبت اطلاعات
            <FaSave className="mr-3 " />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
