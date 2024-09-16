import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectDetails from "../components/Projects/ProjectDetails";
import Title from "../components/Common/Title";
import LoadingSpinner from "../components/Common/Loading";
import { fetchProjectDetails, deleteProject } from "../services/project";
import Swal from "sweetalert2";

interface ProjectDetailsPageProps {
  id: number;
  project_name: string;
  domain: string;
  manager_full_name: string;
  phone_number: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  design_files: string;
  domain_end_date: string;
  host_end_date: string;
  contract_files: string;
  team_members: number[];
}

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // دریافت ID پروژه از URL
  const [project, setProject] = useState<ProjectDetailsPageProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const data = await fetchProjectDetails(Number(id));
        setProject(data);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [id]);

  const handleDeleteProject = async (projectId: number) => {
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
        deleteProject(projectId);
        Swal.fire("حذف شد!", "پروژه با موفقیت حذف شد.", "success");
        navigate("/dashboard/projects");
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Title title={`جزئیات پروژه: ${project?.project_name}`} />
      {project && (
        <ProjectDetails
          project={project}
          onDeleteProject={handleDeleteProject}
        />
      )}
    </div>
  );
};

export default ProjectDetailsPage;
