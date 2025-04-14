import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-800 text-blue-500 dark:text-gray-200">
      <div className="w-full  p-4">
        <h2 className="text-2xl size-semibold">Handover App</h2>
      </div>
      <div className="p-4 flex gap-4 justify-center items-center">
        {/* <Link
          className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer"
          href="/dashboard"
        >
          Dashboard
        </Link> */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
