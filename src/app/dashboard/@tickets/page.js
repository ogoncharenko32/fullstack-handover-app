// "use client";

// import {
//   fetchTickets,
//   deleteTicket,
//   setFilter,
// } from "@/lib/slices/TicketsSlice";
// import React, { use, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RxCircleBackslash, RxExternalLink } from "react-icons/rx";
// import TicketsModal from "./modal";
// import { useUser } from "@clerk/nextjs";
// import { MdEdit } from "react-icons/md";
// import { IoIosArrowRoundDown } from "react-icons/io";
// import ExportModal from "./exportModal";
// import { useRouter } from "next/navigation";
// import { BiRefresh } from "react-icons/bi";
// import { LuRefreshCw } from "react-icons/lu";

// const Tickets = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [exportOpen, setExportOpen] = useState(false);

//   const { selectedShift } = useSelector((state) => state.shifts);
//   const [link, setLink] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("");
//   const [important, setImportant] = useState(false);
//   const [ticket_id, setTicketId] = useState(null);
//   const router = useRouter();

//   const user = useUser();

//   const {
//     data: tickets,
//     loading,
//     error,
//   } = useSelector((state) => state.tickets);

//   const { selectedShift: shiftId } = useSelector((state) => state.shifts);
//   const { sort, sort_by } = useSelector((state) => state.tickets.filter);
//   const { filter } = useSelector((state) => state.tickets);
//   const dispatch = useDispatch();

//   const handleEditTicket = (ticket) => {
//     setDescription(ticket.description);
//     setStatus(ticket.status);
//     setLink(ticket.link);
//     setImportant(ticket.important);
//     setTicketId(ticket.id);

//     setIsOpen(true);
//   };

//   const handleDeleteTicket = (ticket_id) => {
//     if (confirm("Are you sure you want to delete this ticket?")) {
//       dispatch(deleteTicket(ticket_id));
//     }
//   };

//   const handleExportTickets = () => {
//     setExportOpen(true);
//   };

//   useEffect(() => {
//     if (shiftId === 0) return;
//     dispatch(fetchTickets({ id: shiftId, filter }));
//   }, [shiftId, sort, sort_by, dispatch]);

//   const ticketName = (link) => {
//     if (!link) {
//       return "No link provided";
//     }
//     if (link.includes("jira")) {
//       const ticketName = link.split("/")[link.split("/").length - 1];
//       if (ticketName.includes("?")) {
//         return ticketName.split("?")[0];
//       } else {
//         return ticketName;
//       }
//     } else if (link.includes("force.com")) {
//       return "SFDC";
//     } else {
//       return "Case";
//     }
//   };

//   const handleSetFilter = (filter) => {
//     dispatch(setFilter(filter));
//   };

//   return (
//     <div className=" w-full min-w-fit border rounded-md p-2 border-gray-500">
//       <div className="flex justify-between text-center">
//         Tickets
//         <div className="flex gap-2">
//           <button
//             className="cursor-pointer "
//             onClick={() => dispatch(fetchTickets({ id: shiftId, filter }))}
//           >
//             {loading ? (
//               <LuRefreshCw className="animate-spin" size={22} />
//             ) : (
//               <LuRefreshCw size={22} />
//             )}
//           </button>
//           {tickets && tickets.length > 0 && (
//             <button
//               className="p-2 mb-1 border border-gray-400 rounded-lg cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 hover:shadow-md hover:shadow-gray-500/50"
//               onClick={() => {
//                 handleExportTickets(tickets);
//               }}
//             >
//               Export tickets
//             </button>
//           )}
//           {selectedShift && (
//             <button
//               className="p-2 mb-1 border border-gray-400 rounded-lg cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 hover:shadow-md hover:shadow-gray-500/50"
//               onClick={() => {
//                 setTicketId(null);
//                 setDescription("");
//                 setStatus("In Progress");
//                 setLink("");
//                 setImportant(false);
//                 setIsOpen(true);
//               }}
//             >
//               Add New Ticket
//             </button>
//           )}
//         </div>
//       </div>

