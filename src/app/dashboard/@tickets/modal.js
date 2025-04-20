// "use client";

// import { createTicket, updateTicket } from "@/lib/slices/TicketsSlice";
// import { useUser } from "@clerk/nextjs";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const TicketsModal = ({
//   isOpen,
//   setIsOpen,
//   link,
//   setLink,
//   description,
//   setDescription,
//   status,
//   setStatus,
//   important,
//   setImportant,
//   shift_id,
//   ticket_id,
// }) => {
//   const ticketStatus = [
//     "In Progress",
//     "WFC",
//     "Escalated To T2",
//     "Resolved",
//     "Escalated To CSM",
//     "Escalated To RnD",
//     "Pending For MW",
//     "Pending For RMA",
//   ];

//   const dispatch = useDispatch();

//   const user = useUser();

//   // const { selectedShift } = useSelector((state) => state.shifts);
//   // const [link, setLink] = useState("");
//   // const [description, setDescription] = useState("");
//   // const [status, setStatus] = useState("");
//   // const [important, setImportant] = useState(false);

//   const handleTicket = async (e) => {
//     e.preventDefault();
//     if (ticket_id) {
//       dispatch(
//         updateTicket({
//           link,
//           description,
//           status,
//           important: Boolean(important),
//           shift_id,
//           user_id: user.user.id,
//           ticket_id,
//         })
//       );
//       setLink("");
//       setDescription("");
//       setStatus("");
//       setImportant(false);
//       setIsOpen(false);
//     } else if (link && description && status) {
//       dispatch(
//         createTicket({
//           link,
//           description,
//           status,
//           important: Boolean(important),
//           shift_id,
//           user_id: user.user.id,
//           user_name: user.user.fullName,
//         })
//       );
//       setLink("");
//       setDescription("");
//       setStatus("");
//       setImportant(false);
//       setIsOpen(false);
//     } else {
//       alert("Fill all the fields");
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={() => setIsOpen(false)}
//       className={"z-50 relative "}
//     >
//       <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//       <DialogPanel>
//         <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto">
//           <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-4 w-fit h-fit flex flex-col text-center justify-evenly items-center gap-4 rounded">
//             <form
//               onSubmit={handleTicket}
//               className="flex flex-col gap-4 w-full h-full items-center justify-start    p-4"
//             >
//               <label className="w-full text-gray-500">
//                 Link to the ticket
//                 <input
//                   type="text"
//                   placeholder="Link"
//                   className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
//                   value={link}
//                   onChange={(e) => setLink(e.target.value)}
//                 />
//               </label>
//               <label className="w-full text-gray-500">
//                 Description
//                 <textarea
//                   type="text"
//                   placeholder="Description"
//                   className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </label>
//               <label className="w-full text-gray-500">
//                 Status of the ticket
//                 <select
//                   className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
//                   onChange={(e) => setStatus(e.target.value)}
//                   // onLoad={!status ? setStatus("In Progress") : undefined}

//                   value={status || "In Progress"}
//                 >
//                   {ticketStatus.map((s, index) => (
//                     <option key={index} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <label className="w-full text-gray-400 dark:text-gray-300 flex justify-between">
//                 Mark as important
//                 <input
//                   type="checkbox"
//                   className={`border border-gray-500 rounded p-2 w-4 checked:bg-gray-500 focus:outline-0`}
//                   defaultChecked={important}
//                   onChange={(e) => {
//                     important = !important;
//                   }}
//                 />
//               </label>
//               <div className="flex gap-4 w-full">
//                 <button
//                   type="submit"
//                   className="border border-gray-400 rounded cursor-pointer w-full text-gray-600 dark:text-gray-300 hover:bg-gray-400 hover:text-gray-100 focus:outline-0 bg-blue-100"
//                 >
//                   {ticket_id ? "Update" : "Create"}
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="border border-gray-400 rounded cursor-pointer w-full text-gray-600 dark:text-gray-300 hover:bg-gray-400 hover:text-gray-100 focus:outline-0"
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </DialogPanel>
//     </Dialog>

//   );
// };

// export default TicketsModal;

"use client";

import { createTicket, updateTicket } from "@/lib/slices/TicketsSlice";
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { ticketStatus } from "@/utils/variables";

const TicketsModal = ({
  isOpen,
  setIsOpen,
  link,
  setLink,
  description,
  setDescription,
  status,
  setStatus,
  important,
  setImportant,
  shift_id,
  ticket_id,
}) => {
  // const ticketStatus = [
  //   "In Progress",
  //   "WFC",
  //   "Escalated To T2",
  //   "Resolved",
  //   "Escalated To CSM",
  //   "Escalated To RnD",
  //   "Pending For MW",
  //   "Pending For RMA",
  // ];

  const dispatch = useDispatch();
  const { user } = useUser();

  const handleTicket = async (e) => {
    e.preventDefault();
    if (ticket_id) {
      dispatch(
        updateTicket({
          link,
          description,
          status,
          important: Boolean(important),
          shift_id,
          user_id: user.id,
          ticket_id,
        })
      );
    } else if (link && description && status) {
      dispatch(
        createTicket({
          link,
          description,
          status,
          important: Boolean(important),
          shift_id,
          user_id: user.id,
          user_name: user.fullName,
        })
      );
    } else {
      alert("Fill all the fields");
      return;
    }

    // Reset
    setLink("");
    setDescription("");
    setStatus("");
    setImportant(false);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="z-50 relative"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
      <DialogPanel>
        <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto">
          <div className="bg-white dark:bg-gray-900 dark:text-gray-100 shadow-xl rounded-2xl  w-[90vw] max-w-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-center">
              {ticket_id ? "Update Ticket" : "Create Ticket"}
            </h2>
            <hr className="border-gray-300 dark:border-gray-700" />
            <form onSubmit={handleTicket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Link to the ticket
                </label>
                <input
                  type="text"
                  placeholder="https://jira..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe the issue..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={status || "In Progress"}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {ticketStatus.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mark as important</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  {ticket_id ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default TicketsModal;
