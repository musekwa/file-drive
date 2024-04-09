import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-40 light:bg-gray-100 dark:bg-slate-900 mt-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-sky-600/90">
          <span>File</span>
          <span className="text-slate-500">Drive</span>
        </h1>
        <Link
          className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
          href={"/privacy"}
        >
          Privacy Policy
        </Link>
        <Link
          className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
          href={"/terms-of-service"}
        >
          Privacy Policy
        </Link>
        <Link
          className="text-sky-600/90 hover:text-sky-800 cursor-pointer"
          href={"/about"}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
