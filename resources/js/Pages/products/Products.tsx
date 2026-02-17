import MainPanelLayout from "@/components/MainPanelLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const products = [
   {
      id: 1,
      uuid: "uuid-12345",
      name: "MacBook Pro M3",
      brand: "MBP-M3-2024",
      description: "The latest MacBook Pro with M3 chip.",
      stock_quantity: 10,
      price: 1999.99,
      tags: ["laptop", "apple", "electronics"],
   },
];

const Products = ({ store_id }: { store_id: number }) => {
   const [tagInput, setTagInput] = useState("");
   const { data, setData, post, processing, errors, clearErrors, reset } =
      useForm({
         store_id,
         name: "",
         brand: "",
         description: "",
         stock_quantity: "",
         price: "",
         tags: [] as string[],
      });

   const addTag = () => {
      const value = tagInput.trim().toLowerCase();

      if (!value) return;

      if (!data.tags.includes(value)) {
         setData("tags", [...data.tags, value]);
      }

      setTagInput("");
   };

   const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
         e.preventDefault();
         addTag();
      }
   };

   const removeTag = (tagToRemove: string) => {
      setData(
         "tags",
         data.tags.filter((tag) => tag !== tagToRemove),
      );
   };

   const addProduct = (e: React.SyntheticEvent) => {
      e.preventDefault();

      post("/api/product/save", {
         preserveScroll: true,
         // onStart: () => {},
         // onFinish: () => {},
         onError: (errors) => {
            console.log("Validation Errors:", errors);
         },
         onSuccess: () => {
            reset();
            clearErrors();

            // // ⏳ Navigate after 2 seconds
            // setTimeout(() => {
            //    router.visit("/products");
            // }, 2000);
         },
      });
   };

   type FormFields = keyof typeof errors;
   const hasError = (field: FormFields) => Boolean(errors[field]);

   return (
      <>
         <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="card-title">Product List</h3>

                  <button
                     data-theme="mintlify"
                     className="btn btn-primary"
                     aria-haspopup="dialog"
                     aria-expanded="false"
                     aria-controls="add-product-modal"
                     data-overlay="#add-product-modal"
                  >
                     <span className="icon-[tabler--plus] size-4"></span>
                     Add Product
                  </button>
               </div>

               <div className="w-full overflow-x-auto">
                  <table className="table">
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Brand</th>
                           <th>Stock</th>
                           <th>Price</th>
                           <th>Tags</th>
                           <th className="text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.map((product) => (
                           <tr key={product.id} className="row-hover">
                              <td className="font-medium">{product.name}</td>
                              <td>{product.brand}</td>
                              <td>{product.stock_quantity}</td>
                              <td>{product.price}</td>
                              <td>{product.tags.join(", ")}</td>
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

         {/* Add Product Modal */}
         <div
            id="add-product-modal"
            className="overlay modal overlay-open:opacity-100 overlay-open:duration-300 modal-middle hidden"
            role="dialog"
            tabIndex={-1}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h3 className="modal-title">Add Product</h3>
                     <button
                        type="button"
                        className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                        aria-label="Close"
                        data-overlay="#add-product-modal"
                     >
                        <span className="icon-[tabler--x] size-4"></span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form id="add-product-form" onSubmit={addProduct}>
                        <div className="w-full space-y-2">
                           <label
                              className="label-text font-medium"
                              htmlFor="name"
                           >
                              Name
                           </label>
                           <input
                              id="name"
                              data-theme="mintlify"
                              type="text"
                              className={`input w-full ${hasError("name") ? "is-invalid" : ""}`}
                              value={data.name}
                              onChange={(e) => {
                                 setData("name", e.target.value);
                                 clearErrors("name");
                              }}
                           />
                           {hasError("name") && (
                              <p className="mt-1 text-sm text-red-500">
                                 {errors.name}
                              </p>
                           )}
                        </div>
                        <div className="w-full space-y-2">
                           <label className="label-text" htmlFor="brand">
                              <span className="font-medium">Brand</span>
                              <span> (optional)</span>
                           </label>
                           <input
                              id="brand"
                              data-theme="mintlify"
                              type="text"
                              className={`input w-full ${hasError("brand") ? "is-invalid" : ""}`}
                              value={data.brand}
                              onChange={(e) => {
                                 setData("brand", e.target.value);
                                 clearErrors("brand");
                              }}
                           />
                           {hasError("brand") && (
                              <p className="mt-1 text-sm text-red-500">
                                 {errors.brand}
                              </p>
                           )}
                        </div>
                        <div className="w-full space-y-2">
                           <label className="label-text" htmlFor="description">
                              <span className="font-medium">Description</span>
                              <span> (optional)</span>
                           </label>
                           <input
                              id="description"
                              data-theme="mintlify"
                              type="text"
                              className={`input w-full ${hasError("description") ? "is-invalid" : ""}`}
                              value={data.description}
                              onChange={(e) => {
                                 setData("description", e.target.value);
                                 clearErrors("description");
                              }}
                           />
                           {hasError("description") && (
                              <p className="mt-1 text-sm text-red-500">
                                 {errors.description}
                              </p>
                           )}
                        </div>
                        <div className="w-full space-y-2">
                           <label
                              className="label-text font-medium"
                              htmlFor="stock_quantity"
                           >
                              Stock Qty
                           </label>
                           <input
                              id="stock_quantity"
                              data-theme="mintlify"
                              type="text"
                              className={`input w-full ${hasError("stock_quantity") ? "is-invalid" : ""}`}
                              value={data.stock_quantity}
                              onChange={(e) => {
                                 setData("stock_quantity", e.target.value);
                                 clearErrors("stock_quantity");
                              }}
                           />
                           {hasError("stock_quantity") && (
                              <p className="mt-1 text-sm text-red-500">
                                 {errors.stock_quantity}
                              </p>
                           )}
                        </div>
                        <div className="w-full space-y-2">
                           <label
                              className="label-text font-medium"
                              htmlFor="price"
                           >
                              Price
                           </label>
                           <input
                              id="price"
                              data-theme="mintlify"
                              type="text"
                              className={`input w-full ${hasError("price") ? "is-invalid" : ""}`}
                              value={data.price}
                              onChange={(e) => {
                                 setData("price", e.target.value);
                                 clearErrors("price");
                              }}
                           />
                           {hasError("price") && (
                              <p className="mt-1 text-sm text-red-500">
                                 {errors.price}
                              </p>
                           )}
                        </div>
                        {/* Tags Field */}
                        <div className="w-full space-y-2 mt-4">
                           <label className="label-text" htmlFor="tags">
                              <span className="font-medium">Tags</span>
                              <span> (optional)</span>
                           </label>

                           {/* Input */}
                           <input
                              id="tags"
                              type="text"
                              data-theme="mintlify"
                              className="input input-bordered w-full"
                              placeholder="Type tag and press Enter"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={handleTagKeyDown}
                           />

                           {/* Pills */}
                           <div className="flex flex-wrap gap-2 mb-2">
                              {data.tags.map((tag: string) => (
                                 <span
                                    key={tag}
                                    className="badge badge-primary badge-soft flex items-center gap-1 px-3 py-2"
                                 >
                                    {tag}
                                    <button
                                       type="button"
                                       onClick={() => removeTag(tag)}
                                       className="ml-1"
                                    >
                                       <span className="icon-[tabler--x] size-3"></span>
                                    </button>
                                 </span>
                              ))}
                           </div>

                           {errors.tags && (
                              <p className="text-sm text-red-500 mt-1">
                                 {errors.tags}
                              </p>
                           )}
                        </div>
                     </form>
                  </div>

                  <div className="modal-footer flex justify-end gap-3">
                     <button
                        type="button"
                        data-theme="mintlify"
                        className="btn btn-outline btn-accent"
                        data-overlay="#add-product-modal"
                     >
                        Cancel
                     </button>

                     {/* Submit Button */}
                     <button
                        type="submit"
                        form="add-product-form"
                        data-theme="mintlify"
                        className="btn btn-primary px-7"
                        disabled={processing}
                     >
                        Add
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

Products.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Products">{page}</MainPanelLayout>
);

export default Products;
