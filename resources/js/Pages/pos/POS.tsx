import MainPanelLayout from "@/components/MainPanelLayout";
// import { usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
// import { PageProps } from "@/types/PageProp.type";

const Products = () => {
   //    const { flash } = usePage<PageProps>().props;
   // Reinitialize FlyonUI when component mounts
   // Without this, the modal won't work when navigating to this page via Inertia links
   useEffect(() => {
      // Access the global FlyonUI/HSStaticMethods
      if (window.HSStaticMethods) {
         window.HSStaticMethods.autoInit();
      }
   }, []);

   return (
      <>
         <div className="flex gap-4">
            <div className="w-3/4">
               <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                     <div
                        data-theme="mintlify"
                        className="relative max-w-sm"
                        data-combo-box='{
                              "apiUrl": "https://www.freetestapi.com/api/v1/countries",
                              "outputItemTemplate": "<div class=\"dropdown-item combo-box-selected:dropdown-active\" data-combo-box-output-item><div class=\"flex justify-between items-center w-full\"><div data-combo-box-output-item-field=\"name\" data-combo-box-search-text data-combo-box-value></div><span class=\"icon-[tabler--check] text-primary combo-box-selected:block hidden size-4 shrink-0\"></span></div></div>"
                          }'
                     >
                        <div className="relative">
                           <input
                              className="input"
                              type="text"
                              value=""
                              placeholder="Search product..."
                              role="combobox"
                              aria-expanded="false"
                              data-combo-box-input=""
                              aria-label="Json-based combobox"
                           />
                        </div>
                     </div>
                     <div className="mt-2 p-4 bg-base-200 rounded-box">
                        <h5 className="font-semibold mb-1">Product Preview</h5>
                        <div className="grid grid-cols-3 gap-2">
                           <div>
                              <label className="block text-sm font-medium">
                                 Name
                              </label>
                              <p className="text-base-content">Rice</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium">
                                 Price
                              </label>
                              <p className="text-base-content">$5.00</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium">
                                 Stock
                              </label>
                              <p className="text-base-content">50</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium">
                                 Brand
                              </label>
                              <p className="text-base-content">Brand A</p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium">
                                 Tags
                              </label>
                              <p className="text-base-content">
                                 Food, Staple, Rice
                              </p>
                           </div>
                           <div>
                              <label className="block text-sm font-medium">
                                 Quantity
                              </label>
                              <input
                                 data-theme="mintlify"
                                 type="number"
                                 className="input max-w-sm mt-2"
                                 aria-label="input"
                                 placeholder="Enter quantity"
                                 min="1"
                              />
                           </div>
                        </div>
                        <div className="mt-4">
                           <button
                              data-theme="mintlify"
                              className="btn btn-primary btn-sm"
                           >
                              Add item
                           </button>
                        </div>
                     </div>
                     <div className="card w-full mt-2">
                        <div className="overflow-x-auto">
                           <table className="table table-sm">
                              <thead>
                                 <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th className="text-right">Actions</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {/* Selected products will be populated here */}
                                 <tr>
                                    <td>Rice</td>
                                    <td>2</td>
                                    <td>$5.00</td>
                                    <td>$10.00</td>
                                    <td className="text-right">
                                       <button
                                          data-theme="mintlify"
                                          className="btn btn-sm btn-error"
                                       >
                                          Remove
                                       </button>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td>Soap</td>
                                    <td>1</td>
                                    <td>$3.00</td>
                                    <td>$3.00</td>
                                    <td className="text-right">
                                       <button
                                          data-theme="mintlify"
                                          className="btn btn-sm btn-error"
                                       >
                                          Remove
                                       </button>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="w-1/4">
               <div className="card bg-base-100 shadow-sm">
                  <div className="card-body">
                     <h3 className="card-title">Summary</h3>
                     <div className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium">
                              Total Amount
                           </label>
                           <p className="text-lg font-bold">$13.00</p>
                        </div>
                        <div>
                           <label className="block text-sm font-medium">
                              Cash
                           </label>
                           <input
                              data-theme="mintlify"
                              type="number"
                              className="input input-bordered w-full"
                              placeholder="Enter cash amount"
                              min="0"
                              step="0.01"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium">
                              Change
                           </label>
                           <p className="text-lg">$0.00</p>
                        </div>
                        <button
                           data-theme="mintlify"
                           className="btn btn-primary w-full"
                        >
                           Proceed
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

Products.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="POS">{page}</MainPanelLayout>
);

export default Products;
