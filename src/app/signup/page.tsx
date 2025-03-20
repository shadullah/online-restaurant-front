"use client";
import Input from "@/Components/shared/Input/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface SignupForm {
  username: string;
  email: string;
  address: string;
  password: string;
  image: string;
  user_type: boolean;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupForm>();
  const [error, setErr] = useState<string | null>("");
  const navigate = useRouter();

  //   const password = watch("password");

  const create: SubmitHandler<SignupForm> = async (data) => {
    setErr("");
    try {
      const userReg = await axios.post(
        "/api/users",
        {
          username: data.username,
          email: data.email,
          address: data.address,
          image: data.image,
          user_type: data.user_type,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successfull", userReg.data);
      navigate.push("/login");
      toast.success("registration complete, Login now!!", { duration: 3000 });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-12">
        <div
          className={`mx-auto w-full max-w-lg bg-orange-400 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full text-xl text-center font-bold">
              Quick Food
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              href="/login"
              className="font-medium text-primary transition-all duration-200 underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Username: "
                placeholder="Enter your username"
                type="name"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <p>
                  {errors.username.message && String(errors.username.message)}
                </p>
              )}

              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <p>{errors.email.message && String(errors.email.message)}</p>
              )}

              <textarea
                // type="text"
                placeholder="Enter your Address"
                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full "
                {...register("address", {
                  required: true,
                })}
              />
              {errors.address && (
                <p>
                  {errors.address.message && String(errors.address.message)}
                </p>
              )}

              {/* <label className="block text-gray-900 font-semibold">
                Select User Type:
              </label> */}
              <select
                {...register("user_type", { required: true })}
                className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full "
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Owner">Owner</option>
              </select>
              {errors.user_type && (
                <p className="text-red-600">{errors.user_type.message}</p>
              )}

              <Input
                label="Image: "
                type="file"
                placeholder="Enter your image"
                {...register("image", {
                  required: true,
                })}
              />
              {errors.image && (
                <p>{errors.image.message && String(errors.image.message)}</p>
              )}

              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p>
                  {errors.password.message && String(errors.password.message)}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
