import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { forgotPasswordSchema } from "../../utils/validationSchemas";
import Swal from "sweetalert2";
import { IoMdLogIn } from "react-icons/io";

interface ForgotPasswordFormData {
  phone: string;
  newPassword: string;
}

const ForgotPassword: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const { value: code } = await Swal.fire({
        title: "کد تأیید را وارد کنید",
        input: "text",
        inputPlaceholder: "کد تأیید",
        showCancelButton: true,
        confirmButtonText: "تأیید",
        cancelButtonText: "انصراف",
        inputValidator: (value) => {
          if (!value) {
            return "لطفا کد تأیید را وارد کنید";
          }
        },
      });

      if (code) {
        setVerificationCode(code);

        console.log("کد وارد شده:", code);

        Swal.fire("رمز عبور با موفقیت تغییر یافت", "", "success");
      }
    } catch (error) {
      Swal.fire("خطا", "خطایی در پردازش درخواست شما رخ داد.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-200 to-gray-500">
      <div className="max-w-md w-full mx-auto p-4">
        <Logo />
        <div className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
          <div className="text-center mb-10">
            <h2 className="text-lg font-bold text-blue-600">
              برای تغییر رمز عبور اطلاعات زیر را وارد کنید
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <TextField
                type="text"
                placeholder="شماره موبایل"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <TextField
                type="password"
                placeholder="رمز عبور جدید"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="text-center mt-7">
              <Button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
                ارسال
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <Link to="/login" className="text-blue-600 hover:text-blue-700">
                  بازگشت به صفحه ورود
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
