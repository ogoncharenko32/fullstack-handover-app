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

const Shifts = () => {
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

  const handleSelectShift = (id) => {
    dispatch(setSelectedShift(id));
    localStorage.setItem("shiftId", id);
  };

  return (
    <div className="w-full border rounded-md p-3 border-gray-400 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Shifts</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-1 py-1 text-sm border border-gray-400 rounded hover:bg-gray-400 hover:text-white"
        >
          Start New Shift
        </button>
      </div>
      <ShiftModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ul className="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-2">
        {loading ? (
          <li className="text-gray-500">Loading...</li>
        ) : (
          shifts?.map((shift) => (
            <li key={shift.id}>
              <button
                onClick={() => handleSelectShift(shift.id)}
                className={`w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-100 transition ${
                  shift.id === shiftId ? "bg-gray-200 border-gray-400" : ""
                }`}
              >
                <div className="font-medium text-gray-800">{shift.name}</div>
                <div className="text-sm text-gray-500">
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
