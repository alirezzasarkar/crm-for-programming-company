import React, { useState } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import InputField from "./InputField";
import DatePickerField from "./DatePickerField";
import CheckboxField from "./CheckboxField";
import TextareaField from "./TextareaField";
import Title from "../Common/Title";
import Button from "../Common/Button";
import { FaSave } from "react-icons/fa";
import FileUploadField from "./FileUploadField";
import DropdownField from "./DropdownField";

// در فایل AddContentProduction.tsx

export interface ContentProjectFormInputs {
  fullName: string;
  contactNumber: string;
  projectStatus: string;
  contractFile: File | null;
  photoFrequency: number;
  startDate: string;
  endDate: string;
  videosPerMonth: number;
  photosPerMonth: number;
  organizationColors: string;
  collaborationDuration: number;
  damage: string;
  consultation: boolean;
  captionWriting: boolean;
  coverDesign: boolean;
  postScenarioWriting: boolean;
  teaser: boolean;
  droneShot: boolean;
  outsideShoot: boolean;
  outOfCityShoot: boolean;
}

// Define the props for the component
interface AddContentProjectProps {
  employees: Array<{ id: number; last_name: string; first_name: string }>; // Define the type for employees
  selectedTeamMembers: Array<{
    id: number;
    last_name: string;
    first_name: string;
  }>; // Define the type for selected team members
  register: UseFormRegister<ContentProjectFormInputs>;
  errors: FieldErrors<ContentProjectFormInputs>;
  setValue: UseFormSetValue<ContentProjectFormInputs>;
  onTeamMemberSelect: (id: number) => void; // Add the type for onTeamMemberSelect
  onClearSelection: (
    members: Array<{ id: number; last_name: string; first_name: string }>
  ) => void; // Add the type for onClearSelection
}

const projectStatusOptions = [
  { value: "not_started", label: "شروع نشده" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "completed", label: "انجام شده" },
];

const AddContentProject: React.FC<AddContentProjectProps> = ({
  employees,
  selectedTeamMembers,
  register,
  errors,
  setValue,
  onTeamMemberSelect,
  onClearSelection,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleEmployeeClick = (id: number) => {
    onTeamMemberSelect(id);
    setDropdownOpen(false);
  };

  const handleRemoveTeamMember = (id: number) => {
    const newSelectedTeamMembers = selectedTeamMembers.filter(
      (member) => member.id !== id
    );
    onClearSelection(newSelectedTeamMembers); // Pass updated team members to onClearSelection
  };

  const selectedTeamMembersNames = selectedTeamMembers
    .map((member) => member.last_name)
    .join(", ");

  return (
    <div className="max-md mx-auto p-6 bg-white shadow-md rounded-lg rtl">
      <Title title="وارد کردن اطلاعات پروژه" />
      <div className="mt-5">
        {/* نام کارفرما */}
        <InputField
          id="fullName"
          label="نام کارفرما"
          type="text"
          placeholder="نام کارفرما را وارد کنید"
          register={register}
          errors={errors}
        />

        {/* شماره تماس کارفرما */}
        <InputField
          id="contactNumber"
          label="شماره تماس کارفرما"
          type="tel"
          placeholder="مثال: 09123456789"
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
          handleRemove={handleRemoveTeamMember}
          value={selectedTeamMembersNames}
          errors={errors}
        />

        {/* وضعیت پروژه */}
        <div className="col-span-2 md:col-span-1 flex items-center mt-2">
          <label
            htmlFor="projectStatus"
            className="w-1/5 ml-5 text-gray-700 text-right"
          >
            وضعیت پروژه
          </label>
          <div className="w-2/3 flex">
            <select
              id="projectStatus"
              {...register("projectStatus", {
                required: "وضعیت پروژه الزامی است",
              })}
              className="w-full p-3 py-2 border border-gray-200 bg-white rounded-xl text-gray-400"
            >
              <option value="" disabled>
                لطفا وضعیت پروژه را انتخاب کنید
              </option>
              {projectStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.projectStatus && (
              <p className="text-red-500 text-xs pt-1">
                {errors.projectStatus.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* سایر فیلدهای فرم */}
      <InputField
        id="photoFrequency"
        label="تعداد دفعات حدودی تصویربرداری در ماه"
        type="number"
        placeholder="مثال: 2"
        register={register}
        errors={errors}
      />
      <DatePickerField
        id="startDate"
        label="تاریخ شروع"
        placeholder="تاریخ شروع را وارد کنید"
        register={register}
        errors={errors}
      />
      <DatePickerField
        id="endDate"
        label="تاریخ پایان"
        placeholder="تاریخ پایان را وارد کنید"
        register={register}
        errors={errors}
      />
      <InputField
        id="videosPerMonth"
        label="تعداد ویدیو در هر ماه"
        type="number"
        placeholder="تعداد ویدیو"
        register={register}
        errors={errors}
      />
      <InputField
        id="photosPerMonth"
        label="تعداد عکس‌ در هر ماه"
        type="number"
        placeholder="تعداد عکس"
        register={register}
        errors={errors}
      />
      <InputField
        id="organizationColors"
        label="رنگ‌های سازمانی"
        type="text"
        placeholder="رنگ‌های سازمانی"
        register={register}
        errors={errors}
      />
      <InputField
        id="collaborationDuration"
        label="مدت زمان همکاری"
        type="number"
        placeholder="مدت زمان (ماه)"
        register={register}
        errors={errors}
      />
      {/* فایل قرارداد */}
      <FileUploadField
        id="contractFile"
        label="فایل قرارداد"
        setValue={setValue}
      />

      <TextareaField
        id="damage"
        label="خسارت (در صورت وجود)"
        placeholder="توضیحات خسارت"
        register={register}
        errors={errors}
      />

      <CheckboxField id="consultation" label="مشاوره" register={register} />
      <CheckboxField
        id="captionWriting"
        label="کپشن‌نویسی"
        register={register}
      />
      <CheckboxField id="coverDesign" label="طراحی کاور" register={register} />
      <CheckboxField
        id="postScenarioWriting"
        label="سناریو نویسی پست‌ها"
        register={register}
      />
      <CheckboxField id="teaser" label="تیزر می‌خواهد" register={register} />
      <CheckboxField
        id="droneShot"
        label="نیاز به هلی‌شات"
        register={register}
      />
      <CheckboxField
        id="outsideShoot"
        label="نیاز به تصویربرداری بیرون مجموعه"
        register={register}
      />
      <CheckboxField
        id="outOfCityShoot"
        label="نیاز به تصویربرداری خارج از شهر لوکیشن کارفرما"
        register={register}
      />

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

export default AddContentProject;
