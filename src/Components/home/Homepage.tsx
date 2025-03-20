import React from "react";

const Homepage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6 my-56">
        <h3 className="text-5xl text-center font-bold">
          Welcome to Quick Food
        </h3>
        <p className="text-3xl font-medium text-center">
          A Online Restaurant management App
        </p>
        <div className="text-center ">
          <button className="border-amber-400 px-6 py-4 border-2 rounded-3xl">
            Order now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
