import React, { useState } from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import Swal from "sweetalert2";

const ProfilePage: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const userProfile = async (data: any) => {
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

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <UserProfile
        userProfile={userProfile}
        handlePasswordChange={handlePasswordChange}
        sendOtpCode={sendOtpCode}
        isPasswordModalOpen={isPasswordModalOpen}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
      />
    </>
  );
};

export default ProfilePage;
