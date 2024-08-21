import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "../../components/Common/TextField";
import Button from "../../components/Common/Button";
import { FaUpload, FaSave } from "react-icons/fa";
import Title from "../Common/Title";
import PersianDatePicker from "../Common/PersianDatePicker";
import Swal from "sweetalert2";

// Define the form data type
interface ProjectFormInputs {
  projectName: string;
  projectManager: string;
  domain: string;
  startDate: string;
  endDate: string;
  domainExpiryDate: string;
  hostingExpiryDate: string;
  team: string;
  subSections: string;
  designTeam: string;
  implementationTeam: string;
  designFiles?: FileList;
  contractFile?: FileList;
  description: string;
}

const ProjectEntry: React.FC = () => {
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
              {...register("projectName")}
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
              {...register("projectManager")}
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
              {...register("domain")}
            />
            {errors.domain && (
              <p className="text-red-500 text-xs pt-1">
                {errors.domain.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="team" className="w-1/5 ml-5 text-gray-700 text-right">
            تیم
          </label>
          <div className="w-2/3">
            <TextField type="text" placeholder="تیم" {...register("team")} />
            {errors.team && (
              <p className="text-red-500 text-xs pt-1">{errors.team.message}</p>
            )}
          </div>
        </div>

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

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="subSections"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            زیر بخش‌ها
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="زیر بخش‌ها"
              {...register("subSections")}
            />
            {errors.subSections && (
              <p className="text-red-500 text-xs pt-1">
                {errors.subSections.message}
              </p>
            )}
          </div>
        </div>

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

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="designTeam"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تیم دیزاین
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="تیم دیزاین"
              {...register("designTeam")}
            />
            {errors.designTeam && (
              <p className="text-red-500 text-xs pt-1">
                {errors.designTeam.message}
              </p>
            )}
          </div>
        </div>

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

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="implementationTeam"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            تیم پیاده‌سازی
          </label>
          <div className="w-2/3">
            <TextField
              type="text"
              placeholder="تیم پیاده‌سازی"
              {...register("implementationTeam")}
            />
            {errors.implementationTeam && (
              <p className="text-red-500 text-xs pt-1">
                {errors.implementationTeam.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="designFiles"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            فایل قرارداد
          </label>
          <div className="w-2/3">
            <input
              id="designFiles"
              type="file"
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
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-xs pt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

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

export default ProjectEntry;
