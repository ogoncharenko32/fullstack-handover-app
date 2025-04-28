"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
const Greet = () => {
  const { user } = useUser();

  return (
    <div className="text-[1.2rem] text-right">{`Hello, ${
      user?.firstName || "Guest"
    } 👋`}</div>
  );
};

export default Greet;
