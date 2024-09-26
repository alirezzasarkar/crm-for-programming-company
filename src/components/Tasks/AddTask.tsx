import React, { useEffect, useState } from "react";
import Title from "../Common/Title";
import { FaUpload } from "react-icons/fa";
import MyDatePicker from "../Common/PersianDatePicker";
import Swal from "sweetalert2";
import { DateObject } from "react-multi-date-picker";
import { getEmployees, createTask } from "../../services/task";
import { jwtDecode } from "jwt-decode"; // برای دیکود کردن JWT

interface Employee {
  id: number;
  last_name: string;
}

interface JwtPayload {
  user_id: number;
}

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState<number | "">("");
  const [dueDate, setDueDate] = useState<DateObject | null>(null);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [senderId, setSenderId] = useState<number | null>(null);

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
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeesData = await getEmployees();
        setEmployees(employeesData);
      } catch (error) {
        console.error("خطا در دریافت لیست کارمندان", error);
      }
    };

    fetchEmployees();
  }, []);

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

    try {
      // ایجاد FormData برای ارسال فایل و داده‌ها
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", details);
      if (dueDate) {
        formData.append("due_date", dueDate.toDate().toISOString());
      }
      if (file) {
        formData.append("file", file); // اضافه کردن فایل به فرم دیتا
      }
      formData.append("receiver", assignedTo.toString());
      formData.append("sender", senderId.toString());
      formData.append("status", "undone");

      await createTask(formData);

      await Swal.fire({
        icon: "success",
        title: "تسک با موفقیت ثبت شد",
        text: "تسک شما با موفقیت ارسال شد.",
      });

      setTitle("");
      setAssignedTo("");
      setDueDate(null);
      setDetails("");
      setFile(null);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "در ثبت تسک خطایی رخ داد.",
      });
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
        setAssignedTo("");
        setDueDate(null);
        setDetails("");
        setFile(null);
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="وارد کردن تسک" />
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان"
              className="w-full p-2 border rounded-xl"
            />
          </div>
          <div>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(parseInt(e.target.value))}
              className="w-full p-2 border rounded-xl bg-white text-gray-400"
            >
              <option value="" disabled>
                ارسال به
              </option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.last_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <MyDatePicker
              placeholder="تاریخ تحویل"
              onChange={(date: DateObject | null) => setDueDate(date)}
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
              id="profileImage"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="profileImage"
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
            ارسال
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

export default AddTask;
