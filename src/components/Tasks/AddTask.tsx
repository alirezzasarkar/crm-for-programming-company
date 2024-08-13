// components/AddTask.tsx
import React, { useState } from "react";
import Title from "../Common/Title";
import { FaUpload } from "react-icons/fa";
import PersianDatePicker from "../Common/PersianDatePicker";

const AddTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [details, setDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic
  };

  const handleCancel = () => {
    setTitle("");
    setTeam("");
    setAssignedTo("");
    setDueDate(null);
    setDetails("");
    setFile(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md rtl">
      <Title title="وارد کردن تسک" />
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
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
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="تیم"
              className="w-full p-2 border rounded-xl"
            />
          </div>
          <div>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="ارسال به"
              className="w-full p-2 border rounded-xl"
            />
          </div>
          <div>
            <PersianDatePicker placeholder="تاریخ تحویل" />
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
