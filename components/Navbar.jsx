"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listVals } from "../app/utils/navlist";
import { FaGear } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold text-black">
            finatics.
          </span>
        </Link>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {listVals.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 ${
                    pathname === item.url ? "text-blue-700 underline underline-offset-4 font-bold"  : "text-gray-900"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row">
          <Link href="/settings">
            <FaGear className="w-6 h-6 text-gray-900" />
          </Link>
          <Link href="/notifications">
            <CgProfile className="w-6 h-6 text-gray-900 ml-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
