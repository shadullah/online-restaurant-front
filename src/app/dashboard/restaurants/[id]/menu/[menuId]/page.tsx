"use client";
import Input from "@/Components/shared/Input/Input";
// import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";

// interface Restaurant {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   location: string;
// }

interface Menu {
  id: string;
  price: number;
  name: string;
  image: string;
  description: string;
  is_available: boolean;
  restaurant: string;
}

const EditRestaurantDetails = () => {
  const { id, menuId } = useParams();
  const [, setRestaurant] = useState<Menu | null>(null);
  const [loading, setLoad] = useState(true);
  const router = useRouter();
  // const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Menu>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/restaurants/${id}/menu/${menuId}`);
        console.log(res.data);
        setRestaurant(res.data);

        setValue("name", res.data.name);
        setValue("description", res.data.description);
        setValue("price", res.data.price);
        setValue("is_available", res.data.is_available);
        setValue("image", res.data.image);
      } catch (err) {
        console.log(err);
        toast.error("Details could not fetched", { duration: 3000 });
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [id, setValue, menuId]);

  const handleRestaurantUpdate: SubmitHandler<Menu> = async (data) => {
    try {
      console.log("clicked");
      const res = await axios.put(
        `/api/restaurants/${id}/menu/${menuId}`,
        {
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          is_available: data.is_available,
          restaurant: id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/dashboard/menus");
      console.log(res.data);
      toast.success("Restaurant Info updated", { duration: 3000 });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occured during login";
      toast.error(errorMessage, { duration: 3000 });
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">Menu</h2>
          <p className="text-sm text-gray-400">Update Menu Details</p>
        </div>
        <Link href="/dashboard/restaurants">
          <button className="p-3 rounded-xl border border-white hover:bg-gray-700 transition-colors">
            <SlClose className="w-5 h-5" />
          </button>
        </Link>
      </div>
      <div>
        {loading ? (
          <>
            <p className="my-12 text-center text-xl">Loading.....</p>
          </>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(handleRestaurantUpdate)}
              className="space-y-4"
            >
              <Input
                label="Name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <p>{errors.name.message && String(errors.name.message)}</p>
              )}
              <Input
                label="Price"
                type="number"
                {...register("price", {
                  required: true,
                })}
              />
              {errors.price && (
                <p>{errors.price.message && String(errors.price.message)}</p>
              )}

              <label className="inline-block mb-1 pl-1">Choose Stock</label>
              <select
                {...register("is_available", { required: true })}
                className="w-full p-2 border rounded bg-gray-950"
              >
                <option value="">Select Availability</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
              {errors.is_available && (
                <p className="text-red-600">{errors.is_available.message}</p>
              )}

              <Input
                label="Image"
                type="file"
                className="border-none bg-gray-950"
                {...register("image", {
                  required: true,
                })}
              />
              {errors.image && (
                <p>{errors.image.message && String(errors.image.message)}</p>
              )}

              <label className="inline-block mb-1 pl-1">Description</label>
              <textarea
                placeholder=""
                className="w-full p-2 border rounded"
                onInput={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description && (
                <p>
                  {errors.description.message &&
                    String(errors.description.message)}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
                >
                  Update Details
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditRestaurantDetails;
