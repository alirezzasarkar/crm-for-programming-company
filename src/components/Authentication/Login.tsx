import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoMdLogIn } from "react-icons/io";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { loginSchema } from "../../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../Authentication/AuthContext";

interface LoginFormData {
  phone_number: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const { login, isAuthenticated } = useAuth(); // گرفتن وضعیت لاگین از AuthContext
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true); // آغاز بارگذاری
    try {
      const loginResult = await login(data); // دریافت نتیجه لاگین

      // چک کردن نتیجه لاگین
      if (loginResult) {
        Swal.fire({
          title: "ورود موفقیت‌آمیز",
          text: "شما با موفقیت وارد شدید",
          icon: "success",
          confirmButtonText: "باشه",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          navigate("/dashboard"); // هدایت به داشبورد
        });
      } else {
        Swal.fire({
          title: "ورود ناموفق",
          text: "اطلاعات وارد شده اشتباه است.",
          icon: "error",
          confirmButtonText: "باشه",
          confirmButtonColor: "#f87171",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "خطا",
        text: "ورود ناموفق بود",
        icon: "error",
        confirmButtonText: "باشه",
        confirmButtonColor: "#f87171",
      });
    } finally {
      setLoading(false); // پایان بارگذاری
    }
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
              className={`flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // غیرفعال کردن دکمه در زمان بارگذاری
            >
              {loading ? (
                <span>در حال ورود...</span> // نمایش متن لودینگ
              ) : (
                <>
                  <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
                  ورود
                </>
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            <Link to="/register" className="text-blue-600 hover:text-blue-700">
              آیا حساب کاربری دارید؟
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
