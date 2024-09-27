import React, { useState, useEffect } from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import Swal from "sweetalert2";
import {
  getUserProfile,
  updateUserProfile,
  sendOtpCode,
  changePassword,
} from "../services/profile"; // تغییر مسیر به profileAPI
import LoadingSpinner from "../components/Common/LoadingSpinner"; // اضافه کردن کامپوننت لودینگ اسپینر

const ProfilePage: React.FC = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false); // مدیریت حالت لودینگ

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true); // شروع لودینگ
      try {
        const data = await getUserProfile();
        setUserProfileData(data);
      } catch (error) {
        Swal.fire({
          title: "خطا",
          text: "مشکلی در بارگیری اطلاعات کاربری پیش آمد.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      } finally {
        setIsLoading(false); // پایان لودینگ
      }
    };

    fetchUserProfile();
  }, []);

  const userProfile = async (data: any) => {
    setIsLoading(true); // شروع لودینگ
    try {
      await updateUserProfile(data);
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
    } finally {
      setIsLoading(false); // پایان لودینگ
    }
  };

  const handlePasswordChange: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const otpCode = formData.get("otpCode") as string;
    const newPassword = formData.get("newPassword") as string;

    setIsLoading(true); // شروع لودینگ
    try {
      await changePassword({ otpCode, newPassword });

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
    } finally {
      setIsLoading(false); // پایان لودینگ
    }
  };

  const sendOtpCodeHandler = async () => {
    setIsLoading(true); // شروع لودینگ
    try {
      await sendOtpCode();

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
    } finally {
      setIsLoading(false); // پایان لودینگ
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />} {/* نمایش اسپینر در زمان لودینگ */}
      <UserProfile
        userProfile={userProfile}
        handlePasswordChange={handlePasswordChange}
        sendOtpCode={sendOtpCodeHandler}
        isPasswordModalOpen={isPasswordModalOpen}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
        userProfileData={userProfileData}
      />
    </>
  );
};

export default ProfilePage;
