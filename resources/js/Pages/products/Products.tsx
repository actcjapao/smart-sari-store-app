import MainPanelLayout from "@/components/MainPanelLayout";
import React from "react";

const Products = () => {
   const products = [
      {
         id: 1,
         name: "MacBook Pro M3",
         sku: "MBP-M3-2024",
         status: "Active",
         date: "March 1, 2024",
      },
      {
         id: 2,
         name: "iPhone 15 Pro",
         sku: "IP15P-256GB",
         status: "Out of Stock",
         date: "March 2, 2024",
      },
      {
         id: 3,
         name: "AirPods Pro",
         sku: "APP-2NDGEN",
         status: "Draft",
         date: "March 3, 2024",
      },
   ];

   const getStatusBadge = (status: string) => {
      switch (status) {
         case "Active":
            return "badge-success";
         case "Out of Stock":
            return "badge-error";
         case "Draft":
            return "badge-warning";
         default:
            return "badge-primary";
      }
   };

   return (
      <div className="card bg-base-100 shadow-sm">
         <div className="card-body">
            <div className="flex items-center justify-between mb-4">
               <h3 className="card-title">Product List</h3>

               <button data-theme="mintlify" className="btn btn-primary btn-sm">
                  <span className="icon-[tabler--plus] size-4"></span>
                  Add Product
               </button>
            </div>

            <div className="w-full overflow-x-auto">
               <table className="table">
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Status</th>
                        <th>Date Added</th>
                        <th className="text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products.map((product) => (
                        <tr key={product.id} className="row-hover">
                           <td className="font-medium">{product.name}</td>
                           <td>{product.sku}</td>
                           <td>
                              <span
                                 className={`badge badge-soft ${getStatusBadge(
                                    product.status,
                                 )} text-xs`}
                              >
                                 {product.status}
                              </span>
                           </td>
                           <td>{product.date}</td>
                           <td className="text-right space-x-1">
                              <button
                                 className="btn btn-circle btn-text btn-sm"
                                 aria-label="Edit"
                              >
                                 <span className="icon-[tabler--pencil] size-5"></span>
                              </button>

                              <button
                                 className="btn btn-circle btn-text btn-sm"
                                 aria-label="Delete"
                              >
                                 <span className="icon-[tabler--trash] size-5"></span>
                              </button>

                              <button
                                 className="btn btn-circle btn-text btn-sm"
                                 aria-label="More"
                              >
                                 <span className="icon-[tabler--dots-vertical] size-5"></span>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

Products.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Products">{page}</MainPanelLayout>
);

export default Products;
