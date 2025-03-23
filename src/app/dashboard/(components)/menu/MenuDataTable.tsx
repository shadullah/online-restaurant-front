"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface Restaurants {
  id: string;
  name: string;
  image: string;
  location: string;
}
interface Menus {
  id: number;
  price: number;
  name: string;
  image: string;
  description: string;
  is_available: boolean;
  restaurant_id?: string;
}

const MenuDataTable = () => {
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [menus, setMenus] = useState<Record<string, Menus[]>>({});
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const url = `/api/restaurants`;
        const res = await axios.get(url);
        setRestaurants(res?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      if (restaurants.length === 0) return;
      try {
        setLoad(true);
        const menuData: Record<string, Menus[]> = {};

        for (const restu of restaurants) {
          const url = `/api/restaurants/${restu.id}/menu`;
          const res = await axios.get(url);
          console.log(res?.data);
          menuData[restu.id] = res?.data || [];
          console.log(menuData[restu.id]);
        }

        setMenus(menuData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchMenus();
  }, [restaurants]);

  // const handleDelete = async (id: string) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete the restaurant??"
  //   );

  //   if (!confirmDelete) {
  //     return;
  //   }

  //   try {
  //     await axios.delete(`/api/restaurants/${id}`);
  //     setRestaurants((prev) =>
  //       prev.filter((restaurant) => restaurant.id !== id)
  //     );
  //     toast.success("deleted success!!", { duration: 3000 });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to delete restaurant!!!");
  //   }
  // };

  return (
    <div>
      <div className="">
        {loading ? (
          <div className="text-center p-4 text-gray-100">Loading...</div>
        ) : (
          restaurants.map((rest) => (
            <div key={rest.id}>
              <h2 className="text-2xl font-bold m-4">{rest.name}</h2>
              <div className="w-full border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800 border-b">
                    <tr>
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Available</th>
                      <th className="p-3 text-left">Update</th>
                      <th className="p-3 text-left">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus[rest.id]?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center p-4 text-gray-500"
                        >
                          No menus found
                        </td>
                      </tr>
                    ) : (
                      menus[rest?.id]?.map((restaurant, index) => (
                        <tr
                          key={restaurant.id || index}
                          className="border-b hover:bg-gray-800"
                        >
                          <td className="p-3">
                            <Image
                              src={restaurant?.image}
                              alt={restaurant?.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="p-3 font-medium">{restaurant.name}</td>
                          <td className="p-3">
                            <div className="flex gap-2">{restaurant.price}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              {restaurant?.is_available ? (
                                <>YES</>
                              ) : (
                                <>
                                  <p>NO</p>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <Link
                              href={`/dashboard/restaurants/${restaurant.id}`}
                            >
                              <button className="text-green-200 hover:bg-green-600 p-2 rounded-full transition-all duration-200 text-2xl cursor-pointer">
                                <FaRegEdit />{" "}
                              </button>
                            </Link>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              // onClick={() => handleDelete(restaurant?.id)}
                              className="text-red-200 hover:bg-red-600 p-2 rounded-full transition-all duration-200 text-2xl cursor-pointer"
                            >
                              <MdDeleteOutline />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuDataTable;
