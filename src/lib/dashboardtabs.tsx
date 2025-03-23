import { ReactNode } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

type DashboardTab = {
  id: number;
  path: string;
  icon: ReactNode;
  linkText: string;
};

const generateId = () => Math.floor(Math.random() * 10000);

// const generateRestaurantPath = (restaurantId: number | string) => {
//   return `/dashboard/restaurants/${restaurantId}/menu`;
// };

// exporting as array
export const dashboardTabs: DashboardTab[] = [
  {
    id: generateId(),
    path: "/dashboard",
    icon: <IoDocumentTextOutline className="h-4 w-4" />,
    linkText: "Dashboard",
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

  // for dynamic route
  // ...(restaurantId
  //   ? [
  //       {
  //         id: generateId(),
  //         path: generateRestaurantPath(restaurantId),
  //         icon: <IoDocumentTextOutline className="h-4 w-4" />,
  //         linkText: "Menus",
  //       },
  //     ]
  //   : []),
];
