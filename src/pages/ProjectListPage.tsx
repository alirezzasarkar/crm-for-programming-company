import { useState } from "react";
import ProjectList from "../components/Projects/ProjectList";
import SearchBox from "../components/Common/Search";
import Filter from "../components/Projects/ProjectFilter";
import Title from "../components/Common/Title";
import { useNavigate } from "react-router-dom";
import { filterProjectsByDate } from "../components/Common/DateFilter";
import LoadingSpinner from "../components/Common/Loading";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProjects, deleteProject } from "../services/project";
import Swal from "sweetalert2";

interface Project {
  id: number;
  project_name: string;
  domain: string;
  manager_full_name: string;
  end_date: string;
  status: string;
}

const statusOptions = ["تمام پروژه‌ها", "درحال انجام", "انجام شده"];
const dateOptions = ["تمام پروژه‌ها", "این هفته", "این ماه", "این سال"];

const ProjectListPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("تمام پروژه‌ها");
  const [dateFilter, setDateFilter] = useState<string>("تمام پروژه‌ها");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Projects using React Query
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery<Project[]>("projects", fetchProjects);

  const mutation = useMutation(deleteProject, {
    onSuccess: () => {
      // Invalidate and refetch projects after deletion
      queryClient.invalidateQueries("projects");
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter projects based on status, date, and search query
  let filteredProjects = (projects || []).filter((project) => {
    const matchesStatus =
      statusFilter === "تمام پروژه‌ها" || project.status === statusFilter;
    const matchesSearch = project.project_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  filteredProjects = filterProjectsByDate(filteredProjects, dateFilter);

  const handleProjectClick = (projectId: number) => {
    navigate(`/dashboard/projects/detail/${projectId}`);
  };

  const handleEditProject = (projectId: number) => {
    navigate(`/dashboard/projects/edit/${projectId}`); // صفحه ویرایش پروژه
  };

  const handleDeleteProject = (projectId: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(projectId);
        Swal.fire("حذف شد!", "پروژه با موفقیت حذف شد.", "success");
      }
    });
  };

  return (
    <>
      <div className="flex justify-start mb-4 rtl">
        <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Filter
          filter={statusFilter}
          options={statusOptions}
          label="وضعیت"
          onFilterChange={setStatusFilter}
        />
        <Filter
          filter={dateFilter}
          options={dateOptions}
          label="تاریخ"
          onFilterChange={setDateFilter}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md rtl">
        <Title title="لیست پروژه های من" />
        <ProjectList
          projects={filteredProjects} // مطمئن می‌شویم که همیشه یک آرایه ارسال می‌شود
          onProjectClick={handleProjectClick}
          onEditProject={handleEditProject} // ارسال تابع ویرایش
          onDeleteProject={handleDeleteProject}
        />
      </div>
    </>
  );
};

export default ProjectListPage;
