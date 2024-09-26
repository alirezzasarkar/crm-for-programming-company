import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/validationSchemas";
import Swal from "sweetalert2";
import PersianDatePicker from "../Common/PersianDatePicker";
import Button from "../../components/Common/Button";
import TextField from "../../components/Common/TextField";
import { FaSave, FaUpload } from "react-icons/fa";
import Title from "../Common/Title";
import Modal from "../Common/Modal"; // Import the Modal component

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
  userProfile: (data: FormData) => Promise<void>; // تغییر نوع ورودی
  userProfileData: ProfileFormInputs;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, userProfileData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(profileSchema),
    defaultValues: userProfileData,
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

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
      const formData = new FormData();

      // افزودن داده‌ها به FormData
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("last_name", data.last_name);
      formData.append("post_code", data.post_code);
      formData.append("work_position", data.work_position);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append("phone_number", data.phone_number);

      // اگر تصویری انتخاب شده باشد، آن را به FormData اضافه کن
      if (data.picture && data.picture.length > 0) {
        formData.append("picture", data.picture[0]); // فقط اولین تصویر را اضافه می‌کنیم
      }

      await userProfile(formData);
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
        <div className="col-span-2 flex mt-2 justify-around w-1/4 mx-auto">
          <Button
            type="button"
            className="bg-orange-500 w-2/4 flex items-center justify-center"
            hoverClass="hover:bg-orange-600"
            onClick={() => setIsPasswordModalOpen(true)} // Open modal on click
          >
            تغییر رمز عبور
          </Button>
        </div>
      </form>

      {isPasswordModalOpen && (
        <Modal onClose={() => setIsPasswordModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle password change here
              setIsPasswordModalOpen(false); // Close the modal after submission
            }}
          >
            <input
              type="text"
              placeholder="شماره تماس خود را وارد کنید"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700"
            />
            <input
              type="password"
              placeholder="رمز جدید را وارد کنید"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 mt-4"
            />
            <button
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 mt-4"
              type="button"
            >
              ارسال کد
            </button>
            <input
              type="text"
              placeholder="کد ارسال شده را وارد کنید"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 mt-4"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-4"
            >
              ثبت اطلاعات
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
