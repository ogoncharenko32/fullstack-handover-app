"use client";

import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShift, setSelectedShift } from "@/lib/slices/ShiftSlice";

const ShiftModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [shiftName, setShiftName] = useState(null);
  const { selectedShift } = useSelector((state) => state.shifts);

  const handleCreateShift = async (e) => {
    e.preventDefault();
    if (shiftName) {
      const response = await dispatch(createShift(shiftName));
      dispatch(setSelectedShift(response.payload.data.shift.id));
      localStorage.setItem("shiftId", response.payload.data.shift.id);
      setIsOpen(false);
    } else {
      alert("Please Enter Shift Name");
    }
    // router.push(`/dashboard/shifts/${responce.id}`);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"z-50 relative"}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-4 w-fit h-fit flex flex-col text-center justify-evenly items-center gap-4 rounded">
          <form
            onSubmit={handleCreateShift}
            className="flex flex-col gap-4 w-full h-full items-center justify-start    p-4"
          >
            <label className="flex flex-col gap-2 ">
              <span className="text-gray-600">Shift Name</span>
              <input
                onChange={(e) => setShiftName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name your shift. Date and time will be added automatically"
                className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
              />
            </label>
            <div className="flex gap-4 w-full">
              <button
                type="submit"
                className=" border border-gray-400 rounded cursor-pointer w-full text-gray-600 dark:text-gray-300 hover:bg-gray-400 hover:text-gray-100 focus:outline-0 bg-blue-100"
              >
                Create Shift
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-gray-400 rounded cursor-pointer w-full text-gray-600 dark:text-gray-300 hover:bg-gray-400 hover:text-gray-100 focus:outline-0"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default ShiftModal;
