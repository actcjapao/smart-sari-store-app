import MainPanelLayout from "@/components/MainPanelLayout";
import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";

const Reports = () => {
   // Reinitialize FlyonUI when component mounts
   // Without this, the modal won't work when navigating to this page via Inertia links
   useEffect(() => {
      // Access the global FlyonUI/HSStaticMethods
      if (window.HSStaticMethods) {
         window.HSStaticMethods.autoInit();
      }
   }, []);

   const [dateRange, setDateRange] = useState<string>("Today");

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDateRange(e.target.value);
   };

   return (
      <>
         <div className="flex gap-4">
            <div className="w-[25%]">
               <label className="block text-sm font-medium mt-2">
                  Select date range
               </label>
               <select
                  data-theme="mintlify"
                  className="select mt-2"
                  id="favorite-simpson"
                  value={dateRange}
                  onChange={handleChange}
               >
                  <option value="Today">Today</option>
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                  <option value="Custom">Custom</option>
               </select>
            </div>
            {dateRange === "Custom" && (
               <>
                  <div className="w-[25%]">
                     <label className="block text-sm font-medium mt-2">
                        Start date
                     </label>
                     <input
                        data-theme="mintlify"
                        type="date"
                        className={`input input-bordered w-full mt-2`}
                        value={""}
                        disabled={false}
                        onChange={() => {}}
                     />
                  </div>
                  <div className="w-[25%]">
                     <label className="block text-sm font-medium mt-2">
                        End date
                     </label>
                     <input
                        data-theme="mintlify"
                        type="date"
                        className={`input input-bordered w-full mt-2`}
                        value={""}
                        disabled={false}
                        onChange={() => {}}
                     />
                  </div>
               </>
            )}
            <div className={`w-[10%]`}>
               <button
                  data-theme="mintlify"
                  className="btn btn-primary mt-9 w-full"
                  onClick={() => alert("Ready!")}
                  disabled={false}
               >
                  Apply
               </button>
            </div>
         </div>

         <h5 className="font-semibold mt-5">Summary</h5>
         <div className="flex gap-4 mt-2">
            <div className="w-[33%]">
               {/* Single card */}
               <StatusCard
                  label="Sales"
                  value="₱ 11,548"
                  icon="icon-[tabler--currency-dollar]"
                  colorClasses="text-warning bg-warning/20"
                  tooltip="Total sales for the selected date range"
               />
            </div>
            <div className="w-[33%]">
               {/* Single card */}
               <StatusCard
                  label="Cost"
                  value="₱ 11,548"
                  icon="icon-[tabler--wallet]"
                  colorClasses="text-accent bg-accent/20"
                  tooltip="Total cost of goods sold within the selected date range."
               />
            </div>
            <div className="w-[33%]">
               {/* Single card */}
               <StatusCard
                  label="Profit"
                  value="₱ 11,548"
                  icon="icon-[tabler--chart-bar]"
                  colorClasses="text-success bg-success/20"
                  tooltip="Total profit for the selected date range"
               />
            </div>
         </div>
         <div className="mt-5">
            <h5 className="font-semibold mb-1">Sales Record</h5>
            <div className="card w-full mt-2">
               <div className="overflow-x-auto">
                  <table className="table table-sm">
                     <thead>
                        <tr>
                           <th>Date</th>
                           <th>Method</th>
                           <th>Total</th>
                           <th>Payment</th>
                           <th>Change</th>
                           <th className="text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>2024-06-01</td>
                           <td>Cash</td>
                           <td>₱ 1,000</td>
                           <td>₱ 1,000</td>
                           <td>₱ 0</td>
                           <td className="text-right space-x-1">
                              <button
                                 className="btn btn-circle btn-text btn-sm"
                                 aria-label="Add stocks"
                                 // aria-controls="product-modal"
                                 // data-overlay="#product-modal"
                                 onClick={() => alert("Ready to add stocks")}
                              >
                                 <span className="icon-[tabler--list-details] size-5"></span>
                              </button>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   );
};

Reports.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Reports">{page}</MainPanelLayout>
);

export default Reports;
