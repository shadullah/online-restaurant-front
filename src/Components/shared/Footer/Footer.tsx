"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { SiAwwwards } from "react-icons/si";

const FooterCard = () => {
  return (
    <div className="text-gray-900 bg-gray-200 rounded-3xl p-12 text-center">
      <h1 className="mb-6 text-4xl font-bold">Let&apos;s get started</h1>
      <p className="mb-10">we&apos;d love to hear about your project</p>
      <button className="bg-gradient-to-l from-indigo-600 to-indigo-800 px-8 md:px-12 py-3 text-white rounded-full text-xl md:text-2xl font-medium relative overflow-hidden w-full md:w-1/2 h-[100px] hover:scale-105 transition-all duration-500">
        <span className="absolute text-center w-full left-0 top-1/2 -translate-y-1/2">
          Get in touch
        </span>
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <section className="px-4 py-16 md:py-32 max-w-7xl mx-auto">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <p className="text-2xl md:text-4xl mb-12 md:mb-24 font-bold leading-snug">
                We love crafting unforgettable digital experiences, brands and
                websites with people like you.
              </p>
              <p className="text-sm mb-3 md:mb-6">Get in touch</p>
              <div className="space-y-2 md:space-y-4 mb-8 md:mb-16 font-semibold">
                <p className="text-2xl">+44 0203 576 2072</p>
                <p className="text-2xl">info@care2training.com</p>
                <p className="text-2xl">
                  Unit 301, 3rd Floor, 7 Kirkdale Road, Bushwood, London E11
                  1HP, UK
                </p>
              </div>
            </div>
            <div className="p-8 rounded-lg">
              <div className="bg-gray-800 px-6 md:px-12 py-3 md:py-6 text-2xl rounded-3xl text-white block md:flex  justify-between mb-6 md:mb-12">
                <div>
                  <p>Follow us</p>
                </div>
                <div className="flex items-center space-x-8">
                  <p className="hover:text-violet-700 hover:scale-150 duration-200">
                    <FaInstagram />
                  </p>
                  <p className="hover:text-blue-700 hover:scale-150 duration-200">
                    <FaFacebook />
                  </p>
                  <p className="hover:text-blue-700 hover:scale-150 duration-200">
                    <FaX />
                  </p>
                  <p className="hover:text-violet-700 hover:scale-150 duration-200">
                    <SiAwwwards />
                  </p>
                </div>
              </div>
              <FooterCard />
            </div>
          </div>
        </div>
        {/* bottom footer */}
        <div className="bottom-footer block md:flex justify-between">
          <div>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Care2 training Ltd . All rights
              reserved.{" "}
            </p>
          </div>
          <div className="text-gray-500 space-x-8 mt-4">
            <span>
              <Link href="/">Privacy Policy</Link>
            </span>
            <span>
              <Link href="/">Terms of Services</Link>
            </span>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
