"use client";

import { createMaintenance } from "@/lib/slices/MaintenanceSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MaintenanceModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mwName, setMwName] = useState("");
  const loading = useSelector((state) => state.maintenances.loading);

  const handleCreateMaintenance = async (e) => {
    e.preventDefault();

    if (mwName) {
      const response = await dispatch(createMaintenance(mwName));

      if (response) {
        router.push(`/mw/${response.payload.data.id}`);
      }
      setIsOpen(false);
    } else {
      alert("Please enter a shift name");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="z-50 relative"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      <DialogPanel>
        <div
          className="fixed inset-0 flex items-center w-fit h-fit justify-center p-4 m-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white dark:bg-gray-800 p-6 w-[90vw] max-w-md rounded-lg shadow-md flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">
              {loading ? "Loading..." : "Start New Maintenance"}
            </h2>
            <form
              onSubmit={handleCreateMaintenance}
              className="flex flex-col gap-4"
            >
              <label className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                Maintenance Name
                <input
                  onChange={(e) => setMwName(e.target.value)}
                  value={mwName}
                  name="name"
                  type="text"
                  placeholder="Name your maintenance."
                  className="border border-gray-400 rounded p-2 w-full dark:text-gray-300 placeholder:text-gray-400 focus:outline-none"
                />
              </label>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  Start Maintenance
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-gray-400 rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MaintenanceModal;
