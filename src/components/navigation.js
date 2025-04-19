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
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600 dark:text-white hover:opacity-80 transition-opacity"
      >
        Handover App
      </Link>

      <div className="flex gap-3 items-center">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <a
            href="https://jira-cableos.harmonicinc.com/projects/TAC/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-4 py-2 text-sm font-medium border border-gray-400 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Open Jira
          </a>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
          <SignOutButton>
            <button className="px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700 transition">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
