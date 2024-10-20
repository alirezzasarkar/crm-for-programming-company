import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { registerSchema } from "../../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import Swal from "sweetalert2";
import { useAuth } from "./AuthContext";

interface RegisterFormData {
  first_name: string; // Added first_name
  last_name: string;
  phone_number: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data); // Call the register function from AuthContext
      Swal.fire({
        title: "درخواست ثبت نام شما ثبت شد",
        text: "لطفا منتظر تایید بمانید",
        icon: "success",
        confirmButtonText: "باشه",
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        navigate("/login"); // Navigate to login page upon successful registration
      });
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "ثبت‌نام ناموفق بود",
        icon: "error",
        confirmButtonText: "باشه",
        confirmButtonColor: "#f87171",
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-4">
      <Logo />
      <div className="bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
        <div className="text-center mb-10">
          <h2 className="text-lg font-bold text-blue-600">
            برای ثبت نام اطلاعات زیر را وارد کنید
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <TextField
              type="text"
              placeholder="نام"
              {...register("first_name")} // Added first_name
            />
            {errors.first_name && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <TextField
              type="text"
              placeholder="نام خانوادگی"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <TextField
              type="text"
              placeholder="شماره موبایل"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-red-500 mt-2 text-sm">
                {errors.phone_number.message}
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
          <div className="text-center">
            <Button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
              ثبت نام
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              آیا حساب کاربری دارید؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
