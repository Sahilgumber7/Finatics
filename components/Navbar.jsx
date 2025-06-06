"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listVals } from "../app/utils/navlist";
import { CgProfile } from "react-icons/cg";
import { DarkModeToggle } from "./DarkModeToggle";
import { useSession, signOut } from "next-auth/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold text-black dark:text-white">
            finatics.
          </span>
        </Link>

        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:md:bg-gray-900">
            {listVals.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`block py-2 px-3 rounded md:bg-transparent md:hover:text-blue-700 dark:md:hover:text-blue-400 md:p-0 ${
                    pathname === item.url
                      ? "text-blue-700 dark:text-blue-400 underline underline-offset-4 font-bold"
                      : "text-gray-900 dark:text-gray-300"
                  }`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row items-center space-x-1">
          <DarkModeToggle />

          {/* Profile Icon with Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="User profile"
                className="ml-4 focus:outline-none"
              >
                <CgProfile className="w-6 h-6 text-gray-900 dark:text-gray-300" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-56 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Signed in with
              </p>
              <p
                className="truncate font-medium mb-4 text-gray-900 dark:text-gray-100"
                title={session?.user?.email}
              >
                {session?.user?.email || "No email found"}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