//       <TicketsModal
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         link={link}
//         setLink={setLink}
//         description={description}
//         setDescription={setDescription}
//         status={status}
//         setStatus={setStatus}
//         important={important}
//         setImportant={setImportant}
//         shift_id={selectedShift}
//         ticket_id={ticket_id}
//       />
//       <ExportModal
//         isOpen={exportOpen}
//         setIsOpen={setExportOpen}
//         tickets={tickets}
//       />
//       <div className="flex w-full">
//         <p className="flex  items-center text-xs w-[100px] xl:w-[150px]">
//           Name
//         </p>
//         <p className="flex  items-center text-xs w-[100px] md:w-[250px] xl:w-[500px] max-w-md justify-center">
//           Description
//         </p>
//         <button
//           onClick={() => {
//             handleSetFilter({
//               sort: sort === "asc" ? "desc" : "asc",
//               sort_by: "status",
//             });
//           }}
//           className="flex  items-center text-xs w-[40px] lg:w-[100px] justify-center ml-auto cursor-pointer"
//         >
//           Status
//         </button>
//         <button
//           onClick={() => {
//             handleSetFilter({
//               sort: sort === "asc" ? "desc" : "asc",
//               sort_by: "important",
//             });
//           }}
//           className="flex  items-center text-xs w-[40px] justify-center cursor-pointer"
//         >
//           Imp
//         </button>
//         <p className="flex  items-center text-xs invisible w-0 lg:visible  lg:w-[150px] justify-end">
//           Owner
//         </p>
//         <div className="w-[40px]"></div>
//       </div>
//       <ul className="flex flex-col gap-1">
//         {tickets?.map((ticket) => (
//           <div
//             className="flex gap-1 text-center align-center  "
//             key={ticket.id}
//           >
//             <a
//               className="cursor-pointer rounded hover:bg-gray-200 hover:shadow-md hover:shadow-gray-400 w-full"
//               href={`${ticket.link}`}
//               target="_blank"
//             >
//               <li className="w-full p-0.5 flex justify-between" key={ticket.id}>
//                 <div className="flex gap-2  w-full">
//                   <div className="w-[100px] xl:w-[150px] flex items-center">
//                     <p className="w-fit block text-xs border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] ">
//                       {ticketName(ticket.link)}
//                     </p>
//                   </div>
//                   <div className="w-[100px] md:w-[250px] xl:w-[500px]  h-[32px] flex text-start items-center position-relative ">
//                     <p className="p-2 block h-[32px] text-xs font-bold w-full text-gray-600 overflow-hidden  whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:bg-gray-300 hover: rounded hover:h-fit hover:z-1 hover:transform hover:scale-120 ">
//                       {ticket.description}
//                     </p>
//                   </div>
//                   <div className="w-[50px] lg:w-[100px] flex items-center justify-end ml-auto">
//                     <p
//                       className={`block text-[8px] border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] ${
//                         ticket.status === "WFC" && "bg-sky-300"
//                       } ${ticket.status === "In Progress" && "bg-red-300"}
//                        ${ticket.status === "Resolved" && "bg-green-300"}
//                       ${ticket.status === "Escalated To T2" && "bg-lime-300"}
//                         ${ticket.status === "Pending For MW" && "bg-yellow-300"}
//                         ${
//                           ticket.status === "Pending For RMA" && "bg-violet-300"
//                         }
//                         ${
//                           ticket.status === "Escalated To CSM" &&
//                           "bg-purple-300"
//                         }
//                         ${ticket.status === "Escalated To RnD" && "bg-rose-300"}
//                       `}
//                     >
//                       {ticket.status}
//                     </p>
//                   </div>
//                   <div className="w-[40px] flex items-center justify-end">
//                     <p
//                       className={`text-[10px]    text-gray-600 p-[2px] ${
//                         ticket.important && "text-red-600"
//                       }`}
//                     >
//                       {ticket.important ? "yes" : "no"}
//                     </p>
//                   </div>
//                   <div className="items-center invisible w-0 lg:visible lg:w-[150px] flex justify-end">
//                     <p className="text-[8px] border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] whitespace-nowrap overflow-hidden">
//                       {ticket.user_name || "Unknown user"}
//                     </p>
//                   </div>
//                 </div>
//               </li>
//             </a>
//             <div className="flex gap-1">
//               <button
//                 onClick={() => handleEditTicket(ticket)}
//                 className="cursor-pointer"
//                 key={ticket.id}
//               >
//                 <MdEdit />
//               </button>

//               <button
//                 onClick={() => {
//                   handleDeleteTicket(ticket.id);
//                 }}
//                 className="block w-[16px] h-[16px] m-auto cursor-pointer text-red-500"
//               >
//                 <RxCircleBackslash />
//               </button>
//             </div>
//           </div>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Tickets;

"use client";

