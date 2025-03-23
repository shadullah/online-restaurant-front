import { ReactNode } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

type DashboardTab = {
  id: number;
  path: string;
  icon: ReactNode;
  linkText: string;
};

const generateId = () => Math.floor(Math.random() * 10000);

// exporting as array
export const dashboardTabs: DashboardTab[] = [
  {
    id: generateId(),
    path: "/dashboard",
    icon: <IoDocumentTextOutline className="h-4 w-4" />,
    linkText: "Dashbaord",
  },
  {
    id: generateId(),
    path: "/dashboard/restaurants",
    icon: <IoDocumentTextOutline className="h-4 w-4" />,
    linkText: "Restaurants",
  },
  {
    id: generateId(),
    path: "/dashboard/menus",
    icon: <IoDocumentTextOutline className="h-4 w-4" />,
    linkText: "Menus",
  },
];
