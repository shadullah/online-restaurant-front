import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 bg-gray-900 w-full h-[80px] z-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="logo">
              <Link href="/">
                <h1 className="text-4xl font-bold text-gray-50 uppercase">
                  Quick Food
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="navlinks">
              <ul className="flex items-center gap-8">
                {/* {currentUser && (
                <li>
                  <button className=" text-gray-800 hover:text-indigo-600 overflow-hidden">
                    <span className="inline-block">
                      <Link href="/dashboard">Dashboard</Link>
                    </span>
                  </button>
                </li>
              )} */}

                <li>
                  <button className=" text-gray-100 hover:text-indigo-600 overflow-hidden">
                    <Link href="/restaurants">Restaurants</Link>
                  </button>
                </li>

                {/* <li>
                  <button className=" text-gray-100 hover:text-indigo-600 overflow-hidden">
                    <Link href="/login">Menu</Link>
                  </button>
                </li> */}
                <li>
                  <button className=" text-gray-100 hover:text-indigo-600 overflow-hidden">
                    <Link href="/login">Login</Link>
                  </button>
                </li>

                <li>
                  <button className="button text-gray-100 hover:text-yellow-600 border-[0.5px] border-yellow-600 rounded-full cursor-pointer px-6 py-2 overflow-hidden">
                    <span className="inline-block">Get in touch</span>
                  </button>
                </li>
                {/* <li>
                  {currentUser ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button className=" text-gray-800 hover:text-indigo-600 overflow-hidden">
                    <Link href="/login">Login</Link>
                  </button>
                )}
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
