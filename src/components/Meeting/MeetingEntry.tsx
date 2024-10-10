import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import { FaUpload } from "react-icons/fa";
import MyDatePicker from "../Common/PersianDatePicker";
import Swal from "sweetalert2";
import { DateObject } from "react-multi-date-picker";
import { createMeeting } from "../../services/meeting";
import { jwtDecode } from "jwt-decode";
import LoadingSpinner from "../Common/Loading";
import DropdownField from "../Projects/DropdownField";
import { getEmployees } from "../../services/meeting"; // Import getEmployees

interface JwtPayload {
  user_id: number;
}

interface Employee {
  id: number;
  last_name: string;
}

const MeetingEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState<DateObject | null>(null);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [senderId, setSenderId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<
    { id: number; last_name: string }[]
  >([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setSenderId(decoded.user_id);
      } catch (error) {
        console.error("خطا در دیکود کردن JWT:", error);
      }
    }

    // دریافت لیست کارمندان از API
    const fetchEmployees = async () => {
      try {
        const employeeList = await getEmployees();
        setEmployees(employeeList);
      } catch (error) {
        console.error("خطا در دریافت لیست اعضا:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleEmployeeClick = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setSelectedTeamMembers((prev) => [...prev, employee]);
    }
    setDropdownOpen(false);
  };

  const handleRemoveTeamMember = (id: number) => {
    setSelectedTeamMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const selectedTeamMembersNames = selectedTeamMembers
    .map((member) => member.last_name)
    .join(", ");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "فایل بیش از حد بزرگ است",
          text: "اندازه فایل باید کمتر از 10 مگابایت باشد.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!senderId) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "شناسه فرستنده موجود نیست.",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", details);
      if (meetingDate) {
        formData.append("meeting_date", meetingDate.toDate().toISOString());
      }
      if (file) {
        formData.append("file", file);
      }
      formData.append("sender", senderId.toString());

      await createMeeting(formData);

      await Swal.fire({
        icon: "success",
        title: "جلسه با موفقیت ثبت شد",
        text: "جلسه شما با موفقیت ارسال شد.",
      });

      setTitle("");
      setMeetingDate(null);
      setDetails("");
      setFile(null);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "در ثبت جلسه خطایی رخ داد.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "تمامی اطلاعات وارد شده از بین خواهد رفت.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله، لغو کن",
      cancelButtonText: "انصراف",
    }).then((result) => {
      if (result.isConfirmed) {
        setTitle("");
        setMeetingDate(null);
        setDetails("");
        setFile(null);
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="وارد کردن جلسه" />
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان جلسه"
              className="w-full p-2 border rounded-xl"
            />
          </div>
          <div>
            <DropdownField
              id="team_members"
              label=""
              placeholder="اعضای جلسه را انتخاب کنید"
              employees={employees}
              selectedItems={selectedTeamMembers}
              dropdownOpen={dropdownOpen}
              handleToggle={handleDropdownToggle}
              handleSelect={handleEmployeeClick}
              handleRemove={handleRemoveTeamMember}
              value={selectedTeamMembersNames}
              errors={{}}
            />
          </div>
          <div>
            <MyDatePicker
              placeholder="تاریخ جلسه"
              onChange={(date: DateObject | null) => setMeetingDate(date)}
            />
          </div>
        </div>
        <div className="mb-4">
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="جزئیات"
            className="w-full p-2 border rounded-xl h-24"
          />
        </div>
        <div className="mb-4">
          <div className="w-1/3">
            <input
              id="meetingFile"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="meetingFile"
              className="flex items-center cursor-pointer"
            >
              <span className="text-gray-400 border rounded-xl py-2 px-3 rounded-lg w-4/6">
                انتخاب فایل
              </span>
              <FaUpload className="text-gray-400 mr-2" />
            </label>
          </div>
        </div>
        <div className="flex justify-start mt-10">
          <button
            type="submit"
            className="px-10 py-2 bg-blue-500 text-white rounded-xl"
          >
            ثبت جلسه
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-11 py-2 mr-3 bg-red-500 text-white rounded-xl"
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingEntry;
