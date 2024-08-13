import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import Logo from "../Common/Logo";
import { forgotPasswordSchema } from "../../utils/validationSchemas";
import Modal from "../Common/Modal";
import { IoMdLogIn } from "react-icons/io";

interface ForgotPasswordFormData {
  phone: string;
  newPassword: string;
}

const ForgotPassword: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
    // ارسال پیامک به شماره موبایل وارد شده
    setIsModalOpen(true);
  };

  const handleVerificationSubmit = () => {
    // بررسی کد ارسال شده و تغییر رمز عبور
    console.log("کد وارد شده:", verificationCode);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gray-200 to-gray-500">
      <div className="max-w-md w-full mx-auto">
        <Logo />
        <div className="max-w-md w-full mx-auto bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mt-10 mb-4">
          <div className="mb-4 text-center">
            <h2 className="text-lg font-bold text-[#359DF5] mb-10">
              برای تغییر رمز عبور اطلاعات زیر را وارد کنید
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
                placeholder="رمز عبور جدید"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="mt-7 text-center">
              <Button
                type="submit"
                className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
                ارسال
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <Link
                  to="/login"
                  className="text-[#359DF5] hover:text-blue-600"
                >
                  بازگشت به صفحه ورود
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4 text-center text-[#359DF5]">
            کد تأیید را وارد کنید
          </h2>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <Button
            onClick={handleVerificationSubmit}
            className="mt-3 flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            <IoMdLogIn className="mr-2 text-xl transform rotate-180" />
            تأیید
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default ForgotPassword;
