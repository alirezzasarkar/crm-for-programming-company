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
import { Employee } from "../../pages/AddContentProductionPage";

export interface ContentProjectFormInputs {
  id: number;
  full_name: string;
  contact_number: string;
  start_date: string;
  end_date: string;
  photo_frequency: number;
  project_status: string;
  team_members: number[];
  photos_per_month: number;
  videos_per_month: number;
  organization_colors: string;
  collaboration_duration: string;
  contract_file?: FileList;
  damage: string;
  consultation: boolean;
  caption_writing: boolean;
  cover_design: boolean;
  post_scenario_writing: boolean;
  teaser: boolean;
  drone_shot: boolean;
  outside_shoot: boolean;
  out_of_city_shoot: boolean;
}

// Define the props for the component
interface AddContentProjectProps {
  employees: Employee[];
  selectedTeamMembers: { id: number; last_name: string }[];
  register: UseFormRegister<ContentProjectFormInputs>;
  errors: FieldErrors<ContentProjectFormInputs>;
  setValue: UseFormSetValue<ContentProjectFormInputs>;
  onTeamMemberSelect: (id: number) => void;
  onClearSelection: (
    selectedMembers: { id: number; last_name: string }[]
  ) => void; // Updated to accept the new selection
}

const projectStatusOptions = [
  { value: "pending", label: "شروع نشده" },
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
          id="full_name"
          label="نام کارفرما"
          type="text"
          placeholder="نام کارفرما را وارد کنید"
          register={register}
          errors={errors}
        />

        {/* شماره تماس کارفرما */}
        <InputField
          id="contact_number"
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
              id="project_status"
              {...register("project_status", {
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
            {errors.project_status && (
              <p className="text-red-500 text-xs pt-1">
                {errors.project_status.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* سایر فیلدهای فرم */}
      <InputField
        id="photo_frequency"
        label="تعداد دفعات حدودی تصویربرداری در ماه"
        type="number"
        placeholder="مثال: 2"
        register={register}
        errors={errors}
      />
      {(
        [
          {
            id: "start_date",
            label: "تاریخ شروع",
            placeholder: "تاریخ شروع را وارد کنید",
          },
          {
            id: "end_date",
            label: "تاریخ پایان",
            placeholder: "تاریخ پایان را وارد کنید",
          },
        ] as Array<{
          id: keyof ContentProjectFormInputs;
          label: string;
          placeholder: string;
        }>
      ).map(({ id, label, placeholder }) => (
        <DatePickerField
          key={id}
          id={id}
          label={label}
          placeholder={placeholder}
          register={register}
          errors={errors}
          setValue={setValue} // Pass setValue here
        />
      ))}

      <InputField
        id="videos_per_month"
        label="تعداد ویدیو در هر ماه"
        type="number"
        placeholder="تعداد ویدیو"
        register={register}
        errors={errors}
      />
      <InputField
        id="photos_per_month"
        label="تعداد عکس‌ در هر ماه"
        type="number"
        placeholder="تعداد عکس"
        register={register}
        errors={errors}
      />
      <InputField
        id="organization_colors"
        label="رنگ‌های سازمانی"
        type="text"
        placeholder="رنگ‌های سازمانی"
        register={register}
        errors={errors}
      />
      <InputField
        id="collaboration_duration"
        label="مدت زمان همکاری"
        type="number"
        placeholder="مدت زمان (ماه)"
        register={register}
        errors={errors}
      />
      {/* فایل قرارداد */}
      <FileUploadField
        id="contract_file"
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
        id="caption_writing"
        label="کپشن‌نویسی"
        register={register}
      />
      <CheckboxField id="cover_design" label="طراحی کاور" register={register} />
      <CheckboxField
        id="post_scenario_writing"
        label="سناریو نویسی پست‌ها"
        register={register}
      />
      <CheckboxField id="teaser" label="تیزر می‌خواهد" register={register} />
      <CheckboxField
        id="drone_shot"
        label="نیاز به هلی‌شات"
        register={register}
      />
      <CheckboxField
        id="outside_shoot"
        label="نیاز به تصویربرداری بیرون مجموعه"
        register={register}
      />
      <CheckboxField
        id="out_of_city_shoot"
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
