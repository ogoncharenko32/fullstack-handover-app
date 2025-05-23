// "use client";

// import {
//   createShift,
//   fetchShifts,
//   setSelectedShift,
// } from "@/lib/slices/ShiftSlice";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ShiftModal from "./modal";

// const Shifts = () => {
//   const shiftInLocalStorage = localStorage.getItem("shiftId");
//   const [isOpen, setIsOpen] = useState(false);

//   const {
//     data: shifts,
//     loading,
//     error,
//     selectedShift: shiftId,
//     selectedDay,
//   } = useSelector((state) => state.shifts);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (shiftInLocalStorage) {
//       dispatch(setSelectedShift(+shiftInLocalStorage));
//     }
//     if (selectedDay) {
//       dispatch(fetchShifts(selectedDay));
//     }
//   }, [selectedDay, dispatch]);

//   const handleSelectShift = (id) => {
//     dispatch(setSelectedShift(id));
//     localStorage.setItem("shiftId", id);
//   };

//   return loading ? (
//     <div>Loading...</div>
//   ) : (
//     <div className=" md:min-w-fit w-full  border rounded-md p-2 border-gray-400">
//       <div className="flex justify-between text-center">
//         <h2>Shifts</h2>

//         <button
//           onClick={() => setIsOpen(true)}
//           className="p-1 mb-1 border border-gray-400 rounded cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100"
//         >
//           Start new shift
//         </button>
//       </div>
//       <ul className="md:flex md:flex-col gap-2 grid grid-cols-3">
//         <ShiftModal isOpen={isOpen} setIsOpen={setIsOpen} />
//         {shifts?.map((shift) => (
//           <button
//             onClick={() => handleSelectShift(shift.id)}
//             className={`p-1 mb-1 border border-gray-400 rounded cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 ${
//               shift.id === shiftId ? "bg-gray-400 text-gray-100" : ""
//             }`}
//             key={shift.id}
//           >
//             <li key={shift.id}>
//               <p>{shift.name}</p>
//               <p>{`${shift.created_at.split("T")[0]} ${
//                 shift.created_at.split("T")[1].split(":")[0]
//               }:${shift.created_at.split("T")[1].split(":")[1]}`}</p>
//             </li>
//           </button>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Shifts;

"use client";

import {
  createShift,
  fetchShifts,
  setSelectedShift,
} from "@/lib/slices/ShiftSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShiftModal from "./modal";

const Shifts = ({ setShiftModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    data: shifts,
    loading,
    selectedShift: shiftId,
    selectedDay,
  } = useSelector((state) => state.shifts);

  useEffect(() => {
    const storedId = localStorage.getItem("shiftId");
    if (storedId) {
      dispatch(setSelectedShift(+storedId));
    }
    if (selectedDay) {
      dispatch(fetchShifts(selectedDay));
    }
  }, [selectedDay, dispatch]);

  const handleSelectShift = ({ id, name }) => {
    dispatch(setSelectedShift(id));
    localStorage.setItem("shiftId", id);
    localStorage.setItem("shiftName", name);

    setShiftModalOpen(false);
  };

  return (
    <div className="h-full w-full  rounded-md p-1  bg-[--background] dark:bg-gray-800 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[1.2rem] font-semibold">Shifts</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="w-[50%] py-2 px-4 bg-blue-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition cursor-pointer"
        >
          Start New Shift
        </button>
      </div>
      <ShiftModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ul className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1  w-full h-full">
        {loading ? (
          <li className="text-gray-500">Loading...</li>
        ) : (
          shifts?.map((shift) => (
            <li key={shift.id}>
              <button
                onClick={() => handleSelectShift(shift)}
                className={`w-full text-right p-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 transition flex flex-col gap-1  ${
                  shift.id === shiftId
                    ? "bg-gray-200 border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    : ""
                }`}
              >
                <div className="font-medium text-gray-800 dark:text-gray-100">
                  {shift.name}
                </div>
                <div className="text-sm text-gray-500 mr-auto">
                  {new Date(shift.created_at).toLocaleString().split(",")[0]}
                </div>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Shifts;
