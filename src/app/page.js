import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col w-full m-auto items-center justify-center">
      <h1>Welcome to Handover App v0.1</h1>
      <p>By using this dashboard, you can manage your shifts and tickets</p>
      <p>Sign in to get started</p>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="lg:hidden w-[50dvw] px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition mt-4">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="lg:hidden w-[50dvw] px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition mt-4">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
