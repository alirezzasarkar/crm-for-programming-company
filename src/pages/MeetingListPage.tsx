import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeetingList from "../components/Meeting/MeetingList";
import LoadingSpinner from "../components/Common/Loading";
// import { fetchMeetings } from "../services/meeting"; // سرویس API برای دریافت جلسات
import Swal from "sweetalert2";
import Title from "../components/Common/Title";
import { fetchMeetings } from "../services/meeting";

interface Meeting {
  id: number;
  title: string;
  meeting_date: string;
}

const MeetingListPage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // دریافت جلسات از API
  useEffect(() => {
    const getMeetings = async () => {
      try {
        // استفاده از دیتای فیک به جای API
        const response = await fetchMeetings();
        setMeetings(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطا در دریافت جلسات",
          text: "مشکلی در بارگذاری جلسات پیش آمده است.",
        });
      } finally {
        setLoading(false);
      }
    };

    getMeetings();
  }, []);

  // تابع برای مدیریت کلیک روی جلسه و نمایش جزئیات
  const handleMeetingClick = (meetingId: number) => {
    navigate(`/dashboard/meetings/detail/${meetingId}`);
  };

  // تابع برای مدیریت ویرایش جلسه
  const handleEditMeeting = (meetingId: number) => {
    navigate(`/dashboard/meetings/edit/${meetingId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست جلسات" />
        <MeetingList
          meetings={meetings}
          onMeetingClick={handleMeetingClick}
          onEditMeeting={handleEditMeeting}
        />
      </div>
    </>
  );
};

export default MeetingListPage;
