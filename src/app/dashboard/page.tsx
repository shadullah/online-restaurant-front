"use client";
import ProtectedRoute from "@/Components/shared/ProtectedRoute/ProtectedRoute";
import useUsers from "@/hooks/useUsers";
import React from "react";

// interface UserDetail {
//   name:string;
//   email: string;
//   user_type: string;
// }

const MainDashboard = () => {
  const [userDetail] = useUsers();
  console.log(userDetail);
  return (
    <div>
      <ProtectedRoute>
        {userDetail ? (
          <>
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">
                Welcome to your Dashboard
              </h1>
              <h1 className="uppercase text-3xl">
                Hello, {userDetail.username}
              </h1>
              <p>{userDetail.email}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>Hello</p>
              <p>Welcome to your Dashboard</p>
            </div>
          </>
        )}
      </ProtectedRoute>
    </div>
  );
};

export default MainDashboard;
