"use client";

import { fetchMaintenaces } from "@/lib/slices/MaintenanceSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaintenanceModal from "./modal";

const MaintenancePage = () => {
  const dispatch = useDispatch();
  const maintenances = useSelector((state) => state.maintenances.data);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMaintenaces());
  }, []);

  const handleStartNewMaintenance = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col w-full h-fit p-4  bg-[--background]">
      <button
        className="bg-blue-500 hover:bg-blue-700 max-w-md text-white font-bold py-2 px-4 rounded cursor-pointer m-auto"
        onClick={() => {
          handleStartNewMaintenance();
        }}
      >
        Start New Maintenance
      </button>
      <MaintenanceModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ul className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-1 mt-2 p-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200  justify-center items-start rounded-[30px]">
        {maintenances?.map((maintenance) => (
          <li
            className="  rounded  cursor-pointer  dark:bg-gray-700 dark:hover:bg-gray-800"
            key={maintenance.id}
          >
            <Link href={`/mw/${maintenance.id}`}>
              <div className="bg-blue-300 hover:bg-blue-500  rounded-lg cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-800">
                <h3 className="text-white font-bold py-2 px-4">
                  {maintenance.name}
                </h3>
                <p className="text-white font-bold py-2 px-4">
                  {`${maintenance.created_at.split("T")[0]} ${
                    maintenance.created_at.split("T")[1].split(".")[0]
                  }`}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenancePage;
