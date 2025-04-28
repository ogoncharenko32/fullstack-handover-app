import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import Calendar from "../@calendar/page";
import Shifts from "../@shifts/page";

const ShiftModal = ({ isOpen, setShiftModalOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setShiftModalOpen(false)}
      className={"z-50 relative "}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => setShiftModalOpen(false)}
      >
        <DialogPanel>
          <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto flex-col">
            <div className="w-[80dvw] h-[80dvh] bg-white dark:bg-gray-800 dark:text-gray-300 p-4  flex justify-between text-center items-center gap-4 rounded ">
              <div className="flex flex-col justify-between h-full max-w-[200px] bg-[--background]">
                <Calendar />
                <button
                  type="button"
                  onClick={() => setShiftModalOpen(false)}
                  className="w-full py-2 px-4 bg-blue-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition mt-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
              <Shifts setShiftModalOpen={setShiftModalOpen} />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ShiftModal;
