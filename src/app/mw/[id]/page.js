"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaintenanceById,
  updateMaintenance,
  clearMwdata,
} from "@/lib/slices/MaintenanceSlice";

const MaintenanceDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

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
      <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 underline mb-4"
        >
          ← Go Back
        </button>
        <h1>{formData.name}</h1>

        {formData && (
          // <form
          //   onSubmit={handleSubmit}
          //   className="flex flex-col gap-2 bg-gray-300 text-gray-700 p-2 rounded"
          // >
          //   <div className="flex justify-between">
          //     <h3>Field</h3>
          //     <h3>Pre</h3>
          //     <h3>Post</h3>
          //     <h3>Difference</h3>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label className="w-[150px]">scm summary total</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_scm_summary_total_count"
          //       value={formData.pre_scm_summary_total_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-[86px] text-center text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0 "
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_scm_summary_total_count"
          //       value={formData.post_scm_summary_total_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-[86px] text-center text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className=" rounded p-2 w-[86px] text-center text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0">
          //       {formData &&
          //       Number(formData.post_scm_summary_total_count) -
          //         Number(formData.pre_scm_summary_total_count) >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {Number(formData.post_scm_summary_total_count) -
          //             Number(formData.pre_scm_summary_total_count)}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {String(
          //             Number(formData.post_scm_summary_total_count) -
          //               Number(formData.pre_scm_summary_total_count)
          //           )}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>scm partials</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cm_partial"
          //       value={formData.pre_cm_partial}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cm_partial"
          //       value={formData.post_cm_partial}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cm_partial - formData.pre_cm_partial >= 0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cm_partial - formData.pre_cm_partial}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cm_partial - formData.pre_cm_partial}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe total count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_total_count"
          //       value={formData.pre_cpe_total_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_total_count"
          //       value={formData.post_cpe_total_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_total_count - formData.pre_cpe_total_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_total_count -
          //             formData.pre_cpe_total_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_total_count -
          //             formData.pre_cpe_total_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe erouter count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_erouter_count"
          //       value={formData.pre_cpe_erouter_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_erouter_count"
          //       value={formData.post_cpe_erouter_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_erouter_count -
          //         formData.pre_cpe_erouter_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_erouter_count -
          //             formData.pre_cpe_erouter_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_erouter_count -
          //             formData.pre_cpe_erouter_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe cpe count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_cpe_count"
          //       value={formData.pre_cpe_cpe_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_cpe_count"
          //       value={formData.post_cpe_cpe_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_cpe_count - formData.pre_cpe_cpe_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_cpe_count - formData.pre_cpe_cpe_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_cpe_count - formData.pre_cpe_cpe_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe edva count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_edva_count"
          //       value={formData.pre_cpe_edva_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_edva_count"
          //       value={formData.post_cpe_edva_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_edva_count - formData.pre_cpe_edva_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_edva_count - formData.pre_cpe_edva_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_edva_count - formData.pre_cpe_edva_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe emta count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_emta_count"
          //       value={formData.pre_cpe_emta_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_emta_count"
          //       value={formData.post_cpe_emta_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_emta_count - formData.pre_cpe_emta_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_emta_count - formData.pre_cpe_emta_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_emta_count - formData.pre_cpe_emta_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe estb count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_estb_count"
          //       value={formData.pre_cpe_estb_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_estb_count"
          //       value={formData.post_cpe_estb_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_estb_count - formData.pre_cpe_estb_count >=
          //         0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_estb_count - formData.pre_cpe_estb_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_estb_count - formData.pre_cpe_estb_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe d4 count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_d4_count"
          //       value={formData.pre_cpe_d4_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_d4_count"
          //       value={formData.post_cpe_d4_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_d4_count - formData.pre_cpe_d4_count >= 0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_d4_count - formData.pre_cpe_d4_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_d4_count - formData.pre_cpe_d4_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <div className="flex items-center gap-4 justify-between">
          //     <label>cpe d6 count</label>
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="pre_cpe_d6_count"
          //       value={formData.pre_cpe_d6_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <input
          //       type="text"
          //       // pattern="[0-9]*"
          //       name="post_cpe_d6_count"
          //       value={formData.post_cpe_d6_count}
          //       onChange={handleChange}
          //       className="border border-gray-400 rounded p-2 w-md text-gray-600 dark:text-gray-300 dark:placeholder:text-gray-600 placeholder:text-gray-300 focus:outline-0"
          //     />
          //     <p className="inline-block">
          //       {formData &&
          //       formData.post_cpe_d6_count - formData.pre_cpe_d6_count >= 0 ? (
          //         <span className="text-green-600">
          //           {formData.post_cpe_d6_count - formData.pre_cpe_d6_count}
          //         </span>
          //       ) : (
          //         <span className="text-red-600">
          //           {formData.post_cpe_d6_count - formData.pre_cpe_d6_count}
          //         </span>
          //       )}
          //     </p>
          //   </div>
          //   <button
          //     type="submit"
          //     className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          //   >
          //     Save
          //   </button>
          // </form>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 text-gray-700 p-4 rounded"
          >
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-gray-400">
                  <th className="p-2 border">Field</th>
                  <th className="p-2 border">Pre</th>
                  <th className="p-2 border">Post</th>
                  <th className="p-2 border">Difference</th>
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
                    <tr key={field} className="border">
                      <td className="p-2 border text-left">{label}</td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name={`pre_${field}`}
                          value={formData[`pre_${field}`]}
                          onChange={handleChange}
                          className="border border-gray-400 rounded p-1 w-[86px] text-center"
                        />
                      </td>
                      <td className="p-2 border">
                        <input
                          type="text"
                          name={`post_${field}`}
                          value={formData[`post_${field}`]}
                          onChange={handleChange}
                          className="border border-gray-400 rounded p-1 w-[86px] text-center"
                        />
                      </td>
                      <td className="p-2 border-none font-semibold ">
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
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
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
