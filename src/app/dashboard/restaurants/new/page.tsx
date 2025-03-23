"use client";
import Input from "@/Components/shared/Input/Input";
import Link from "next/link";
import React from "react";

const AdminRestaurant = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Create New Restaurant</h1>
        <Link href="/dashboard" className="text-amber-400 hover:text-amber-600">
          &larr; Back to Dashboard
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" type="text" />
          <Input label="Location" type="text" />
          <Input label="Image" type="file" className="border-none" />

          <label htmlFor="img" className="inline-block mb-1 pl-1">
            Description
          </label>
          <textarea
            // type="text"
            placeholder=""
            className="w-full p-2 border rounded"
            onInput={(e) => {
              e.currentTarget.style.height = "auto"; // Reset height
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Adjust height dynamically
            }}
            // {...register("address", {
            //   required: true,
            // })}
          />

          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 rounded-md py-2 font-bold text-white cursor-pointer"
            >
              ADD NOW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRestaurant;
