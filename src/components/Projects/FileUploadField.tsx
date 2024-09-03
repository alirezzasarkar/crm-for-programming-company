import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

interface FileUploadFieldProps {
  id: string;
  label: string;
  setValue: UseFormSetValue<any>;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id,
  label,
  setValue,
}) => (
  <div className="col-span-2 md:col-span-1 flex items-center mt-2">
    <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
      {label}
    </label>
    <div className="w-2/3">
      <input
        id={id}
        type="file"
        accept=".zip"
        onChange={(e) => {
          if (e.target.files) {
            setValue(id, e.target.files);
          }
        }}
        className="hidden"
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <span className="text-gray-400 border border-gray-200 py-2 px-3 rounded-xl">
          آپلود به صورت فایل زیپ
        </span>
        <FaUpload className="text-gray-400 mr-2" />
      </label>
    </div>
  </div>
);

export default FileUploadField;
