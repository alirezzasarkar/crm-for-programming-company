import React, { useState } from "react";
import Button from "../Common/Button";
import { FaSave } from "react-icons/fa";
import Title from "../Common/Title";
import { ProjectFormInputs, Employee } from "../../pages/AddProjectPage";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import InputField from "./InputField";
import DatePickerField from "./DatePickerField";
import FileUploadField from "./FileUploadField";
import DropdownField from "./DropdownField";

interface AddProjectProps {
  register: UseFormRegister<ProjectFormInputs>;
  setValue: UseFormSetValue<ProjectFormInputs>;
  errors: FieldErrors<ProjectFormInputs>;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProjectFormInputs
  ) => void;
  employees: Employee[];
  onTeamMemberSelect: (id: number) => void;
  onClearSelection: (
    selectedMembers: { id: number; last_name: string }[]
  ) => void; // Updated to accept the new selection
  selectedTeamMembers: { id: number; last_name: string }[];
  selectedResponsiblePerson: number;
  onResponsiblePersonSelect: (id: number) => void;
}

const projectStatusOptions = [
  { value: "not_started", label: "شروع نشده" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "completed", label: "انجام شده" },
];

const AddProject: React.FC<AddProjectProps> = ({
  register,
  setValue,
  errors,
  handleFileChange,
  employees,
  onTeamMemberSelect,
  onClearSelection,
  selectedTeamMembers,
  selectedResponsiblePerson,
  onResponsiblePersonSelect,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [managerDropdownOpen, setManagerDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
  const handleManagerDropdownToggle = () =>
    setManagerDropdownOpen(!managerDropdownOpen);

  const handleEmployeeClick = (id: number) => {
    onTeamMemberSelect(id);
    setDropdownOpen(false);
  };

  const handleManagerClick = (id: number) => {
    onResponsiblePersonSelect(id);
    setManagerDropdownOpen(false);
  };

  const handleRemoveTeamMember = (id: number) => {
    const newSelectedTeamMembers = selectedTeamMembers.filter(
      (member) => member.id !== id
    );
    onClearSelection(newSelectedTeamMembers); // Pass updated team members to onClearSelection
  };

  const selectedResponsiblePersonName =
    employees.find((emp) => emp.id === selectedResponsiblePerson)?.last_name ||
    "";

  const selectedTeamMembersNames = selectedTeamMembers
    .map((member) => member.last_name)
    .join(", ");

  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="وارد کردن اطلاعات پروژه" />
      <div className="mt-5">
        <InputField
          id="project_name"
          label="نام پروژه"
          type="text"
          placeholder="نام پروژه"
          register={register}
          errors={errors}
        />
        <InputField
          id="manager_full_name"
          label="نام کارفرما"
          type="text"
          placeholder="نام کارفرما"
          register={register}
          errors={errors}
        />
        <InputField
          id="phone_number"
          label="شماره تماس کارفرما"
          type="text"
          placeholder="شماره تماس کارفرما"
          register={register}
          errors={errors}
        />
        <InputField
          id="domain"
          label="دامنه"
          type="text"
          placeholder="دامنه"
          register={register}
          errors={errors}
        />

        <DropdownField
          id="team_members"
          label="اعضای تیم"
          placeholder="اعضای تیم را انتخاب کنید"
          employees={employees}
          selectedItems={selectedTeamMembers}
          dropdownOpen={dropdownOpen}
          handleToggle={handleDropdownToggle}
          handleSelect={handleEmployeeClick}
          handleRemove={handleRemoveTeamMember} // Use updated remove function
          value={selectedTeamMembersNames}
          errors={errors}
        />

        <DropdownField
          id="responsible_person"
          label="مسئول پروژه"
          placeholder="مسئول پروژه را انتخاب کنید"
          employees={employees}
          selectedItems={[
            {
              id: selectedResponsiblePerson,
              last_name: selectedResponsiblePersonName,
            },
          ]}
          dropdownOpen={managerDropdownOpen}
          handleToggle={handleManagerDropdownToggle}
          handleSelect={handleManagerClick}
          value={selectedResponsiblePersonName}
          errors={errors}
        />

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="status"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            وضعیت پروژه
          </label>
          <div className="w-2/3 flex">
            <select
              id="status"
              {...register("status", { required: "وضعیت پروژه الزامی است" })}
              className="w-full p-3 py-2 border border-gray-200 bg-white rounded-xl text-gray-400"
              onChange={(e) => setValue("status", e.target.value)}
            >
              <option value="" disabled>
                انتخاب وضعیت پروژه
              </option>
              {projectStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs pt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Date Picker Fields */}
        {(
          [
            "domain_end_date",
            "host_end_date",
            "start_date",
            "end_date",
          ] as Array<keyof ProjectFormInputs>
        ).map((field) => (
          <DatePickerField
            key={field}
            id={field}
            label={field
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())} // Replace underscores with spaces and capitalize
            placeholder={field
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())} // Capitalize the first letter of each word
            errors={errors}
            register={register}
            setValue={setValue}
          />
        ))}

        <FileUploadField
          id="design_files"
          label="فایل‌های دیزاین"
          setValue={setValue}
        />
        <FileUploadField
          id="contract_files"
          label="فایل قرارداد"
          setValue={setValue}
        />

        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="description"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            توضیحات
          </label>
          <div className="w-2/3">
            <textarea
              id="description"
              placeholder="توضیحات"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("description", { required: "توضیحات الزامی است" })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs pt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-end w-2/5 mt-10 mx-auto">
        <Button
          type="submit"
          className="bg-green-500 w-2/5 flex items-center justify-center"
          hoverClass="hover:bg-green-600"
        >
          ثبت اطلاعات
          <FaSave className="mr-3" />
        </Button>
      </div>
    </div>
  );
};

export default AddProject;
