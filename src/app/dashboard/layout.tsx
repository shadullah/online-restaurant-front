import React from "react";
import DashboardSidebar from "./(components)/DashboardSidebar";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard for handling orders",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="max-w-6xl mx-auto min-h-screen grid grid-cols-6 mt-40">
        <div className="col-span-1 mt-6">
          <DashboardSidebar />
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
