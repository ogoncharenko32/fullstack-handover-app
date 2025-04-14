"use client";

import {
  createShift,
  fetchShifts,
  setSelectedShift,
} from "@/lib/slices/ShiftSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShiftModal from "./modal";

const Shifts = () => {
  const shiftInLocalStorage = localStorage.getItem("shiftId");
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: shifts,
    loading,
    error,
    selectedShift: shiftId,
    selectedDay,
  } = useSelector((state) => state.shifts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shiftInLocalStorage) {
      dispatch(setSelectedShift(+shiftInLocalStorage));
    }
    if (selectedDay) {
      dispatch(fetchShifts(selectedDay));
    }
  }, [selectedDay, dispatch]);

  const handleSelectShift = (id) => {
    dispatch(setSelectedShift(id));
    localStorage.setItem("shiftId", id);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className=" md:min-w-fit w-full  border rounded-md p-2 border-gray-400">
      <div className="flex justify-between text-center">
        <h2>Shifts</h2>

        <button
          onClick={() => setIsOpen(true)}
          className="p-1 mb-1 border border-gray-400 rounded cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100"
        >
          Start new shift
        </button>
      </div>
      <ul className="md:flex md:flex-col gap-2 grid grid-cols-3">
        <ShiftModal isOpen={isOpen} setIsOpen={setIsOpen} />
        {shifts?.map((shift) => (
          <button
            onClick={() => handleSelectShift(shift.id)}
            className={`p-1 mb-1 border border-gray-400 rounded cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 ${
              shift.id === shiftId ? "bg-gray-400 text-gray-100" : ""
            }`}
            key={shift.id}
          >
            <li key={shift.id}>
              <p>{shift.name}</p>
              <p>{`${shift.created_at.split("T")[0]} ${
                shift.created_at.split("T")[1].split(":")[0]
              }:${shift.created_at.split("T")[1].split(":")[1]}`}</p>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Shifts;
