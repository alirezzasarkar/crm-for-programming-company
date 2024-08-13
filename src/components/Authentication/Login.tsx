import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdLogIn } from "react-icons/io"; // Import icon for login button
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { loginSchema } from "../../utils/validationSchemas";
import { Link } from "react-router-dom";

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
    console.log(data);
    // انجام عملیات ورود
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Logo />
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-bold text-[#359DF5] mb-10">
            برای ورود اطلاعات زیر را وارد کنید
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-right">
            <TextField
              type="text"
              placeholder="شماره موبایل"
              pattern="\d*"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="mb-4 text-right">
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
          <div className="flex items-center justify-between rtl">
            <Link
              to="/forget-password"
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-600"
            >
              فراموشی رمز عبور
            </Link>
          </div>
          <div className="mt-7">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
              ورود
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/register" className="text-[#359DF5] hover:text-blue-600">
              آیا می‌خواهید ثبت‌نام کنید؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
