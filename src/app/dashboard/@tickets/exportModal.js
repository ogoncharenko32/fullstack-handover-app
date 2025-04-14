import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useSelector } from "react-redux";

const ExportModal = ({ isOpen, setIsOpen, tickets }) => {
  const [listState, setListState] = useState("");

  useEffect(() => {
    let list = "";
    tickets.forEach((ticket) => {
      list += `# ${ticket.link} ${ticket.status} ${ticket.description} \n`;
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
                className=" bg-gray-100"
                rows={tickets.length}
                cols={100}
                defaultValue={listState}
                onInput={(e) => setListState(e.target.value)}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(listState);
                  setIsOpen(false);
                  setListState("");
                }}
                className="cursor-pointer border-gray-300 border rounded hover:bg-gray-200 hover:shadow-md hover:shadow-gray-400 w-full"
              >
                Copy
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ExportModal;
