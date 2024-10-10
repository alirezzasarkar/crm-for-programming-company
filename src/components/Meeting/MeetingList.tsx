import React from "react";
import { FaEllipsisV, FaEdit } from "react-icons/fa";
import moment from "jalali-moment"; // برای تبدیل تاریخ به شمسی

interface Meeting {
  id: number;
  title: string;
  meeting_date: string;
}

interface MeetingListProps {
  meetings: Meeting[];
  onMeetingClick: (meetingId: number) => void;
  onEditMeeting: (meetingId: number) => void;
}

// تابع تبدیل تاریخ به شمسی
const convertToJalali = (date: string) => {
  return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
};

const MeetingList: React.FC<MeetingListProps> = ({
  meetings,
  onMeetingClick,
  onEditMeeting,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg rtl">
      <table className="min-w-full bg-white mt-2 border-separate border-spacing-y-3">
        <thead>
          <tr className="text-right">
            <th className="py-2 text-center text-sm font-medium pb-5">
              عنوان جلسه
            </th>
            <th className="py-2 text-center text-sm font-medium pb-5">
              تاریخ جلسه
            </th>

            <th className="py-2 text-center text-sm font-medium pb-5">
              نمایش جزئیات
            </th>
          </tr>
        </thead>
        <tbody>
          {meetings
            .slice()
            .reverse()
            .map((meeting) => (
              <tr
                key={meeting.id}
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => onMeetingClick(meeting.id)}
              >
                <td className="py-3 text-sm text-center">{meeting.title}</td>
                <td className="py-3 text-sm text-center text-yellow-500">
                  {convertToJalali(meeting.meeting_date)}
                </td>

                <td className="py-3 text-sm text-center">
                  <FaEllipsisV className="text-gray-500 mx-auto" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList;
