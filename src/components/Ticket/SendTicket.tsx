import React, { useState } from "react";

const TicketSubmission: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here, including sending the selected file
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      // Implement the logic to upload the file to the server here
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-right text-lg font-medium text-blue-600 mb-4">
          ارسال تیکت
        </h2>
        <p className="text-right text-sm text-gray-600 mb-6">
          درخواست پشتیبانی جدید ایجاد کنید
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="موضوع"
              className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="ارسال به"
              className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="پیام"
              className="w-full px-3 py-2 border rounded-md text-right h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileUpload"
              className="w-full py-2 border border-gray-300 rounded-md text-gray-700 text-sm text-center block cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedFile ? selectedFile.name : "آپلود فایل"}
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="py-2 px-6 mr-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              لغو
            </button>
            <button
              type="submit"
              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketSubmission;
