import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [load, setload] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setload(false);
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (load) return <p className="text-3xl font-bold text-center">Loading...</p>;

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
