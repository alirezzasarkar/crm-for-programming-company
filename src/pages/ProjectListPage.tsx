import { useState, useEffect } from "react";
import ProjectList from "./../components/Projects/ProjectList";
import { fetchProjects } from "../services/project";
import SearchBox from "../components/Common/Search";
import Filter from "../components/Projects/ProjectFilter";
import Title from "../components/Common/Title";
import { useNavigate } from "react-router-dom";
import { filterProjectsByDate } from "../components/Common/DateFilter";
import LoadingSpinner from "../components/Common/Loading";

// تعریف نوع پروژه
interface Project {
  index: number;
  projectName: string;
  domain: string;
  manager: string;
  endDate: string;
  status: string;
}

// وضعیت فیلترها و جستجو
const statusOptions = ["تمام پروژه‌ها", "درحال انجام", "انجام شده"];
const dateOptions = ["تمام پروژه‌ها", "این هفته", "این ماه", "این سال"];

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("تمام پروژه‌ها");
  const [dateFilter, setDateFilter] = useState<string>("تمام پروژه‌ها");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // بارگذاری داده‌ها از API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        setError("خطا در بارگذاری پروژه‌ها");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // فیلتر کردن پروژه‌ها
  let filteredProjects = projects.filter((project) => {
    const matchesStatus =
      statusFilter === "تمام پروژه‌ها" || project.status === statusFilter;
    const matchesSearch = project.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  filteredProjects = filterProjectsByDate(filteredProjects, dateFilter);

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/detail/${projectId}`);
  };

  if (loading) return <LoadingSpinner />;

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
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
        />
      </div>
    </>
  );
};

export default ProjectListPage;
