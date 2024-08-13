import React from "react";
import Summary from "./Summary";
import UnreadReports from "./UnreadReports";
import UnreadTickets from "./UnreadTickets";
import TopEmployees from "./TopEmployees";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <main className="p-8 pt-4">
        <h2 className="text-blue-700 text-xl font-bold mb-10">
          خلاصه وضعیت کلی
        </h2>
        <Summary />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UnreadReports />
          <UnreadTickets />
          <TopEmployees />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
