import React, { useState } from "react";
import moment from "jalali-moment";
import { getWeekDates, getStartOfWeek } from "../../utils/dateUtils"; // توابعی که قبلاً تعریف شده‌اند

const DateFilter: React.FC<{
  dateFilter: string;
  onChange: (value: string) => void;
}> = ({ dateFilter, onChange }) => {
  return (
    <select
      className="border rounded-lg px-4 py-2"
      value={dateFilter}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="تمام پروژه‌ها">تمام پروژه‌ها</option>
      <option value="ماه گذشته">ماه گذشته</option>
      <option value="دوماه گذشته">دوماه گذشته</option>
      <option value="سه ماه گذشته">سه ماه گذشته</option>
    </select>
  );
};

export const filterProjectsByDate = (projects: any[], dateFilter: string) => {
  const now = moment();

  let startDate: moment.Moment | null = null;

  switch (dateFilter) {
    case "ماه گذشته":
      startDate = now.clone().subtract(1, "months").startOf("month");
      break;
    case "دوماه گذشته":
      startDate = now.clone().subtract(2, "months").startOf("month");
      break;
    case "سه ماه گذشته":
      startDate = now.clone().subtract(3, "months").startOf("month");
      break;
    default:
      return projects;
  }

  const filteredProjects = projects.filter((project) => {
    const projectDate = moment(project.endDate, "jD jMMMM jYYYY");
    return projectDate.isAfter(startDate);
  });

  return filteredProjects;
};

export default DateFilter;