import {
  fetchTickets,
  deleteTicket,
  setFilter,
  updateTicket,
} from "@/lib/slices/TicketsSlice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCircleBackslash } from "react-icons/rx";
import TicketsModal from "./modal";
import { useUser } from "@clerk/nextjs";
import { MdEdit } from "react-icons/md";
import ExportModal from "./exportModal";
import { LuRefreshCw } from "react-icons/lu";
import ticketName from "@/utils/getTicketName";
import { ticketStatus } from "@/utils/variables";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const statusColor = (status) => {
  const map = {
    WFC: "bg-sky-200 border-sky-400 text-sky-700 dark:bg-blue-200 dark:border-blue-400 dark:text-blue-700",
    "In Progress":
      "bg-red-200 border-red-400 text-red-700 dark:bg-rose-200 dark:border-rose-400 dark:text-rose-700",
    Resolved:
      "bg-green-200 border-green-400 text-green-700 dark:bg-green-200 dark:border-green-400 dark:text-green-700",
    "Escalated To T2":
      "bg-lime-200 border-lime-400 text-lime-700 dark:bg-lime-200 dark:border-lime-400 dark:text-lime-700",
    "Pending For MW":
      "bg-yellow-200 border-yellow-400 text-yellow-700 dark:bg-yellow-200 dark:border-yellow-400 dark:text-yellow-700",
    "Pending For RMA":
      "bg-violet-200 border-violet-400 text-violet-700 dark:bg-violet-200 dark:border-violet-400 dark:text-violet-700",
    "Escalated To CSM":
      "bg-purple-200 border-purple-400 text-purple-700 dark:bg-purple-200 dark:border-purple-400 dark:text-purple-700",
    "Escalated To RnD":
      "bg-rose-200 border-rose-400 text-rose-700 dark:bg-rose-200 dark:border-rose-400 dark:text-rose-700",
  };
  return map[status] || "bg-gray-200 border-gray-400 text-gray-600";
};

const Tickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { selectedShift } = useSelector((state) => state.shifts);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [important, setImportant] = useState(false);
  const [ticket_id, setTicketId] = useState(null);

  const user = useUser();

  const {
    data: tickets,
    loading,
    error,
  } = useSelector((state) => state.tickets);

  const { selectedShift: shiftId } = useSelector((state) => state.shifts);
  const { sort, sort_by } = useSelector((state) => state.tickets.filter);
  const { filter } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const handleEditTicket = (ticket) => {
    setDescription(ticket.description);
    setStatus(ticket.status);
    setLink(ticket.link);
    setImportant(ticket.important);
    setTicketId(ticket.id);
    setIsOpen(true);
  };

  const handleDeleteTicket = (ticket_id) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      dispatch(deleteTicket(ticket_id));
    }
  };

  const handleExportTickets = () => {
    setExportOpen(true);
  };

  const handleChangeStatus = (ticket, status) => {
    dispatch(
      updateTicket({
        ticket_id: ticket.id,
        status,
      })
    );
  };

  useEffect(() => {
    if (shiftId === 0) return;
    dispatch(fetchTickets({ id: shiftId, filter }));
    let interval;
    const startInterval = () => {
      interval = setInterval(() => {
        if (document.visibilityState === "visible") {
          dispatch(fetchTickets({ id: shiftId, filter }));
        }
      }, 1000 * 15);
    };

    startInterval();

    return () => clearInterval(interval);
  }, [shiftId, filter, dispatch]);

  // const ticketName = (link) => {
  //   if (!link) return "No link provided";
  //   if (link.includes("jira")) {
  //     const ticketName = link.split("/").pop().split("?")[0];
  //     return ticketName;
  //   } else if (link.includes("force.com")) {
  //     return "SFDC";
  //   } else if (link.includes("slack")) {
  //     return "Slack";
  //   } else {
  //     return "Case";
  //   }
  // };

  const handleSetFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="w-full min-w-fit border rounded-md p-2 border-gray-500">
      <div className="flex justify-between mb-2">
        {/* <h2 className="text-lg font-semibold">Tickets</h2> */}
        <div className="flex gap-2 w-full">
          <button
            className="cursor-pointer ml-auto"
            onClick={() => dispatch(fetchTickets({ id: shiftId, filter }))}
          >
            {loading ? (
              <LuRefreshCw className="animate-spin" size={22} />
            ) : (
              <LuRefreshCw size={22} />
            )}
          </button>
          {tickets && tickets.length > 0 && (
            <button
              className="p-2 border border-gray-400 rounded hover:bg-gray-400 hover:text-white"
              onClick={handleExportTickets}
            >
              Export tickets
            </button>
          )}
          {selectedShift && (
            <button
              className="p-2 border border-gray-400 rounded hover:bg-gray-400 hover:text-white"
              onClick={() => {
                setTicketId(null);
                setDescription("");
                setStatus("In Progress");
                setLink("");
                setImportant(false);
                setIsOpen(true);
              }}
            >
              Add New Ticket
            </button>
          )}
        </div>
      </div>

      <TicketsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        link={link}
        setLink={setLink}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        important={important}
        setImportant={setImportant}
        shift_id={selectedShift}
        ticket_id={ticket_id}
      />
      <ExportModal
        isOpen={exportOpen}
        setIsOpen={setExportOpen}
        tickets={tickets}
      />

      {/* Header row */}
      <div className="flex w-full px-2 py-1 bg-gray-100 rounded border-b border-gray-300 dark:bg-gray-500 dark:text-gray-100 font-medium text-gray-700 text-sm">
        <div className="w-[100px] sm:w-[60px] md:w-[120px] xl:w-[160px]">
          Name
        </div>
        <div className="invisible w-0 sm:w-[100px] sm:visible md:w-[150px] xl:w-[500px] 2xl:w-[800px]">
          Description
        </div>
        <button
          onClick={() =>
            handleSetFilter({
              sort: sort === "asc" ? "desc" : "asc",
              sort_by: "status",
            })
          }
          className="w-[60px] md:w-[120px] text-right cursor-pointer hover:underline ml-auto"
        >
          Status
        </button>
        <button
          onClick={() =>
            handleSetFilter({
              sort: sort === "asc" ? "desc" : "asc",
              sort_by: "important",
            })
          }
          className="w-[50px] text-right cursor-pointer hover:underline"
        >
          Imp
        </button>
        <div className="hidden lg:block w-[80px] md:w-[120px] text-right">
          Owner
        </div>
        <div className="w-[40px]"></div>
      </div>

      {/* Tickets In Progress*/}
      <ul className="flex flex-col ">
        {tickets &&
          tickets.length > 0 &&
          tickets.some((t) => t.status === "In Progress") && (
            <h3 className="text-sm font-semibold text-center text-gray-500 underline ">
              In Progress
            </h3>
          )}
        {tickets?.map(
          (ticket) =>
            ticket.status === "In Progress" && (
              <li
                key={ticket.id}
                className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-50 border-b text-sm dark:bg-gray-500 dark:hover:bg-gray-600 rounded"
              >
                <div
                  className={`w-[100px] sm:w-[60px] md:w-[120px] xl:w-[160px]   ${
                    ticketName(ticket.link) === "" ? "invisible" : "visible"
                  }`}
                >
                  <a
                    href={ticket.link.includes("http") ? ticket.link : null}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="inline-block px-0 md:p-2 py-0.5 text-xs border rounded bg-gray-200  dark:bg-gray-500 text-gray-700 dark:text-gray-100 max-w-full truncate ">
                      {ticketName(ticket.link)}
                    </span>
                  </a>
                </div>
                <div className="invisible w-0 sm:w-[100px] sm:visible  md:w-[150px] xl:w-[500px] 2xl:w-[800px] truncate">
                  <span
                    title={ticket.description}
                    className="text-gray-800 font-semibold dark:text-gray-100"
                  >
                    {ticket.description}
                  </span>
                </div>
                <div className="w-[60px] md:w-[120px] text-right ml-auto">
                  <Menu>
                    <MenuButton
                      className={`inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-2 text-xs  shadow-inner shadow-white/10 focus:outline-none data-[hover]:scale-105  data-[focus]:outline-1 data-[focus]:outline-white ${statusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </MenuButton>
                    <MenuItems
                      className="w-36 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                      anchor="bottom"
                    >
                      {ticketStatus.map((status) =>
                        status === ticket.status ? null : (
                          <MenuItem
                            key={status}
                            as="button"
                            className={`group flex w-full items-center gap-2 shadow-lg rounded-lg py-1.5 text-xs px-3 data-[focus]:scale-105 ${statusColor(
                              status
                            )}`}
                            onClick={() => handleChangeStatus(ticket, status)}
                          >
                            {status}
                          </MenuItem>
                        )
                      )}
                    </MenuItems>
                  </Menu>
                  {/* <span
                    className={`inline-block px-0 md:p-2 py-0.5 text-xs rounded border ${statusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span> */}
                </div>
                <div className="w-[50px] text-right">
                  <span
                    className={`text-xs ${
                      ticket.important
                        ? "text-red-500 font-bold dark:text-red-400"
                        : "text-gray-600 dark:text-gray-100"
                    }`}
                  >
                    {ticket.important ? "Yes" : "No"}
                  </span>
                </div>
                <div className="hidden lg:block w-[80px] md:w-[120px] text-right truncate ">
                  <span className="text-xs text-gray-600 dark:text-gray-100">
                    {ticket.user_name || "Unknown"}
                  </span>
                </div>
                <div className="flex gap-2 justify-end w-[40px]">
                  <button onClick={() => handleEditTicket(ticket)}>
                    <MdEdit className="text-gray-500 hover:text-blue-600 dark:text-gray-100" />
                  </button>
                  <button onClick={() => handleDeleteTicket(ticket.id)}>
                    <RxCircleBackslash className="text-red-500 hover:text-red-700 dark:text-red-400" />
                  </button>
                </div>
              </li>
            )
        )}
      </ul>

      {/* Tickets */}
      <ul className="flex flex-col mt-1">
        {tickets &&
          tickets.length > 0 &&
          tickets.some((t) => t.status !== "In Progress") && (
            <h3 className="text-sm font-semibold text-center text-gray-500 underline">
              Tickets
            </h3>
          )}
        {tickets?.map(
          (ticket) =>
            ticket.status !== "In Progress" && (
              <li
                key={ticket.id}
                className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-50 border-b dark:bg-gray-500 text-sm dark:hover:bg-gray-600 rounded"
              >
                <div
                  className={`w-[100px] sm:w-[60px] md:w-[120px] xl:w-[160px]  ${
                    ticketName(ticket.link) === "" ? "invisible" : "visible"
                  }`}
                >
                  <a
                    href={ticket.link.includes("http") ? ticket.link : null}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                  >
                    <span className="inline-block px-0 md:p-2 py-0.5 text-xs border rounded bg-gray-200 text-gray-700 max-w-full truncate dark:bg-gray-500  dark:text-gray-100 ">
                      {ticketName(ticket.link)}
                    </span>
                  </a>
                </div>
                <div className="invisible w-0 sm:w-[100px] sm:visible  md:w-[150px] xl:w-[500px] 2xl:w-[800px] truncate  ">
                  <span
                    title={ticket.description}
                    className="text-gray-800 font-semibold dark:text-gray-100"
                  >
                    {ticket.description}
                  </span>
                </div>
                <div className="w-[60px] md:w-[120px] text-right ml-auto">
                  <Menu>
                    <MenuButton
                      className={`inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-2 text-xs  shadow-inner shadow-white/10 focus:outline-none data-[hover]:scale-105  data-[focus]:outline-1 data-[focus]:outline-white ${statusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </MenuButton>
                    <MenuItems
                      className="w-36 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1  transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                      anchor="bottom"
                    >
                      {ticketStatus.map((status) =>
                        status === ticket.status ? null : (
                          <MenuItem
                            key={status}
                            as="button"
                            className={`group flex w-full items-center gap-2 shadow-lg rounded-lg py-1.5 text-xs px-3 data-[focus]:scale-105 ${statusColor(
                              status
                            )}`}
                            onClick={() => handleChangeStatus(ticket, status)}
                          >
                            {status}
                          </MenuItem>
                        )
                      )}
                    </MenuItems>
                  </Menu>

                  {/* <span
                    className={`inline-block px-0 md:p-2 py-0.5 text-xs rounded border ${statusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span> */}
                </div>
                <div className="w-[50px] text-right">
                  <span
                    className={`text-xs ${
                      ticket.important
                        ? "text-red-500 font-bold dark:text-red-400"
                        : "text-gray-600 dark:text-gray-100"
                    }`}
                  >
                    {ticket.important ? "Yes" : "No"}
                  </span>
                </div>
                <div className="hidden lg:block w-[80px] md:w-[120px] text-right truncate">
                  <span className="text-xs text-gray-600 dark:text-gray-100 ">
                    {ticket.user_name || "Unknown"}
                  </span>
                </div>
                <div className="flex gap-2 justify-end w-[40px]">
                  <button onClick={() => handleEditTicket(ticket)}>
                    <MdEdit className="text-gray-500 hover:text-blue-600 dark:text-gray-100" />
                  </button>
                  <button onClick={() => handleDeleteTicket(ticket.id)}>
                    <RxCircleBackslash className="text-red-500 hover:text-red-700 dark:text-red-400" />
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Tickets;
