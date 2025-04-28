// import {
//   SignInButton,
//   SignOutButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import Link from "next/link";
// import React from "react";

// const Navigation = () => {
//   return (
//     <nav className="flex justify-between items-center bg-white dark:bg-gray-800 text-blue-500 dark:text-gray-200">
//       <Link href="/" className="w-fit  p-4">
//         <h2 className="text-2xl size-semibold text-nowrap">Handover App</h2>
//       </Link>
//       <div className="p-4 flex gap-4 justify-center items-center">
//         <SignedOut>
//           <SignInButton mode="modal">
//             <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
//               Sign In
//             </button>
//           </SignInButton>
//           <SignUpButton mode="modal">
//             <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
//               Sign Up
//             </button>
//           </SignUpButton>
//         </SignedOut>
//         <SignedIn>
//           <a
//             className="block sm:px-4 sm:py-2 sm:w-fit border rounded-lg text-nowrap cursor-pointer invisible w-0 sm:visible"
//             href="https://jira-cableos.harmonicinc.com/projects/TAC/issues"
//             target="_blank"
//           >
//             Open Jira
//           </a>
//           <Link
//             className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer"
//             href="/dashboard"
//           >
//             Dashboard
//           </Link>
//           <SignOutButton>
//             <button className="block px-4 py-2 w-fit border rounded-lg text-nowrap cursor-pointer">
//               Sign Out
//             </button>
//           </SignOutButton>
//         </SignedIn>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

"use client";

import Calendar from "@/app/dashboard/@calendar/page";
import Shifts from "@/app/dashboard/@shifts/page";
import { PiGearSixThin } from "react-icons/pi";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
import Greet from "@/app/dashboard/@tickets/greet";

const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 flex flex-col p-4 bg-white dark:bg-gray-900  border-gray-200 dark:border-gray-700 shadow-sm w-[80px] lg:w-[250px] lg:min-w-[250px] h-[100dvh] gap-4">
      <div>
        <Link
          href="/"
          className="hidden lg:inline-block text-[1.2rem] font-bold text-blue-600 dark:text-white hover:opacity-80 transition-opacity"
        >
          Handover App
          <p className="inline-block text-[0.5rem] text-gray-500">v0.2</p>
        </Link>
      </div>

      <div className="flex gap-3  flex-col items-end h-full">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="hidden lg:block w-full px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="hidden lg:block w-full px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Greet />
          <Link
            href="/dashboard"
            className={`flex justify-between items-center gap-2 w-full px-4 py-2 text-[1rem] text-end font-medium   text-blue-500 rounded-lg hover:opacity-80 dark:hover:bg-gray-700 transition ${
              isActive("/dashboard")
                ? "bg-blue-500 text-white cursor-default hover:opacity-100"
                : ""
            }`}
          >
            <PiGearSixThin size={20} />
            <p className="hidden lg:block">Dashboard</p>
          </Link>
          <Link
            href="/mw"
            className={`flex justify-between items-center gap-2 w-full px-4 py-2 text-[1rem] text-end font-medium   text-blue-500 rounded-lg hover:opacity-80 dark:hover:bg-gray-700 transition ${
              isActive("/mw")
                ? "bg-blue-500 text-white cursor-default hover:opacity-100"
                : ""
            }`}
          >
            <HiWrenchScrewdriver size={20} />
            <p className="hidden lg:block">Maintenances</p>
          </Link>
          {/* <Calendar />
          <Shifts /> */}
          <a
            href="https://jira-cableos.harmonicinc.com/projects/TAC/issues"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex gap-2 justify-end items-center w-full px-4 py-2 text-[1rem] text-end font-medium   text-blue-500 rounded-lg hover:opacity-80 dark:hover:bg-gray-700 transition`}
          >
            <p className="hidden lg:block">Open Jira</p>
            <LiaExternalLinkAltSolid size={20} />
          </a>

          <SignOutButton>
            <button className=" flex gap-2 items-center box-border px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition mt-auto mr-auto">
              <p className="hidden lg:block">Sign Out</p>
              <IoIosLogOut size={20} className="lg:hidden" />
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
