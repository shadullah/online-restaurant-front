"use client";
import Input from "@/Components/shared/Input/Input";
import useRestaurants from "@/hooks/useRestaurants";
// import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface MenuForm {
  id: number;
  price: number;
  name: string;
  image: string;
  description: string;
  is_available: boolean;
  restaurant_id?: string;
}

const AdminMenu = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuForm>();
  // const [error] = useState<string | null>("");
  const router = useRouter();
  //   const { user } = useAuth();
  const [restaurants, loading] = useRestaurants();

  const handleRestaurantCreate: SubmitHandler<MenuForm> = async (data) => {
    try {
      const res = await axios.post(
        `/api/restaurants/${data.restaurant_id}/menu`,
        {
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description,
          is_available: data.is_available,
          restaurant: data.restaurant_id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/dashboard/menus");
      console.log(res.data);
      toast.success("New Menu added", { duration: 3000 });
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Create New Menu</h1>
        <Link href="/dashboard" className="text-amber-400 hover:text-amber-600">
          &larr; Back to Dashboard
        </Link>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(handleRestaurantCreate)}
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

          <Input
            label="Image"
            type="file"
            className="border-none bg-gray-900"
            {...register("image", {
              required: true,
            })}
          />
          {errors.image && (
            <p>{errors.image.message && String(errors.image.message)}</p>
          )}

          <label className="inline-block mb-1 pl-1">Restaurant</label>
          <select
            {...register("restaurant_id", { required: true })}
            className="w-full p-2 border rounded bg-gray-950"
          >
            <option value="">Select Restaurant</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))
            )}
          </select>

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

          <label htmlFor="img" className="inline-block mb-1 pl-1">
            Description
          </label>
          <textarea
            // type="text"
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
              {errors.description.message && String(errors.description.message)}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
            >
              ADD NOW
            </button>
          </div>

          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default AdminMenu;
