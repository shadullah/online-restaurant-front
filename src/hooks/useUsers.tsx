// "use client";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserDetail {
  username: string;
  email: string;
  user_type: string;
}

const useUsers = () => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [, setLoad] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/users/${user?.id}`);
        setUserDetail(res?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    };
    fetchUsers();
  }, [user?.id]);
  return [userDetail];
};

export default useUsers;
