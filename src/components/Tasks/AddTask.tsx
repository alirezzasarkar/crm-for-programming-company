import React, { useState } from "react";
import Title from "../Common/Title";
import { FaUpload } from "react-icons/fa";
import MyDatePicker from "../Common/PersianDatePicker";
import Swal from "sweetalert2";
import { DateObject } from "react-multi-date-picker";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState<DateObject | null>(null);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic

    try {
      await Swal.fire({
        icon: "success",
        title: "تسک با موفقیت ثبت شد",
        text: "تسک شما با موفقیت ارسال شد.",
      });
      // Reset form fields after successful submission
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
        // Reset form fields
        setTitle("");
        setAssignedTo("");
        setDueDate(null);
        setDetails("");
        setFile(null);
      }
    });
  };

  const companyMembers = [
    "عضو ۱",
    "عضو ۲",
    "عضو ۳",
    // نام اعضای شرکت خود را اینجا اضافه کنید
  ];

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
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full p-2 border rounded-xl bg-white text-gray-400"
            >
              <option value="" disabled>
                ارسال به
              </option>
              {companyMembers.map((member) => (
                <option key={member} value={member}>
                  {member}
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
