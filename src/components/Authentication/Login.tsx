import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdLogIn } from "react-icons/io";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { loginSchema } from "../../utils/validationSchemas";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface LoginFormData {
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // منطق ورود شما

    Swal.fire({
      title: "ورود موفقیت‌آمیز",
      text: "شما با موفقیت وارد شدید",
      icon: "success",
      confirmButtonText: "باشه",
      confirmButtonColor: "#3b82f6",
    });
  };

  return (
    <div className="max-w-md w-full mx-auto p-4">
      <Logo />
      <div className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
        <div className="text-center mb-10">
          <h2 className="text-lg font-bold text-blue-600">
            برای ورود اطلاعات زیر را وارد کنید
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
              placeholder="رمز عبور"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="/forget-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              فراموشی رمز عبور
            </Link>
          </div>
          <div className="mt-7">
            <Button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
              ورود
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/register" className="text-blue-600 hover:text-blue-700">
              آیا می‌خواهید ثبت‌نام کنید؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
