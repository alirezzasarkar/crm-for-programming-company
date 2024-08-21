import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 min-height">
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 text-right overflow-y-auto">
          {children}
        </main>
      </div>
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  );
};

export default Layout;
