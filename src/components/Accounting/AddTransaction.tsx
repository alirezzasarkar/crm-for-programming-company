import React, { useState } from "react";

const TransactionEntry: React.FC = () => {
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
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              نوع تراکنش
            </label>
            <select className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 rtl text-gray-700">
              <option value="wage">واریز حقوق</option>
              <option value="deposit">واریز</option>
              <option value="withdraw">برداشت</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              مقدار تراکنش
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              توضیحات
            </label>
            <textarea className="w-full px-3 py-2 border rounded-md text-right h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" />
          </div>
          <div className="mb-6">
            <label className="block text-right text-gray-600 mb-2 text-sm">
              پیوست فاکتور
            </label>
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
              {selectedFile ? selectedFile.name : "انتخاب فایل"}
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              ذخیره تراکنش
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionEntry;
