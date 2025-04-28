import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

const ExportDataModal = ({ isOpen, setIsOpen, formData }) => {
  const [listState, setListState] = useState("");

  useEffect(() => {
    let list = "";
    formData &&
      (list += `{code}\n${formData.name} \n\n`) &&
      (list += `pre  -  post  -  difference \n`) &&
      (list += `scm total: ${formData.pre_scm_summary_total_count} - ${
        formData.post_scm_summary_total_count
      } - ${
        formData.pre_scm_summary_total_count -
        formData.post_scm_summary_total_count
      }\n`) &&
      (list += `scm partials: ${formData.pre_cm_partial} - ${
        formData.post_cm_partial
      } - ${formData.pre_cm_partial - formData.post_cm_partial}\n`) &&
      (list += `cpe total: ${formData.pre_cpe_total_count} - ${
        formData.post_cpe_total_count
      } - ${formData.pre_cpe_total_count - formData.post_cpe_total_count}\n`) &&
      (list += `eRouters: ${formData.pre_cpe_erouter_count} - ${
        formData.post_cpe_erouter_count
      } - ${
        formData.pre_cpe_erouter_count - formData.post_cpe_erouter_count
      }\n`) &&
      (list += `cpes: ${formData.pre_cpe_cpe_count} - ${
        formData.post_cpe_cpe_count
      } - ${formData.pre_cpe_cpe_count - formData.post_cpe_cpe_count}\n`) &&
      (list += `eDva: ${formData.pre_cpe_edva_count} - ${
        formData.post_cpe_edva_count
      } - ${formData.pre_cpe_edva_count - formData.post_cpe_edva_count}\n`) &&
      (list += `eMta: ${formData.pre_cpe_emta_count} - ${
        formData.post_cpe_emta_count
      } - ${formData.pre_cpe_emta_count - formData.post_cpe_emta_count}\n`) &&
      (list += `eStb: ${formData.pre_cpe_estb_count} - ${
        formData.post_cpe_estb_count
      } - ${formData.pre_cpe_estb_count - formData.post_cpe_estb_count}\n`) &&
      (list += `dhcpv4: ${formData.pre_cpe_d4_count} - ${
        formData.post_cpe_d4_count
      } - ${formData.pre_cpe_d4_count - formData.post_cpe_d4_count}\n`) &&
      (list += `dhcpv6:${formData.pre_cpe_d6_count} - ${
        formData.post_cpe_d6_count
      } - ${formData.pre_cpe_d6_count - formData.post_cpe_d6_count}\n`) &&
      (list += `{code} \n\n`);

    setListState(list);
  }, [formData]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"z-50 relative "}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      >
        <DialogPanel>
          <div className="fixed inset-0 flex w-fit h-fit items-center justify-center p-4 m-auto">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-4 w-fit h-fit flex flex-col text-center justify-evenly items-center gap-4 rounded">
              <textarea
                className=" bg-gray-100 h-[60vh] p-1 dark:bg-gray-500 dark:text-gray-100 focus:outline-none rounded"
                rows={formData.length}
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

export default ExportDataModal;
