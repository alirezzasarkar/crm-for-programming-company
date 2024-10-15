import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MeetingDetails from "../components/Meeting/MeetingDetails";
import Title from "../components/Common/Title";
import LoadingSpinner from "../components/Common/Loading";
import Swal from "sweetalert2";
import {
  fetchMeetingDetails,
  updateMeetingMinutes,
  deleteMeeting,
} from "../services/meeting"; // Import your API functions here

interface Meeting {
  id: number;
  title: string;
  date: string;
  description: string;
  attachment: string;
  records: string;
  participants: number[];
}

const MeetingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // دریافت ID جلسه از URL
  const [meeting, setMeeting] = useState<Meeting | null>(null); // نوع Meeting را مشخص کنید
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMeetingDetails = async () => {
      try {
        const meetingData = await fetchMeetingDetails(id!); // دریافت جزئیات جلسه از API
        setMeeting(meetingData);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMeeting(meetingId); // فراخوانی API برای حذف جلسه
          Swal.fire("حذف شد", "جلسه با موفقیت حذف شد", "success");
          navigate("/dashboard/meetings/list"); // هدایت به صفحه لیست جلسات
        } catch (error) {
          Swal.fire("خطا", "خطا در حذف جلسه", "error");
        }
      }
    });
  };

  const handleAddRecords = async (newRecords: string) => {
    try {
      await updateMeetingMinutes(meeting!.id, { records: newRecords }); // استفاده از meeting با ! برای اطمینان از وجود آن
      setMeeting((prevMeeting: Meeting | null) => {
        if (prevMeeting) {
          return {
            ...prevMeeting,
            records: newRecords,
          };
        }
        return prevMeeting; // در صورتی که prevMeeting null باشد
      });
    } catch (error) {
      console.error("خطا در به‌روزرسانی صورت جلسه:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Title title={`جزئیات جلسه: ${meeting?.title}`} />
      {meeting && (
        <MeetingDetails
          meeting={meeting}
          onDeleteMeeting={handleDeleteMeeting}
          onAddrecords={handleAddRecords} // به‌روزرسانی نام تابع
        />
      )}
    </div>
  );
};

export default MeetingDetailsPage;
