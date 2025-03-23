"use client";
import Input from "@/Components/shared/Input/Input";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SlClose } from "react-icons/sl";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
}

const EditRestaurantDetails = () => {
  const { id } = useParams();
  const [, setRestaurants] = useState<Restaurant | null>(null);
  const [loading, setLoad] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Restaurant>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/restaurants/${id}`);
        console.log(res.data);
        setRestaurants(res.data);

        setValue("name", res.data.name);
        setValue("description", res.data.description);
        setValue("location", res.data.location);
        setValue("image", res.data.image);
      } catch (err) {
        console.log(err);
        toast.error("Details could not fetched", { duration: 3000 });
      } finally {
        setLoad(false);
      }
    };
    fetchDetails();
  }, [id, setValue]);

  const handleRestaurantUpdate: SubmitHandler<Restaurant> = async (data) => {
    try {
      const res = await axios.put(
        `/api/restaurants/${id}`,
        {
          name: data.name,
          location: data.location,
          image: data.image,
          description: data.description,
          owner: user?.id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/dashboard/restaurants");
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
          <h2 className="text-3xl font-bold">Restaurant</h2>
          <p className="text-sm text-gray-400">Update Restaurant Details</p>
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
                label="Location"
                type="text"
                {...register("location", {
                  required: true,
                })}
              />
              {errors.location && (
                <p>
                  {errors.location.message && String(errors.location.message)}
                </p>
              )}

              <Input
                label="Image"
                type="file"
                className="border-none"
                {...register("image", {
                  required: true,
                })}
              />
              {errors.image && (
                <p>{errors.image.message && String(errors.image.message)}</p>
              )}

              <label htmlFor="img" className="inline-block mb-1 pl-1">
                Description
              </label>
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
