import React from "react";
import Summary from "./Summary";
import UnreadReports from "./UnreadReports";
import UnreadTickets from "./UnreadTickets";
import TopEmployees from "./TopEmployees";

const Dashboard: React.FC = () => {
  return (
    <div className="bg-blue-50 min-h-screen">
      <main className="p-4 md:p-8">
        <h2 className="text-blue-700 text-lg md:text-xl font-bold mb-6 md:mb-10">
          خلاصه وضعیت کلی
        </h2>
        <Summary />
        <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          <UnreadReports />
          <UnreadTickets />
          <TopEmployees />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
