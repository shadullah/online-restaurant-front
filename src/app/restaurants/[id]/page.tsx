"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";

interface Restaurants {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
}
interface Menus {
  id: number;
  price: number;
  name: string;
  image: string;
  description: string;
}

const RestaurantDetailspage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurants] = useState<Restaurants | null>(null);
  const [menus, setMenus] = useState<Menus[]>([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/restaurants/${id}`);
        console.log(res.data);
        setRestaurants(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Details could not fetched", { duration: 3000 });
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const url = `/api/restaurants/${id}/menu`;
        const res = await axios.get(url);
        console.log(res?.data);
        setMenus(res?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchMenus();
  }, [id]);

  return (
    <div className="py-36">
      {loading ? (
        <>
          <p className="my-12 text-center text-3xl">Loading.....</p>
        </>
      ) : (
        <>
          <div className="">
            <div>
              <div>
                {restaurant?.image && restaurant.image.length > 0 && (
                  <div>
                    <Image
                      width={600}
                      height={600}
                      src={restaurant?.image}
                      alt="#"
                      className="rounded-md mb-3 mx-auto"
                    />
                  </div>
                )}
              </div>

              <h1 className="text-amber-400 text-7xl font-bold text-center">
                {restaurant?.name}
              </h1>
              <div className="flex items-center justify-center my-6">
                <div>
                  <FaLocationDot className="text-3xl text-amber-400" />
                </div>
                <div>{restaurant?.location}</div>
              </div>
              <p className="text-amber-50 text-md text-center mt-16 mx-24">
                {restaurant?.description}
              </p>
            </div>

            <div>
              {/* starting menu */}

              <div className="my-12">
                {loading ? (
                  <>
                    <p className="my-12 text-center">Loading.....</p>
                  </>
                ) : (
                  <>
                    {menus?.length === 0 ? (
                      <>
                        <p className="text-red-600 font-bold text-5xl text-center">
                          Sorry, No Menu Available
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12">
                          {menus?.map((prod) => (
                            <div
                              key={prod?.id}
                              className="mb-6 bg-gray-900 hover:bg-gray-900/40 text-center mx-auto p-3"
                            >
                              <Image
                                width={500}
                                height={500}
                                src={prod?.image || "/default.jpg"}
                                // src={
                                //   prod.image.startsWith("http")
                                //     ? prod.image
                                //     : `http://localhost:8000${prod.image}`
                                // }
                                alt="#"
                                className="h-64
                         w-64 rounded-md mb-3"
                              />
                              <h3>{prod?.name}</h3>
                              <div className="flex justify-between items-center py-6 mx-6">
                                <h3>{prod?.price}</h3>
                                <div>
                                  <Link
                                    href={`/restaurants/${restaurant?.id}/menu/${prod?.id}`}
                                  >
                                    <button className="px-4 py-3 rounded-lg bg-orange-500 cursor-pointer">
                                      Details
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

              {/*  */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailspage;
