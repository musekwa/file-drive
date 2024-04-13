import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="minh-40 light:bg-gray-200 dark:bg-slate-900 ">
      <div className=" min-h-32  mt-12 flex items-center border-t-2 py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-lg font-bold text-sky-600/90">
            <span>File</span>
            <span className="text-slate-500">Drive</span>
          </h1>
          <div className="h-0.5 bg-gray-300 w-full md:hidden" />
          <Link
            className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
            href={"#"}
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
            href={"#"}
          >
            Terms of Service
          </Link>
          <Link
            className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
            href={"/about-us"}
          >
            About Us
          </Link>
        </div>
      </div>
      <div className="border-b w-full bg-gray-500" />
      <p className="text-center text-gray-400 text-[12px] p-2">
        Copyright © 2024 <span className="font-bold">Tecmoza</span>. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
