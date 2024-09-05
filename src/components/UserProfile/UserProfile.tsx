import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/validationSchemas";
import Swal from "sweetalert2";
import PersianDatePicker from "../Common/PersianDatePicker";
import Button from "../../components/Common/Button";
import TextField from "../../components/Common/TextField";
import { FaSave, FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Title from "../Common/Title";

interface ProfileFormInputs {
  email: string;
  picture?: FileList;
  name: string;
  last_name: string;
  post_code: string;
  work_position: string;
  date_of_birth: string;
  phone_number: string;
  newPassword?: string;
  confirmNewPassword?: string;
  otpCode?: string;
}

interface ProfileProps {
  userProfile: (data: ProfileFormInputs) => Promise<void>;
  handlePasswordChange: React.FormEventHandler<HTMLFormElement>;
  sendOtpCode: () => Promise<void>;
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userProfileData: ProfileFormInputs;
}

const Profile: React.FC<ProfileProps> = ({
  userProfile,
  handlePasswordChange,
  isPasswordModalOpen,
  setIsPasswordModalOpen,
  userProfileData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(profileSchema),
    defaultValues: userProfileData,
  });

  useEffect(() => {
    if (userProfileData) {
      setValue("email", userProfileData.email);
      setValue("name", userProfileData.name);
      setValue("last_name", userProfileData.last_name);
      setValue("post_code", userProfileData.post_code);
      setValue("work_position", userProfileData.work_position);
      setValue("date_of_birth", userProfileData.date_of_birth);
      setValue("phone_number", userProfileData.phone_number);
    }
  }, [userProfileData, setValue]);

  const showErrorAlert = (message: string) => {
    Swal.fire({
      title: "خطا",
      text: message,
      icon: "error",
      confirmButtonText: "باشه",
    });
  };

  const showSuccessAlert = (message: string) => {
    Swal.fire({
      title: "موفقیت",
      text: message,
      icon: "success",
      confirmButtonText: "باشه",
    });
  };

  const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
    try {
      await userProfile(data);
      showSuccessAlert("اطلاعات کاربری با موفقیت ذخیره شد.");
    } catch (error) {
      showErrorAlert("مشکلی در ذخیره اطلاعات کاربری پیش آمد.");
    }
  };

  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="اطلاعات کاربری شما" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5"
      >
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="name" className="w-1/3 text-gray-700 text-right">
            نام
          </label>
          <div className="w-2/4">
            <TextField type="text" placeholder="نام" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs pt-1">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="last_name" className="w-1/3 text-gray-700 text-right">
            نام و نام خانوادگی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="نام و نام خانوادگی"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs pt-1">
                {errors.last_name.message}
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
              <p className="text-red-500 text-xs pt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="post_code" className="w-1/3 text-gray-700 text-right">
            کدملی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="کدملی"
              {...register("post_code")}
            />
            {errors.post_code && (
              <p className="text-red-500 text-xs pt-1">
                {errors.post_code.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="work_position"
            className="w-1/3 text-gray-700 text-right"
          >
            سمت شغلی
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="سمت شغلی"
              {...register("work_position")}
            />
            {errors.work_position && (
              <p className="text-red-500 text-xs pt-1">
                {errors.work_position.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="date_of_birth"
            className="w-1/3 text-gray-700 text-right"
          >
            تاریخ تولد
          </label>
          <div className="w-2/4">
            <PersianDatePicker
              placeholder="تاریخ"
              onChange={(date) => {
                if (date) {
                  const formattedDate = date.format("YYYY-MM-DD"); // فرمت دلخواه خود را استفاده کنید
                  setValue("date_of_birth", formattedDate, {
                    shouldValidate: true,
                  });
                } else {
                  setValue("date_of_birth", "", { shouldValidate: true }); // اگر تاریخ انتخاب نشده است
                }
              }}
            />
            {errors.date_of_birth && (
              <p className="text-red-500 text-xs pt-1">
                {errors.date_of_birth.message}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label htmlFor="picture" className="w-1/3 text-gray-700 text-right">
            آپلود تصویر
          </label>
          <div className="w-2/4">
            <input
              id="picture"
              type="file"
              onChange={(e) =>
                e.target.files && setValue("picture", e.target.files)
              }
              className="hidden"
            />
            <label
              htmlFor="picture"
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
          <label
            htmlFor="phone_number"
            className="w-1/3 text-gray-700 text-right"
          >
            شماره تماس
          </label>
          <div className="w-2/4">
            <TextField
              type="text"
              placeholder="شماره تماس"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs pt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-span-2 flex mt-20 justify-around w-1/4 mx-auto">
          <Button
            type="submit"
            className="bg-green-500 w-2/4 flex items-center justify-center"
            hoverClass="hover:bg-green-600"
          >
            ثبت اطلاعات
            <FaSave className="mr-3" />
          </Button>
        </div>
      </form>

      <div className="mt-10 w-1/4 mx-auto">
        <Button
          type="button"
          className="bg-orange-500 w-full flex items-center justify-center"
          hoverClass="hover:bg-orange-600"
        >
          تغییر رمز عبور
        </Button>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3 relative">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <MdClose className="h-6 w-6" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">تغییر رمز عبور</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="otpCode" className="block text-gray-700">
                    کد OTP
                  </label>
                  <input
                    id="otpCode"
                    type="text"
                    name="otpCode"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-gray-700">
                    رمز عبور جدید
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-gray-700"
                  >
                    تأیید رمز عبور جدید
                  </label>
                  <input
                    id="confirmNewPassword"
                    type="password"
                    name="confirmNewPassword"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    تغییر رمز عبور
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
