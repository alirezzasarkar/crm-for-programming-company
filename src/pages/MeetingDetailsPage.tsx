import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MeetingDetails from "../components/Meeting/MeetingDetails";
import Title from "../components/Common/Title";
import LoadingSpinner from "../components/Common/Loading";
import Swal from "sweetalert2";

// داده فیک برای جلسه
const fakeMeetingData = {
  id: 1,
  title: "جلسه بررسی پروژه",
  date: "1403/07/01", // تاریخ به فرمت مناسب
  details: "این جلسه برای بررسی پیشرفت پروژه برگزار می‌شود.",
  attachment: "link/to/attachment.pdf", // لینک دانلود فایل پیوست
  minutes:
    "این صورت جلسه شامل نکات مطرح شده در جلسه است. این صورت جلسه شامل نکات مطرح شده در جلسه است.",
  participants: [1, 2, 3], // لیستی از شناسه‌های کارمندان شرکت‌کننده
};

const MeetingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // دریافت ID جلسه از URL
  const [meeting, setMeeting] = useState<typeof fakeMeetingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMeetingDetails = async () => {
      try {
        // استفاده از داده فیک
        setMeeting(fakeMeetingData);
      } catch (error) {
        setError("خطا در بارگذاری جزئیات جلسه");
      } finally {
        setLoading(false);
      }
    };

    getMeetingDetails();
  }, [id]);

  const handleDeleteMeeting = async (meetingId: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        // کامنت کردن کد مربوط به حذف جلسه
        // await deleteMeeting(meetingId); // فراخوانی API برای حذف جلسه
        Swal.fire("حذف شد", "جلسه با موفقیت حذف شد", "success");
        navigate("/dashboard/meetings"); // هدایت به صفحه لیست جلسات
      }
    });
  };

  const handleAddMinutes = (newMinutes: string) => {
    setMeeting((prevMeeting) => ({
      ...prevMeeting!,
      minutes: newMinutes,
    }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Title title={`جزئیات جلسه: ${meeting?.title}`} />
      {meeting && (
        <MeetingDetails
          meeting={meeting}
          onDeleteMeeting={handleDeleteMeeting}
          onAddMinutes={handleAddMinutes}
        />
      )}
    </div>
  );
};

export default MeetingDetailsPage;
