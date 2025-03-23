"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Restaurants {
  id: number;
  name: string;
  image: string;
  location: string;
}

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const url = "/api/restaurants";
        const res = await axios.get(url);
        console.log(res?.data);
        setRestaurants(res?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchRestaurants();
  }, []);

  const truncate = (str: string, len: number) => {
    if (str.length <= len) return str;
    return str.slice(0, len) + "...";
  };

  //   const path = use;

  return (
    <div className="my-36 max-w-7xl mx-auto">
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold mb-12 border-b-2 border-amber-400">
            Restaurants
          </h1>
        </div>
      </div>

      <div>
        {loading ? (
          <>
            <p className="my-12 text-center text-3xl">Loading.....</p>
          </>
        ) : (
          <>
            {restaurants?.length === 0 ? (
              <>
                <p>No restaurants found</p>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12">
                  {restaurants?.map((prod) => (
                    <div
                      key={prod?.id}
                      className="mb-6 bg-gray-900 hover:bg-gray-900/40 text-center mx-auto p-3"
                    >
                      <Image
                        width={500}
                        height={500}
                        src={prod?.image}
                        // src={
                        //   prod.image.startsWith("http")
                        //     ? prod.image
                        //     : `http://localhost:8000${prod.image}`
                        // }
                        alt="#"
                        className="h-64
                         w-64 rounded-md mb-3"
                      />
                      <h3 className="font-bold text-2xl">
                        {truncate(prod?.name, 50)}
                      </h3>
                      <p className="text-sm pt-3">{prod.location}</p>
                      <div className="flex justify-center items-center py-6 mx-6">
                        <div>
                          <Link href={`/restaurants/${prod?.id}`}>
                            <button className="px-4 py-3 rounded-lg bg-orange-500 cursor-pointer">
                              Order Now
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
