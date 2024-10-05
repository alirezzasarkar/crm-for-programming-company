import React from "react";

const TicketDetails: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md rtl">
      <div className="mb-6 flex justify-between">
        <h2 className="text-md font-semibold text-right text-blue-600">
          عنوان تیکت
        </h2>
        <span className="text-sm text-gray-600">در حال بررسی</span>
      </div>
      <div className="border-t pt-5 border-gray-300 w-full mt-5 mb-4"></div>
      <div className="space-y-5">
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-right text-gray-700">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است...
          </p>
          <span className="text-xs text-gray-500 block text-left">
            1403/03/22
          </span>
        </div>
        <div className="bg-blue-100 p-4 rounded-md">
          <p className="text-right text-gray-700">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است...
          </p>
          <span className="text-xs text-gray-500 block text-left">
            1403/03/22
          </span>
          <span className="text-xs text-gray-500 block text-left mt-2">
            احمدرضا درزی - مدیرعامل
          </span>
        </div>
      </div>
      <div className="border-t border-gray-300 w-full p-3 my-4"></div>
      <div>
        <textarea
          placeholder="پیام"
          className="w-full px-3 py-2 border rounded-md text-right h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
          }}
        />
        <label
          htmlFor="fileUpload"
          className="w-full py-2 border border-gray-300 rounded-md text-gray-700 text-sm text-center block cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          آپلود فایل
        </label>
        <div className="flex justify-center">
          <button
            type="button"
            className="py-2 px-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
