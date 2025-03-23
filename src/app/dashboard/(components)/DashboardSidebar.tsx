"use client";
import { dashboardTabs } from "@/lib/dashboardtabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  // const params = useParams();
  // const restaurantId = params?.id;
  // console.log("URL Params:", params);

  // const tabs = dashboardTabs(restaurantId as string);
  return (
    <div className="md:block hidden h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto">
          <nav className="grid items-start pr-6 text-sm font-medium space-y-2">
            {dashboardTabs.map((tab) => {
              return (
                <Link
                  href={tab.path}
                  key={tab.id}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    pathname === tab.path
                      ? "hover:bg-amber-400"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="border rounded-lg border-gray-400 p-1">
                    {tab.icon}
                  </div>
                  {tab.linkText}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
