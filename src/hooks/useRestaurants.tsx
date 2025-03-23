import axios from "axios";
import React, { useEffect, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  owner: string;
}

const useRestaurants = (): [
  Restaurant[],
  boolean,
  React.Dispatch<React.SetStateAction<Restaurant[]>>
] => {
  const [RestFetch, setRestFetch] = useState<Restaurant[]>([]);
  const [loading, setLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchRest = async () => {
      try {
        const res = await axios.get(`/api/restaurants`);
        setRestFetch(res?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    };
    fetchRest();
  }, []);
  return [RestFetch, loading, setRestFetch];
};

export default useRestaurants;
