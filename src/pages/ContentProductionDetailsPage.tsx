import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../components/Common/Title";
import LoadingSpinner from "../components/Common/Loading";
import {
  fetchContentProjectsDetails,
  contentProjectsDelete,
} from "../services/contentProject";
import Swal from "sweetalert2";
import ContentProductionDetails from "../components/Projects/ContentProductionDetails";

interface ContentProductionDetails {
  id: number;
  full_name: string;
  domain: string;
  manager_full_name: string;
  contact_number: string;
  description: string;
  start_date: string;
  end_date: string;
  responsible_person: number;
  project_status: string;
  contract_file: string | null;
  photos_per_month: number;
  videos_per_month: number;
  organization_colors: string;
  collaboration_duration: string;
  damage: string;
  consultation: boolean;
  caption_writing: boolean;
  cover_design: boolean;
  post_scenario_writing: boolean;
  teaser: boolean;
  drone_shot: boolean;
  outside_shoot: boolean;
  out_of_city_shoot: boolean;
  team_members: number[];
}

const ContentProductionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contentProject, setContentProject] =
    useState<ContentProductionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const data = await fetchContentProjectsDetails(Number(id));
        setContentProject(data);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [id]);

  const handleDeleteProject = async (projectId: number) => {
    const result = await Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    });

    if (result.isConfirmed) {
      try {
        await contentProjectsDelete(projectId);
        Swal.fire("حذف شد", "پروژه با موفقیت حذف شد", "success");
        navigate("/dashboard/projects");
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire("خطا", "حذف پروژه ناموفق بود", "error");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Title title={`جزئیات پروژه: ${contentProject?.full_name}`} />
      {contentProject && (
        <ContentProductionDetails
          project={contentProject}
          onDeleteProject={handleDeleteProject}
        />
      )}
    </div>
  );
};

export default ContentProductionDetailsPage;
