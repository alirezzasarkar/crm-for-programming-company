import React from "react";
import ProjectDetails from "../components/Projects/ProjectDetails";
import { useParams } from "react-router-dom";

// داده‌های نمونه برای پروژه (می‌تواند از API یا state مدیریت شود)
const projectData = {
  projectName: "وبسایت ادکلای",
  projectManager: "محمد رودباری",
  domain: "adklay.co",
  startDate: "28 مهر 1403",
  endDate: "28 آبان 1403",
  completionDate: "28 دی 1403",
  hostingEndDate: "28 دی 1403",
  platform: "وردپرس",
  designTeam: ["لیلا کردی", "رایکا پورعلی"],
  implementationTeam: ["علیرضا سرکار", "حسام فیض الهی"],
};

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams(); // گرفتن id پروژه از URL برای دریافت داده‌ها

  return (
    <div className="bg-gray-100 min-h-screen">
      <ProjectDetails {...projectData} />
    </div>
  );
};

export default ProjectDetailsPage;
