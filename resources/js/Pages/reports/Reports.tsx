import MainPanelLayout from "@/components/MainPanelLayout";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import StatusCard from "./StatusCard";
import { PaginatedSale, Sale, SaleItem, Summary } from "./types";
import SkeletonRow from "@/components/skeleton/SkeletonRowCell";

const Reports = () => {
   const [dateRange, setDateRange] = useState<string>("Today");
   const [customStartDate, setCustomStartDate] = useState<string>("");
   const [customEndDate, setCustomEndDate] = useState<string>("");
   const [paginatedSales, setPaginatedSales] = useState<PaginatedSale | null>(
      null,
   );
   const [summary, setSummary] = useState<Summary>({
      total_sales: 0,
      total_cost: 0,
      total_profit: 0,
   });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [fetchError, setFetchError] = useState<string>("");
   const [queryParams, setQueryParams] = useState<string>("");
   const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
   const saleDetailsModalOpenRef = useRef<HTMLButtonElement | null>(null);

   const [isSaleDetailsLoading, setIsSaleDetailsLoading] =
      useState<boolean>(false);
   const [saleItems, setSaleItems] = useState<SaleItem[]>([]);

   // Reinitialize FlyonUI when component mounts
   // Without this, the modal won't work when navigating to this page via Inertia links
   useEffect(() => {
      // Access the global FlyonUI/HSStaticMethods
      if (window.HSStaticMethods) {
         window.HSStaticMethods.autoInit();
      }
   }, []);

   const formatCurrency = (value: number) =>
      `₱ ${value.toLocaleString(undefined, {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })}`;

   const formatDate = (value: string) => {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
         return value;
      }
      return date.toLocaleDateString();
   };

   const applyClickHandler = () => {
      if (dateRange === "Custom" && (!customStartDate || !customEndDate)) {
         setFetchError("Please select both start and end dates.");
         return;
      }

      let query = `date_range=${encodeURIComponent(dateRange)}`;
      if (dateRange === "Custom") {
         query += `&start_date=${encodeURIComponent(customStartDate)}`;
         query += `&end_date=${encodeURIComponent(customEndDate)}`;
      }
      setQueryParams(query);
      fetchReports(query);
   };

   const fetchReports = async (query: string, url: string = "/api/reports") => {
      setPaginatedSales(null);
      setIsLoading(true);
      setFetchError("");

      // If the URL already has query parameters (e.g., ?page=2), we need to append with '&' instead of '?'
      const paramOperator =
         url.includes("?") || url.includes("?page") ? "&" : "?";
      try {
         const response = await axios.get(`${url}${paramOperator}${query}`);
         const data = response.data?.data;

         setPaginatedSales(data);
         setSummary(
            data?.summary ?? {
               total_sales: 0,
               total_cost: 0,
               total_profit: 0,
            },
         );
      } catch (error) {
         console.error("Error fetching report data:", error);
         setPaginatedSales(null);
         setSummary({ total_sales: 0, total_cost: 0, total_profit: 0 });
         setFetchError("Unable to load report data. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const nextRange = e.target.value;
      setDateRange(nextRange);

      if (nextRange !== "Custom") {
         setCustomStartDate("");
         setCustomEndDate("");
      }
   };

   useEffect(() => {
      fetchReports(`?date_range=${encodeURIComponent(dateRange)}`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const isApplyDisabled =
      dateRange === "Custom" && (!customStartDate || !customEndDate);

   const navigatePagination = (navigationUrl: string | null) => {
      // if navigationUrl is null, the url will fallback to the default value
      fetchReports(queryParams, navigationUrl || undefined);
   };

   const viewSaleTransactionClickHandler = async (sale: Sale) => {
      setIsSaleDetailsLoading(true);
      if (sale.uuid === selectedSale?.uuid) {
         // If the same sale is clicked again, just reopen the modal without refetching
         saleDetailsModalOpenRef.current?.click();
         setIsSaleDetailsLoading(false);
         return;
      }

      setSelectedSale(sale);
      saleDetailsModalOpenRef.current?.click();

      try {
         const response = await axios.get(
            `/api/reports/sales-items/${sale.uuid}`,
         );
         const data = response.data?.data;
         setSaleItems(data);
      } catch (error) {
         console.error("Error fetching sale items", error);
      } finally {
         setIsSaleDetailsLoading(false);
      }
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
                  value={dateRange}
                  onChange={handleDateRangeChange}
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
                        className="input input-bordered w-full mt-2"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                     />
                  </div>
                  <div className="w-[25%]">
                     <label className="block text-sm font-medium mt-2">
                        End date
                     </label>
                     <input
                        data-theme="mintlify"
                        type="date"
                        className="input input-bordered w-full mt-2"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                     />
                  </div>
               </>
            )}
            <div className="w-[10%]">
               <button
                  data-theme="mintlify"
                  className="btn btn-primary mt-9 w-full"
                  onClick={applyClickHandler}
                  disabled={isApplyDisabled || isLoading}
               >
                  {isLoading ? "Loading..." : "Apply"}
               </button>
            </div>
         </div>

         {fetchError && (
            <div className="alert alert-error mt-4">
               <span>{fetchError}</span>
            </div>
         )}

         <h5 className="font-semibold mt-5">Summary</h5>
         <div className="flex gap-4 mt-2">
            <div className="w-[33%]">
               <StatusCard
                  label="Sales"
                  isLoading={isLoading}
                  value={formatCurrency(summary.total_sales)}
                  icon="icon-[tabler--currency-dollar]"
                  colorClasses="text-warning bg-warning/20"
                  tooltip="Total sales for the selected date range"
               />
            </div>
            <div className="w-[33%]">
               <StatusCard
                  label="Cost"
                  isLoading={isLoading}
                  value={formatCurrency(summary.total_cost)}
                  icon="icon-[tabler--wallet]"
                  colorClasses="text-accent bg-accent/20"
                  tooltip="Total cost of goods sold within the selected date range."
               />
            </div>
            <div className="w-[33%]">
               <StatusCard
                  label="Profit"
                  isLoading={isLoading}
                  value={formatCurrency(summary.total_profit)}
                  icon="icon-[tabler--chart-bar]"
                  colorClasses="text-success bg-success/20"
                  tooltip="Total profit for the selected date range"
               />
            </div>
         </div>

         {/* SALES TABLE */}
         <div className="card bg-base-100 border border-gray-200 shadow-md mt-5">
            <div className="card-body">
               <div className="flex items-center justify-between">
                  <div>
                     <h2 className="font-semibold text-lg">Sales record</h2>

                     <p className="text-sm text-base-content/60">
                        List of sales based on the selected date range. Click
                        the eye icon to view details of each sale transaction.
                     </p>
                  </div>
               </div>

               <div className="overflow-x-auto mt-5">
                  <table className="table table-sm min-w-full">
                     <thead
                        data-theme="mintlify"
                        className="bg-base-200/80 text-base-content/60 text-xs uppercase tracking-wide"
                     >
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
                        {paginatedSales === null ||
                        paginatedSales?.sales?.data.length === 0 ? (
                           <>
                              {isLoading ? (
                                 Array.from({ length: 5 }).map((_, i) => (
                                    <SkeletonRow
                                       key={i}
                                       cells={[
                                          { width: "w-25" },
                                          { width: "w-20" },
                                          { width: "w-15" },
                                          { width: "w-15" },
                                          { width: "w-15" },
                                          {
                                             width: "w-8",
                                             cellClassName: "text-right",
                                             skeletonClassName:
                                                "rounded-full ml-auto h-8",
                                          },
                                       ]}
                                    />
                                 ))
                              ) : (
                                 <tr>
                                    <td
                                       colSpan={6}
                                       className="text-center py-8"
                                    >
                                       No sales records found for the selected
                                       date range.
                                    </td>
                                 </tr>
                              )}
                           </>
                        ) : (
                           paginatedSales?.sales?.data.map((record: Sale) => (
                              <tr
                                 key={record.uuid}
                                 className="hover:bg-base-200 transition-colors"
                              >
                                 <td className="text-sm font-medium text-base-content">
                                    {formatDate(record.created_at)}
                                 </td>
                                 <td className="text-sm text-base-content/75">
                                    {record.payment_method
                                       .charAt(0)
                                       .toUpperCase() +
                                       record.payment_method.slice(1)}
                                 </td>
                                 <td className="text-sm font-medium text-base-content">
                                    {formatCurrency(record.total_amount)}
                                 </td>
                                 <td className="text-sm text-base-content/75">
                                    {formatCurrency(record.payment_amount)}
                                 </td>
                                 <td className="text-sm text-base-content/75">
                                    {formatCurrency(record.change_amount)}
                                 </td>
                                 <td className="text-right space-x-1">
                                    <button
                                       className="btn btn-circle btn-text btn-sm"
                                       aria-label="View sale details"
                                       onClick={() =>
                                          viewSaleTransactionClickHandler(
                                             record,
                                          )
                                       }
                                    >
                                       <span className="icon-[tabler--list-details] size-5"></span>
                                    </button>
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>

                  {/* Pagination */}
                  {paginatedSales !== null &&
                     paginatedSales.sales.last_page > 1 && (
                        <div className="flex items-center justify-between mt-2 pt-4 px-3 border-base-300">
                           <div className="text-sm text-gray-500">
                              Showing {paginatedSales?.sales.from} to{" "}
                              {paginatedSales?.sales.to} of{" "}
                              {paginatedSales?.sales.total} products
                           </div>

                           <div className="flex gap-2">
                              {/* Previous Button */}
                              {paginatedSales.sales.prev_page_url ? (
                                 <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() =>
                                       navigatePagination(
                                          paginatedSales.sales.prev_page_url,
                                       )
                                    }
                                 >
                                    <span className="icon-[tabler--chevron-left] size-4"></span>
                                    Previous
                                 </button>
                              ) : (
                                 <button
                                    className="btn btn-sm btn-outline opacity-50 cursor-not-allowed"
                                    disabled
                                 >
                                    <span className="icon-[tabler--chevron-left] size-4"></span>
                                    Previous
                                 </button>
                              )}

                              {/* Page Numbers */}
                              <div className="flex gap-1">
                                 {paginatedSales.sales.links.map(
                                    (link, idx) => {
                                       // Skip the first and last links (prev/next)
                                       if (
                                          link.label.includes("Previous") ||
                                          link.label.includes("Next") ||
                                          link.label === "&laquo;" ||
                                          link.label === "&raquo;"
                                       ) {
                                          return null;
                                       }

                                       return (
                                          <button
                                             key={idx}
                                             className={`btn btn-sm btn-outline ${link.active ? "custom-primary" : ""}`}
                                             onClick={() =>
                                                navigatePagination(link.url)
                                             }
                                          >
                                             {link.label}
                                          </button>
                                       );
                                    },
                                 )}
                              </div>

                              {/* Next Button */}
                              {paginatedSales.sales.next_page_url ? (
                                 <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() =>
                                       navigatePagination(
                                          paginatedSales.sales.next_page_url,
                                       )
                                    }
                                 >
                                    Next
                                    <span className="icon-[tabler--chevron-right] size-4"></span>
                                 </button>
                              ) : (
                                 <button
                                    className="btn btn-sm btn-outline opacity-50 cursor-not-allowed"
                                    disabled
                                 >
                                    Next
                                    <span className="icon-[tabler--chevron-right] size-4"></span>
                                 </button>
                              )}
                           </div>
                        </div>
                     )}
               </div>
            </div>
         </div>

         {/* Hidden modal open trigger */}
         <button
            type="button"
            ref={saleDetailsModalOpenRef}
            className="hidden"
            aria-hidden="true"
            data-overlay="#sale-details-modal"
         />

         {/* Sale Modal (Details) */}
         <div
            id="sale-details-modal"
            className="overlay modal overlay-open:opacity-100 overlay-open:duration-300 modal-middle hidden"
            role="dialog"
            tabIndex={-1}
         >
            <div className="modal-dialog modal-dialog-xl">
               <div className="modal-content">
                  <div className="modal-header">
                     <h3 className="modal-title">Sale Transaction</h3>
                     <button
                        type="button"
                        className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                        aria-label="Close"
                        data-overlay="#sale-details-modal"
                     >
                        <span className="icon-[tabler--x] size-4"></span>
                     </button>
                  </div>
                  <div className="modal-body space-y-6">
                     {selectedSale ? (
                        <>
                           {/* Top Summary */}
                           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                              <div>
                                 <p className="text-xs text-gray-500">Date</p>
                                 <p className="font-medium">
                                    {formatDate(selectedSale.created_at)}
                                 </p>
                              </div>

                              <div>
                                 <p className="text-xs text-gray-500">
                                    Payment Method
                                 </p>
                                 <p className="font-medium capitalize">
                                    {selectedSale.payment_method}
                                 </p>
                              </div>

                              <div>
                                 <p className="text-xs text-gray-500">Total</p>
                                 <p className="font-medium">
                                    {formatCurrency(selectedSale.total_amount)}
                                 </p>
                              </div>

                              <div>
                                 <p className="text-xs text-gray-500">
                                    Payment
                                 </p>
                                 <p className="font-medium">
                                    {formatCurrency(
                                       selectedSale.payment_amount,
                                    )}
                                 </p>
                              </div>

                              <div>
                                 <p className="text-xs text-gray-500">Change</p>
                                 <p className="font-medium">
                                    {formatCurrency(selectedSale.change_amount)}
                                 </p>
                              </div>
                           </div>

                           {/* Sales Record */}
                           <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <h5 className="font-semibold">
                                       Sales Record
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                       Products included in this transaction
                                    </p>
                                 </div>
                              </div>

                              <div className="card w-full mt-2">
                                 <div className="overflow-x-auto">
                                    <table className="table table-sm">
                                       <thead className="bg-gray-100">
                                          <tr>
                                             <th>Name</th>
                                             <th>Brand</th>
                                             <th className="text-right">
                                                Selling Price
                                             </th>
                                             <th className="text-center">
                                                Quantity
                                             </th>
                                             <th className="text-right">
                                                Unit Price
                                             </th>
                                             <th className="text-right">
                                                Total Price
                                             </th>
                                          </tr>
                                       </thead>

                                       <tbody>
                                          {saleItems.length === 0 ? (
                                             <>
                                                {isSaleDetailsLoading ? (
                                                   Array.from({
                                                      length: 5,
                                                   }).map((_, i) => (
                                                      <SkeletonRow
                                                         key={i}
                                                         cells={[
                                                            {
                                                               width: "w-25",
                                                            },
                                                            {
                                                               width: "w-25",
                                                            },
                                                            {
                                                               width: "w-15",
                                                            },
                                                            {
                                                               width: "w-15",
                                                            },
                                                            {
                                                               width: "w-15",
                                                            },
                                                         ]}
                                                      />
                                                   ))
                                                ) : (
                                                   <tr>
                                                      <td
                                                         colSpan={6}
                                                         className="text-center py-8 text-gray-500"
                                                      >
                                                         No items found for the
                                                         selected transaction
                                                      </td>
                                                   </tr>
                                                )}
                                             </>
                                          ) : (
                                             saleItems.map(
                                                (saleItem: SaleItem) => {
                                                   return (
                                                      <tr key={saleItem.name}>
                                                         <td>
                                                            {saleItem.name}
                                                         </td>
                                                         <td>
                                                            {saleItem.brand ??
                                                               "-"}
                                                         </td>
                                                         <td className="text-right">
                                                            {formatCurrency(
                                                               saleItem.selling_price,
                                                            )}
                                                         </td>
                                                         <td className="text-center">
                                                            {saleItem.quantity}
                                                         </td>
                                                         <td className="text-right">
                                                            {formatCurrency(
                                                               saleItem.unit_price,
                                                            )}
                                                         </td>
                                                         <td className="text-right">
                                                            {formatCurrency(
                                                               saleItem.total_price,
                                                            )}
                                                         </td>
                                                      </tr>
                                                   );
                                                },
                                             )
                                          )}
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </>
                     ) : (
                        <div className="text-center py-8 text-gray-500">
                           No sale selected.
                        </div>
                     )}
                  </div>
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
