import { useState } from "react";
import SearchBox from "../components/Common/Search";
import Title from "../components/Common/Title";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Common/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchContentProjects,
  contentProjectsDelete,
} from "../services/contentProject";
import Swal from "sweetalert2";
import ContentProjectList from "../components/Projects/ContentProductionList";

interface ContentProject {
  id: number;
  full_name: string; // نام پروژه یا کارفرما
  contact_number: string; // شماره تماس
  start_date: string; // تاریخ شروع
  end_date: string; // تاریخ پایان
  project_status: string; // وضعیت پروژه
  team_members: number[]; // اعضای تیم
  photo_frequency: number;
  photos_per_month: number;
  videos_per_month: number;
  organization_colors: string;
  collaboration_duration: string;
  contract_file: string | null;
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

const statusOptions = ["تمام پروژه‌ها", "درحال انجام", "انجام شده"];
const dateOptions = ["تمام پروژه‌ها", "این هفته", "این ماه", "این سال"];

const ContentProjectListPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("تمام پروژه‌ها");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Content Projects using React Query
  const {
    data: contentProjects,
    isLoading,
    error,
  } = useQuery<ContentProject[]>("contentProjects", fetchContentProjects);

  const mutation = useMutation(contentProjectsDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("contentProjects");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  let filteredContentProjects = (contentProjects || []).filter((project) => {
    const matchesStatus =
      statusFilter === "تمام پروژه‌ها" ||
      project.project_status === statusFilter;
    const matchesSearch =
      project.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.contact_number.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/dashboard/content-production/detail/${projectId}`);
  };

  const handleEditProject = (projectId: number) => {
    navigate(`/dashboard/content-projects/edit/${projectId}`);
  };

  const handleDeleteProject = (projectId: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(projectId);
        Swal.fire("حذف شد", "پروژه با موفقیت حذف شد", "success");
      }
    });
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست پروژه های تولید محتوا" />
        <ContentProjectList
          contentProjects={filteredContentProjects}
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </>
  );
};

export default ContentProjectListPage;
