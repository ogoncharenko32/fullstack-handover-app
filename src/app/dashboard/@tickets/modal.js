"use client";

import { createTicket, updateTicket } from "@/lib/slices/TicketsSlice";
import { useUser } from "@clerk/nextjs";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const ticketStatus = [
    "In Progress",
    "WFC",
    "Escalated To T2",
    "Resolved",
    "Escalated To CSM",
    "Escalated To RnD",
    "Pending For MW",
    "Pending For RMA",
  ];

  const dispatch = useDispatch();

  const user = useUser();

  // const { selectedShift } = useSelector((state) => state.shifts);
  // const [link, setLink] = useState("");
  // const [description, setDescription] = useState("");
  // const [status, setStatus] = useState("");
  // const [important, setImportant] = useState(false);

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
          user_id: user.user.id,
          ticket_id,
        })
      );
      setLink("");
      setDescription("");
      setStatus("");
      setImportant(false);
      setIsOpen(false);
    } else if (link && description && status) {
      dispatch(
        createTicket({
          link,
          description,
          status,
          important: Boolean(important),
          shift_id,
          user_id: user.user.id,
          user_name: user.user.fullName,
        })
      );
      setLink("");
      setDescription("");
      setStatus("");
      setImportant(false);
      setIsOpen(false);
    } else {
      alert("Fill all the fields");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"z-50 relative "}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <DialogPanel>
        <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-4 w-fit h-fit flex flex-col text-center justify-evenly items-center gap-4 rounded">
            <form
              onSubmit={handleTicket}
              className="flex flex-col gap-4 w-full h-full items-center justify-start    p-4"
            >
              <label className="w-full text-gray-500">
                Link to the ticket
                <input
                  type="text"
                  placeholder="Link"
                  className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </label>
              <label className="w-full text-gray-500">
                Description
                <textarea
                  type="text"
                  placeholder="Description"
                  className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label className="w-full text-gray-500">
                Status of the ticket
                <select
                  className="border border-gray-400 rounded p-2 w-full text-gray-600 dark:text-gray-300 placeholder:text-gray-300 focus:outline-0"
                  onChange={(e) => setStatus(e.target.value)}
                  // onLoad={!status ? setStatus("In Progress") : undefined}

                  value={status || "In Progress"}
                >
                  {ticketStatus.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="w-full text-gray-400 dark:text-gray-300 flex justify-between">
                Mark as important
                <input
                  type="checkbox"
                  className={`border border-gray-500 rounded p-2 w-4 checked:bg-gray-500 focus:outline-0`}
                  defaultChecked={important}
                  onChange={(e) => {
                    important = !important;
                  }}
                />
              </label>
              <div className="flex gap-4 w-full">
                <button
                  type="submit"
                  className="border border-gray-400 rounded cursor-pointer w-full text-gray-600 dark:text-gray-300 hover:bg-gray-400 hover:text-gray-100 focus:outline-0 bg-blue-100"
                >
                  {ticket_id ? "Update" : "Create"}
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
      </DialogPanel>
    </Dialog>
  );
};

export default TicketsModal;
