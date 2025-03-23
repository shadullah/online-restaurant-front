"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import Input from "@/Components/shared/Input/Input";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error] = useState<string | null>("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });

      if (!res.data?.user_id) {
        throw new Error("Login failed: User ID not found in response");
      }

      const userData = {
        id: res.data.id,
        refreshToken: res.data.refreshToken,
        accessToken: res.data.accessToken,
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
      <div className="flex items-center justify-center w-full my-12">
        <div
          className={`mx-auto w-full max-w-lg bg-orange-400 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full text-xl text-center font-bold">
              Quick Food
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              href="/signup"
              className="font-medium text-primary transition-all duration-200 underline"
            >
              Sign Up
            </Link>
          </p>
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
              <button
                type="submit"
                className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
