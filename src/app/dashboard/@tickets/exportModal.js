import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import ticketName from "@/utils/getTicketName";

const ExportModal = ({ isOpen, setIsOpen, tickets }) => {
  const [listState, setListState] = useState("");

  useEffect(() => {
    let list = "";

    tickets &&
      tickets.length > 0 &&
      tickets.some((ticket) => ticket.status === "In Progress") &&
      (list += " *To Do* \n") &&
      tickets.forEach((ticket) => {
        ticket.status === "In Progress" &&
          (list += `# ${
            ticketName(ticket.link)
              ? `[${ticketName(ticket.link)} | ${ticket.link}]`
              : `[Link | ${ticket.link}]`
          } *${ticket.status}* ${ticket.description} \n`);
      });

    tickets &&
      tickets.length > 0 &&
      tickets.some((ticket) => ticket.important) &&
      (list += " *Important* \n") &&
      tickets.forEach((ticket) => {
        ticket.important &&
          (list += `# ${
            ticketName(ticket.link)
              ? `[${ticketName(ticket.link)} | ${ticket.link}]`
              : `[Link | ${ticket.link}]`
          } *${ticket.status}* ${ticket.description} \n`);
      });

    tickets &&
      tickets.length > 0 &&
      tickets.some(
        (ticket) =>
          ticket.status !== "In Progress" || ticket.important === false
      ) &&
      (list += "\n *Unimportant* \n") &&
      tickets.forEach((ticket) => {
        ticket.status !== "In Progress" &&
          ticket.important === false &&
          (list += `# ${
            ticketName(ticket.link)
              ? `[${ticketName(ticket.link)} | ${ticket.link}]`
              : `[Link | ${ticket.link}]`
          } *${ticket.status}* ${ticket.description} \n`);
      });

    setListState(list);
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"z-50 relative "}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <DialogPanel>
          <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-4 w-fit h-fit flex flex-col text-center justify-evenly items-center gap-4 rounded">
              <textarea
                className=" bg-gray-100 h-[60vh] p-1"
                rows={tickets.length}
                cols={100}
                defaultValue={listState}
                onInput={(e) => setListState(e.target.value)}
              />
              <div className="flex gap-3 pt-4 w-full">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(listState);
                    setIsOpen(false);
                    setListState("");
                  }}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Copy (Not working atm)
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ExportModal;
