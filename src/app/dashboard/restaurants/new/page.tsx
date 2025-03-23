"use client";
import Input from "@/Components/shared/Input/Input";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface RestuForm {
  name: string;
  location: string;
  image: string;
  description: string;
}

const AdminRestaurant = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestuForm>();
  // const [error] = useState<string | null>("");
  const router = useRouter();
  const { user } = useAuth();

  const handleRestaurantCreate: SubmitHandler<RestuForm> = async (data) => {
    try {
      const res = await axios.post(
        "/api/restaurants",
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
      toast.success("New Restaurant added", { duration: 3000 });
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
        <h1 className="text-2xl font-bold">Create New Restaurant</h1>
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
            label="Location"
            type="text"
            {...register("location", {
              required: true,
            })}
          />
          {errors.location && (
            <p>{errors.location.message && String(errors.location.message)}</p>
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

export default AdminRestaurant;
