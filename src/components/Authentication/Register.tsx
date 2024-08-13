import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { registerSchema } from "../../utils/validationSchemas";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

interface RegisterFormData {
  username: string;
  phone: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    // انجام عملیات ثبت‌نام
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <Logo />
      <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-bold text-[#359DF5] mb-10">
            برای ثبت نام اطلاعات زیر را وارد کنید
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-right">
            <TextField
              type="text"
              placeholder="نام کاربری"
              {...register("username", { required: "نام کاربری الزامی است" })}
            />
            {errors.username && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4 text-right">
            <TextField
              type="text"
              placeholder="شماره موبایل"
              pattern="\d*"
              {...register("phone", { required: "شماره موبایل الزامی است" })}
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
              {...register("password", { required: "رمز عبور الزامی است" })}
            />
            {errors.password && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mt-7 text-center">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
              ثبت نام
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/login" className="text-[#359DF5] hover:text-blue-600">
              آیا حساب کاربری دارید؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
