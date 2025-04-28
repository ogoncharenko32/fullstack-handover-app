"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaintenanceById,
  updateMaintenance,
  clearMwdata,
} from "@/lib/slices/MaintenanceSlice";
import ExportDataModal from "./exportDataModal";

const MaintenanceDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const mw = useSelector((state) => state.maintenances.mwdata);
  const [formData, setFormData] = useState({});
  const loading = useSelector((state) => state.maintenances.loading);
  useEffect(() => {
    if (id) {
      dispatch(fetchMaintenanceById(id));
    }

    return () => {
      dispatch(clearMwdata());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (mw) {
      setFormData({
        name: mw.name || "",
        id: mw.id || "",
        pre_scm_summary_total_count: mw.pre_scm_summary_total_count || 0,
        post_scm_summary_total_count: mw.post_scm_summary_total_count || 0,
        pre_rpd: mw.pre_rpd || 0,
        post_rpd: mw.post_rpd || 0,
        pre_cm_partial: mw.pre_cm_partial || 0,
        post_cm_partial: mw.post_cm_partial || 0,
        pre_cpe_total_count: mw.pre_cpe_total_count || 0,
        post_cpe_total_count: mw.post_cpe_total_count || 0,
        pre_cpe_erouter_count: mw.pre_cpe_erouter_count || 0,
        post_cpe_erouter_count: mw.post_cpe_erouter_count || 0,
        pre_cpe_cpe_count: mw.pre_cpe_cpe_count || 0,
        post_cpe_cpe_count: mw.post_cpe_cpe_count || 0,
        pre_cpe_edva_count: mw.pre_cpe_edva_count || 0,
        post_cpe_edva_count: mw.post_cpe_edva_count || 0,
        pre_cpe_emta_count: mw.pre_cpe_emta_count || 0,
        post_cpe_emta_count: mw.post_cpe_emta_count || 0,
        pre_cpe_estb_count: mw.pre_cpe_estb_count || 0,
        post_cpe_estb_count: mw.post_cpe_estb_count || 0,
        pre_cpe_d4_count: mw.pre_cpe_d4_count || 0,
        post_cpe_d4_count: mw.post_cpe_d4_count || 0,
        pre_cpe_d6_count: mw.pre_cpe_d6_count || 0,
        post_cpe_d6_count: mw.post_cpe_d6_count || 0,
      });
    }
  }, [mw]);

  if (loading) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: +value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMaintenance(formData));
    // dispatch(fetchMaintenanceById(id));
  };

  return (
    mw && (
      <div className="p-6 w-full bg-gray-100 min-h-screen text-gray-800">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 underline mb-4"
        >
          ← Go Back
        </button>
        <ExportDataModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formData={formData}
        />
        <h1 className="text-[1.2rem] text-center">{formData.name}</h1>

        {formData && (
          <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-700 p-4 rounded text-[1rem]"
          >
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-blue-100  ">
                  <th className="p-2 rounded-tl">Field</th>
                  <th className="p-2 ">Pre</th>
                  <th className="p-2 ">Post</th>
                  <th className="p-2 rounded-tr">Difference</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["scm summary total", "scm_summary_total_count"],
                  ["scm partials", "cm_partial"],
                  ["cpe total count", "cpe_total_count"],
                  ["cpe erouter count", "cpe_erouter_count"],
                  ["cpe cpe count", "cpe_cpe_count"],
                  ["cpe edva count", "cpe_edva_count"],
                  ["cpe emta count", "cpe_emta_count"],
                  ["cpe estb count", "cpe_estb_count"],
                  ["cpe d4 count", "cpe_d4_count"],
                  ["cpe d6 count", "cpe_d6_count"],
                ].map(([label, field]) => {
                  const pre = Number(formData[`pre_${field}`]) || 0;
                  const post = Number(formData[`post_${field}`]) || 0;
                  const diff = post - pre;
                  const percentage = field.includes("partial")
                    ? Math.abs((pre / post) * 100)
                    : Math.abs((post / pre) * 100);
                  return (
                    <tr key={field} className="hover:bg-gray-100 rounded">
                      <td className="p-2  text-left">
                        <code>{label}</code>
                      </td>
                      <td className="p-2 ">
                        <input
                          type="text"
                          name={`pre_${field}`}
                          value={formData[`pre_${field}`] ?? 0}
                          onChange={handleChange}
                          className="border-b border-b-gray-400  p-1 w-full text-center focus:outline-0"
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          type="text"
                          name={`post_${field}`}
                          value={formData[`post_${field}`] ?? 0}
                          onChange={handleChange}
                          className="border-b border-b-gray-400  p-1 w-full text-center focus:outline-0"
                        />
                      </td>
                      <td className="p-2 border-none w-[160px] font-semibold ">
                        <div className="flex justify-between">
                          <div
                            className={
                              percentage >= 98
                                ? "text-green-600"
                                : percentage >= 90
                                ? "text-yellow-600"
                                : percentage >= 70
                                ? "text-orange-600"
                                : "text-red-600"
                            }
                          >
                            {isNaN(diff) ? "" : diff}
                          </div>
                          <div
                            className={
                              percentage >= 98
                                ? "text-green-600"
                                : percentage >= 90
                                ? "text-yellow-600"
                                : percentage >= 70
                                ? "text-orange-600"
                                : "text-red-600"
                            }
                          >
                            {isNaN(percentage)
                              ? ""
                              : `${percentage.toFixed(2)}%`}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex mt-4 gap-1 justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-[20%] py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-500 hover:text-white dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition cursor-pointer"
              >
                Export data
              </button>
              <button
                type="submit"
                className="w-[20%] py-2 px-4 bg-blue-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg transition cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    )
  );
};

export default MaintenanceDetailsPage;
