import React from "react";
import { useForm, SubmitHandler, UseFormSetValue } from "react-hook-form";
import Swal from "sweetalert2";
import PersianDatePicker from "../Common/PersianDatePicker";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import { FaUpload, FaSave } from "react-icons/fa";
import { createProject } from "../../services/addProject"; // وارد کردن تابع API
import Title from "../Common/Title";

// تعریف نوع داده‌های فرم
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

  // تابع برای ارسال داده‌ها به سرور
  const onSubmit: SubmitHandler<ProjectFormInputs> = async (data) => {
    try {
      // ارسال داده‌های فرم به API
      await createProject(data, {
        designFiles: data.designFiles,
        contractFile: data.contractFile,
      });

      // نمایش پیام موفقیت با SweetAlert2
      await Swal.fire({
        icon: "success",
        title: "ثبت اطلاعات موفقیت‌آمیز",
        text: "اطلاعات پروژه با موفقیت ثبت شد.",
      });
    } catch (error) {
      // نمایش پیام خطا با SweetAlert2
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خطایی در ثبت اطلاعات پروژه رخ داده است.",
      });
    }
  };

  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="وارد کردن اطلاعات پروژه" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5"
      >
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="projectName"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            نام پروژه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="نام پروژه"
              {...register("projectName", { required: "نام پروژه الزامی است" })}
            />
            {errors.projectName && (
              <p className="text-red-500 text-xs pt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="domainExpiryDate"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام دامین
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام دامین" />
            {errors.domainExpiryDate && (
              <p className="text-red-500 text-xs pt-1">
                {errors.domainExpiryDate.message}
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
            htmlFor="hostingExpiryDate"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام هاست
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام هاست" />
            {errors.hostingExpiryDate && (
              <p className="text-red-500 text-xs pt-1">
                {errors.hostingExpiryDate.message}
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
            htmlFor="clientName"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            نام کارفرما
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="نام کارفرما"
              {...register("clientName", {
                required: "نام کارفرما الزامی است",
              })}
            />
            {errors.clientName && (
              <p className="text-red-500 text-xs pt-1">
                {errors.clientName.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد شماره تماس کارفرما */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="clientContact"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            شماره تماس کارفرما
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="شماره تماس کارفرما"
              {...register("clientContact", {
                required: "شماره تماس کارفرما الزامی است",
              })}
            />
            {errors.clientContact && (
              <p className="text-red-500 text-xs pt-1">
                {errors.clientContact.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد تاریخ شروع */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="startDate"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ شروع
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ شروع" />
            {errors.startDate && (
              <p className="text-red-500 text-xs pt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد وضعیت پروژه */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="projectStatus"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            وضعیت پروژه
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="وضعیت پروژه"
              {...register("projectStatus", {
                required: "وضعیت پروژه الزامی است",
              })}
            />
            {errors.projectStatus && (
              <p className="text-red-500 text-xs pt-1">
                {errors.projectStatus.message}
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
            htmlFor="endDate"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تاریخ اتمام
          </label>
          <div className="w-2/3">
            <PersianDatePicker placeholder="تاریخ اتمام" />
            {errors.endDate && (
              <p className="text-red-500 text-xs pt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>

        {/* فیلد فایل‌های دیزاین */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="designFiles"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            فایل‌های دیزاین
          </label>
          <div className="w-2/3">
            <input
              id="designFiles"
              type="file"
              accept=".zip"
              onChange={(e) => {
                if (e.target.files) {
                  setValue("designFiles", e.target.files);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="designFiles"
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
            htmlFor="contractFile"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            فایل قرارداد
          </label>
          <div className="w-2/3">
            <input
              id="contractFile"
              type="file"
              accept=".zip"
              onChange={(e) => {
                if (e.target.files) {
                  setValue("contractFile", e.target.files);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="contractFile"
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

export default AddProjectPage;
