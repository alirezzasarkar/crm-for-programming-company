import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/validationSchemas";
import TextField from "../../components/Common/TextField";
import Button from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";
import { FaUpload, FaSave } from "react-icons/fa";
import Title from "../Common/Title";
import PersianDatePicker from "../Common/PersianDatePicker";
import Swal from "sweetalert2";

interface ProfileFormInputs {
  email: string;
  profileImage?: FileList;
  fullName: string;
  nationalId: string;
  jobTitle: string;
  birthDate: string;
  phone: string;
  newPassword?: string;
  confirmNewPassword?: string;
  otpCode?: string;
}

const Profile: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(profileSchema),
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const userProfile: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: "موفقیت",
        text: "اطلاعات کاربری با موفقیت ذخیره شد.",
        icon: "success",
        confirmButtonText: "باشه",
      });
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "مشکلی در ذخیره اطلاعات پیش آمد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const handlePasswordChange: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      // Simulate a password change request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: "موفقیت",
        text: "رمز عبور با موفقیت تغییر یافت.",
        icon: "success",
        confirmButtonText: "باشه",
      });

      setIsPasswordModalOpen(false);
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "مشکلی در تغییر رمز عبور پیش آمد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const sendOtpCode = async () => {
    try {
      // Simulate sending OTP code
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: "موفقیت",
        text: "کد تایید با موفقیت ارسال شد.",
        icon: "success",
        confirmButtonText: "باشه",
      });
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "مشکلی در ارسال کد تایید پیش آمد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="اطلاعات کاربری شما" />
      <form
        onSubmit={handleSubmit(userProfile)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5"
      >
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="fullName" className="w-1/3 text-gray-700 text-right">
            نام و نام خانوادگی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="نام و نام خانوادگی"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs pt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="email" className="w-1/3 text-gray-700 text-right">
            ایمیل
          </label>
          <div className="w-2/4">
            <TextField type="text" placeholder="ایمیل" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-xs pt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="nationalId"
            className="w-1/3 text-gray-700 text-right"
          >
            کدملی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="کدملی"
              {...register("nationalId")}
            />
            {errors.nationalId && (
              <p className="text-red-500 text-xs pt-1">
                {errors.nationalId.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="jobTitle" className="w-1/3 text-gray-700 text-right">
            سمت شغلی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="سمت شغلی"
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-xs pt-1">
                {errors.jobTitle.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="birthDate" className="w-1/3 text-gray-700 text-right">
            تاریخ تولد
          </label>
          <div className="w-2/4">
            <PersianDatePicker placeholder="تاریخ" />
            {errors.birthDate && (
              <p className="text-red-500 text-xs pt-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="profileImage"
            className="w-1/3 text-gray-700 text-right"
          >
            آپلود تصویر
          </label>
          <div className="w-2/4">
            <input
              id="profileImage"
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setValue("profileImage", e.target.files);
                }
              }}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="flex items-center cursor-pointer"
            >
              <span className="text-gray-400 border border-gray-200 py-2 px-3 rounded-xl w-3/6">
                انتخاب فایل
              </span>
              <FaUpload className="text-gray-400 mr-2" />
            </label>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="phone" className="w-1/3 text-gray-700 text-right">
            شماره تماس
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="شماره تماس"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs pt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 flex mt-20 justify-around w-1/4 mr-auto ml-auto">
          <Button
            type="submit"
            className="bg-green-500 w-2/4 flex items-center justify-center"
            hoverClass="hover:bg-green-600"
          >
            ثبت اطلاعات
            <FaSave className="mr-3" />
          </Button>
          <Button
            type="button"
            onClick={() => setIsPasswordModalOpen(true)}
            className="bg-yellow-500 w-2/4 mr-2"
            hoverClass="hover:bg-yellow-600"
          >
            تغییر رمز عبور
          </Button>
        </div>
      </form>

      {isPasswordModalOpen && (
        <Modal onClose={() => setIsPasswordModalOpen(false)}>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4 mt-5">
              <label
                htmlFor="otpCode"
                className="block text-gray-700 text-right mb-2"
              >
                کد تایید
              </label>
              <div>
                <TextField
                  type="text"
                  placeholder="کد تایید"
                  {...register("otpCode")}
                />
                <Button type="button" className="mt-4" onClick={sendOtpCode}>
                  ارسال کد
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-right mb-2"
              >
                رمز جدید
              </label>
              <TextField
                type="password"
                placeholder="رمز جدید"
                {...register("newPassword")}
              />
            </div>
            <Button type="submit">تایید</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
