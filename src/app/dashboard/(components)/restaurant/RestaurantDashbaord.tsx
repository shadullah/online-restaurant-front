import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import RestaurantDataTable from "./RestaurantDataTable";

const RestaurantDashbaord = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[30px] font-semibold">Project</h2>
          <p className="text-sm mb-1">Manage all projects</p>
        </div>
        <Link href={"/dashboard/projects/new"}>
          <button
            className={"text-sm border rounded-md px-3 py-2 flex items-center"}
          >
            <FaPlus className="h-4 w-4 text-4xl mr-3" />
            Add New
          </button>
        </Link>
      </div>

      <div className="my-5 border-[0.5px] border-white"></div>

      <div>
        <RestaurantDataTable />
      </div>
    </div>
  );
};

export default RestaurantDashbaord;
