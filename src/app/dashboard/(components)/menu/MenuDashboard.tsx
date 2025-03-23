"use client";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import useUsers from "@/hooks/useUsers";
import MenuDataTable from "./MenuDataTable";

const MenuDashbaord = () => {
  const [userDetail] = useUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[30px] font-semibold">Menus</h2>
          <p className="text-sm mb-1">Manage all Menu</p>
        </div>
        <div>
          {userDetail?.user_type === "Owner" ? (
            <>
              <Link href={"/dashboard/restaurants/new"}>
                <button
                  className={
                    "text-sm border rounded-md px-3 py-2 flex items-center cursor-pointer"
                  }
                >
                  <FaPlus className="h-4 w-4 text-4xl mr-3" />
                  Add New Menu link chng
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="my-5 border-[0.5px] border-white"></div>

      <div>
        <MenuDataTable />
      </div>
    </div>
  );
};

export default MenuDashbaord;
