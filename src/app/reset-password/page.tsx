"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/Components/shared/Input/Input";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

interface LoginForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const UpdatePage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error] = useState<string | null>("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/reset-confirm", {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      const userData = {
        id: res.data.user_id,
        accessToken: res.data.access,
      };
      login(userData.id, userData.accessToken);
      router.push("/");
      console.log(userData);
      console.log(res.data);
      toast.success("logged in", { duration: 3000 });
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
      <div className="flex items-center justify-center w-full my-24">
        <div
          className={`mx-auto w-full max-w-lg rounded-xl p-10 border border-black/10`}
        >
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Input
                label="Confirm Password "
                type="password"
                placeholder="Enter your password"
                {...register("confirmPassword", {
                  required: true,
                })}
              />
              <button
                type="submit"
                className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
