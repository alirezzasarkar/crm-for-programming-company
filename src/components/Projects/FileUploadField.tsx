import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaUpload } from "react-icons/fa";

interface FileUploadFieldProps {
  id: string;
  label: string;
  setValue: UseFormSetValue<any>; // Correct type for setValue
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  id,
  label,
  setValue,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setValue(id, filesArray); // Set the files array in form state
      setFileNames(filesArray.map((file) => file.name)); // Display file names
    }
  };

  return (
    <div className="col-span-2 md:col-span-1 flex items-center mt-2">
      <label htmlFor={id} className="w-1/5 ml-5 text-gray-700 text-right">
        {label}
      </label>
      <div className="w-2/3">
        <input
          id={id}
          type="file"
          accept=".zip,.pdf" // Accept zip and pdf files
          onChange={handleFileChange} // Use handleFileChange for file uploads
          multiple // Allow multiple file uploads
          className="hidden"
        />
        <label htmlFor={id} className="flex items-center cursor-pointer">
          <span className="text-gray-400 border border-gray-200 py-2 px-3 rounded-xl">
            آپلود به صورت فایل زیپ یا PDF
          </span>
          <FaUpload className="text-gray-400 mr-2" />
        </label>

        {fileNames.length > 0 && (
          <div className="mt-2 text-gray-600">
            {fileNames.map((fileName, index) => (
              <div key={index} className="text-sm">
                {fileName}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;
