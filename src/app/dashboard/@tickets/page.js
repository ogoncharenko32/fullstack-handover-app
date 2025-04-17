"use client";

import {
  fetchTickets,
  deleteTicket,
  setFilter,
} from "@/lib/slices/TicketsSlice";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCircleBackslash, RxExternalLink } from "react-icons/rx";
import TicketsModal from "./modal";
import { useUser } from "@clerk/nextjs";
import { MdEdit } from "react-icons/md";
import { IoIosArrowRoundDown } from "react-icons/io";
import ExportModal from "./exportModal";
import { useRouter } from "next/navigation";
import { BiRefresh } from "react-icons/bi";

const Tickets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const { selectedShift } = useSelector((state) => state.shifts);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [important, setImportant] = useState(false);
  const [ticket_id, setTicketId] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    if (shiftId === 0) return;
    dispatch(fetchTickets({ id: shiftId, filter }));
  }, [shiftId, sort, sort_by, dispatch]);

  const ticketName = (link) => {
    if (!link) {
      return "No link provided";
    }
    if (link.includes("jira")) {
      const ticketName = link.split("/")[link.split("/").length - 1];
      if (ticketName.includes("?")) {
        return ticketName.split("?")[0];
      } else {
        return ticketName;
      }
    } else if (link.includes("force.com")) {
      return "SFDC";
    } else {
      return "Case";
    }
  };

  const handleSetFilter = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className=" w-full min-w-fit border rounded-md p-2 border-gray-500">
      <div className="flex justify-between text-center">
        Tickets
        <div className="flex gap-2">
          <button
            className="cursor-pointer "
            onClick={() => dispatch(fetchTickets({ id: shiftId, filter }))}
          >
            {loading ? (
              <BiRefresh className="animate-spin" size={24} />
            ) : (
              <BiRefresh size={24} />
            )}
          </button>
          {tickets && tickets.length > 0 && (
            <button
              className="p-2 mb-1 border border-gray-400 rounded-lg cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 hover:shadow-md hover:shadow-gray-500/50"
              onClick={() => {
                handleExportTickets(tickets);
              }}
            >
              Export tickets
            </button>
          )}
          {selectedShift && (
            <button
              className="p-2 mb-1 border border-gray-400 rounded-lg cursor-pointer min-w-fit hover:bg-gray-400 hover:text-gray-100 hover:shadow-md hover:shadow-gray-500/50"
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
      <div className="flex w-full">
        <p className="flex  items-center text-xs w-[100px] xl:w-[150px]">
          Name
        </p>
        <p className="flex  items-center text-xs w-[120px] md:w-[250px] xl:w-[400px] max-w-md justify-center">
          Description
        </p>
        <button
          onClick={() => {
            handleSetFilter({
              sort: sort === "asc" ? "desc" : "asc",
              sort_by: "status",
            });
          }}
          className="flex  items-center text-xs w-[40px] lg:w-[100px] justify-center ml-auto cursor-pointer"
        >
          Status
        </button>
        <button
          onClick={() => {
            handleSetFilter({
              sort: sort === "asc" ? "desc" : "asc",
              sort_by: "important",
            });
          }}
          className="flex  items-center text-xs w-[40px] justify-center cursor-pointer"
        >
          Imp
        </button>
        <p className="flex  items-center text-xs invisible w-0 lg:visible  lg:w-[150px] justify-end">
          Owner
        </p>
        <div className="w-[40px]"></div>
      </div>
      <ul className="flex flex-col gap-1">
        {tickets?.map((ticket) => (
          <div
            className="flex gap-1 text-center align-center  "
            key={ticket.id}
          >
            <a
              className="cursor-pointer rounded hover:bg-gray-200 hover:shadow-md hover:shadow-gray-400 w-full"
              href={`${ticket.link}`}
              target="_blank"
            >
              <li className="w-full p-0.5 flex justify-between" key={ticket.id}>
                <div className="flex gap-2  w-full">
                  <div className="w-[100px] xl:w-[150px] flex items-center">
                    <p className="w-fit block text-xs border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] ">
                      {ticketName(ticket.link)}
                    </p>
                  </div>
                  <div className="w-[120px] md:w-[250px] xl:w-[400px]  h-[32px] flex text-start items-center position-relative ">
                    <p className="p-2 block h-[32px] text-xs font-bold w-full text-gray-600 overflow-hidden  whitespace-nowrap hover:whitespace-normal hover:overflow-visible hover:bg-gray-300 hover: rounded hover:h-fit hover:z-1 hover:transform hover:scale-120 ">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="w-[50px] lg:w-[100px] flex items-center justify-end ml-auto">
                    <p
                      className={`block text-[8px] border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] ${
                        ticket.status === "WFC" && "bg-sky-300"
                      } ${ticket.status === "In Progress" && "bg-red-300"}
                       ${ticket.status === "Resolved" && "bg-green-300"} 
                      ${ticket.status === "Escalated To T2" && "bg-lime-300"}
                        ${ticket.status === "Pending For MW" && "bg-yellow-300"}
                        ${
                          ticket.status === "Pending For RMA" && "bg-violet-300"
                        }
                        ${
                          ticket.status === "Escalated To CSM" &&
                          "bg-purple-300"
                        }
                        ${ticket.status === "Escalated To RnD" && "bg-rose-300"}
                      `}
                    >
                      {ticket.status}
                    </p>
                  </div>
                  <div className="w-[40px] flex items-center justify-end">
                    <p
                      className={`text-[10px]    text-gray-600 p-[2px] ${
                        ticket.important && "text-red-600"
                      }`}
                    >
                      {ticket.important ? "yes" : "no"}
                    </p>
                  </div>
                  <div className="items-center invisible w-0 lg:visible lg:w-[150px] flex justify-end">
                    <p className="text-[8px] border border-gray-400 rounded bg-gray-300 text-gray-600 p-[2px] whitespace-nowrap overflow-hidden">
                      {ticket.user_name || "Unknown user"}
                    </p>
                  </div>
                </div>
              </li>
            </a>
            <div className="flex gap-1">
              <button
                onClick={() => handleEditTicket(ticket)}
                className="cursor-pointer"
                key={ticket.id}
              >
                <MdEdit />
              </button>

              <button
                onClick={() => {
                  handleDeleteTicket(ticket.id);
                }}
                className="block w-[16px] h-[16px] m-auto cursor-pointer text-red-500"
              >
                <RxCircleBackslash />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
