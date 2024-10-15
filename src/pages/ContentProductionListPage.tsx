import { useState } from "react";
import SearchBox from "../components/Common/Search";
import Title from "../components/Common/Title";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/Common/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchContentProjects,
  deleteContentProject,
} from "../services/contentProject";
import Swal from "sweetalert2";
import ContentProjectList from "../components/Projects/ContentProductionList";

interface ContentProject {
  id: number;
  fullName: string;
  contactNumber: string;
  startDate: string;
  endDate: string;
  status: string;
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

  const mutation = useMutation(deleteContentProject, {
    onSuccess: () => {
      // Invalidate and refetch content projects after deletion
      queryClient.invalidateQueries("contentProjects");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter content projects based on status and search query
  let filteredContentProjects = (contentProjects || []).filter((project) => {
    const matchesStatus =
      statusFilter === "تمام پروژه‌ها" || project.status === statusFilter;
    const matchesSearch =
      project.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.contactNumber.includes(searchQuery); // Filter by contact number as well
    return matchesStatus && matchesSearch;
  });

  const handleProjectClick = (projectId: number) => {
    navigate(`/dashboard/content-projects/detail/${projectId}`);
  };

  const handleEditProject = (projectId: number) => {
    navigate(`/dashboard/content-projects/edit/${projectId}`); // صفحه ویرایش پروژه
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
          contentProjects={filteredContentProjects} // مطمئن می‌شویم که همیشه یک آرایه ارسال می‌شود
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject} // ارسال تابع ویرایش
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </>
  );
};

export default ContentProjectListPage;
