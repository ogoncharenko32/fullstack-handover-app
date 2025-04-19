// "use client";

// import { setDay } from "@/lib/slices/ShiftSlice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function Calendar() {
//   const selectedDayInLocalStorage = localStorage.getItem("selectedDay");
//   const { selectedDay } = useSelector((state) => state.shifts);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (selectedDayInLocalStorage) {
//       dispatch(setDay(selectedDayInLocalStorage));
//     }
//   }, [selectedDayInLocalStorage, dispatch]);

//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
//   const firstDayOfMonth =
//     new Date(currentYear, currentMonth + 1, 1).getDay() + 1;

//   const tzOffset = new Date().getTimezoneOffset() * 60 * 1000;

//   const currentDayIndex = new Date(new Date() - tzOffset)
//     .toISOString()
//     .split("T")[0];

//   const handleSelectDay = (day) => {
//     dispatch(setDay(day));
//     localStorage.setItem("selectedDay", day);
//   };

//   return (
//     <div className="w-[200px] h-[210px] min-h-fit border rounded-md p-2 border-gray-400 text-center">
//       Calendar
//       <div className="flex flex-col justify-between items-center">
//         <div className="flex  justify-between w-full">
//           <button
//             className="cursor-pointer"
//             onClick={() => {
//               setCurrentMonth(currentMonth - 1);
//               if (currentMonth - 1 < 1) {
//                 setCurrentMonth(12);
//                 setCurrentYear(currentYear - 1);
//               }
//             }}
//           >
//             {"<"}
//           </button>
//           {currentMonth}-{currentYear}
//           <button
//             className="cursor-pointer"
//             onClick={() => {
//               setCurrentMonth(currentMonth + 1);
//               if (currentMonth + 1 > 12) {
//                 setCurrentMonth(1);
//                 setCurrentYear(currentYear + 1);
//               }
//             }}
//           >
//             {">"}
//           </button>
//         </div>
//         {/* {selectedDay && (
//           <div className="text-sm">
//             Selected Day: <span className="font-semibold">{selectedDay}</span>
//           </div>
//         )} */}
//       </div>
//       <div className="grid grid-cols-7 gap-1 p-1 text-xs">
//         {days.map((day) => (
//           <div className="text-center" key={day}>
//             {day}
//           </div>
//         ))}
//       </div>
//       <div className="grid grid-cols-7 gap-1 ">
//         {Array.from({ length: firstDayOfMonth }, (_, index) => (
//           <div key={index}></div>
//         ))}
//         {Array.from({ length: daysInMonth }, (_, index) => (
//           <button
//             onClick={() => {
//               handleSelectDay(
//                 new Date(
//                   new Date(currentYear, currentMonth - 1, index + 1) - tzOffset
//                 )
//                   .toISOString()
//                   .split("T")[0]
//               );
//             }}
//             className="block cursor-pointer min-w-fit m-0 "
//             key={index}
//           >
//             <div
//               className={`text-[10px] md:text-[14px] border border-gray-400 rounded-lg w-5 h-5 md:w-6 md:h-6  flex justify-center items-center hover:bg-gray-400 ${
//                 currentDayIndex ===
//                 currentYear +
//                   "-" +
//                   currentMonth.toString().padStart(2, "0") +
//                   "-" +
//                   (index + 1)
//                   ? "shadow-gray-400 shadow-md "
//                   : ""
//               } ${
//                 selectedDay ===
//                 currentYear +
//                   "-" +
//                   currentMonth.toString().padStart(2, "0") +
//                   "-" +
//                   (index + 1)
//                   ? " bg-gray-400 text-gray-100"
//                   : ""
//               }`}
//               key={index}
//             >
//               {index + 1}
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { setDay } from "@/lib/slices/ShiftSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Calendar() {
  const selectedDayInLocalStorage = localStorage.getItem("selectedDay");
  const { selectedDay } = useSelector((state) => state.shifts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDayInLocalStorage) {
      dispatch(setDay(selectedDayInLocalStorage));
    }
  }, [selectedDayInLocalStorage, dispatch]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

  const tzOffset = new Date().getTimezoneOffset() * 60 * 1000;
  const currentDate = new Date(Date.now() - tzOffset)
    .toISOString()
    .split("T")[0];

  const handleSelectDay = (day) => {
    dispatch(setDay(day));
    localStorage.setItem("selectedDay", day);
  };

  const formatDate = (year, month, day) => {
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-[180px] border rounded-md p-1 border-gray-400">
      <h2 className="text-center font-semibold mb-2">Calendar</h2>
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 rounded hover:bg-gray-200"
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentMonth(12);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          &lt;
        </button>
        <span className="font-medium">{`${currentMonth
          .toString()
          .padStart(2, "0")}/${currentYear}`}</span>
        <button
          className="px-2 py-1 rounded hover:bg-gray-200"
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentMonth(1);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs font-semibold mb-1 text-center">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-xs md:text-sm">
        {Array.from(
          { length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 },
          (_, i) => (
            <div key={`empty-${i}`}></div>
          )
        )}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const fullDate = formatDate(currentYear, currentMonth, day);
          const isToday = fullDate === currentDate;
          const isSelected = fullDate === selectedDay;

          return (
            <button
              key={day}
              onClick={() => handleSelectDay(fullDate)}
              className={`rounded-full w-4 h-4 md:w-6 md:h-6 flex items-center justify-center mx-auto transition-colors
                ${
                  isSelected
                    ? "bg-gray-700 text-white"
                    : isToday
                    ? "border border-gray-500"
                    : "hover:bg-gray-200"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
