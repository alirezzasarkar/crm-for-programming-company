import React from "react";
import { useParams } from "react-router-dom";

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>جزئیات گزارش کار {id}</h1>
      {/* جزئیات گزارش کار */}
    </div>
  );
};

export default ReportDetailPage;
