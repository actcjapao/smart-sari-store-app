import MainPanelLayout from "@/components/MainPanelLayout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { Product } from "./types";
import { PageProps } from "@/types/PageProp.type";

const Products = ({
   store_id,
   products,
}: {
   store_id: number;
   products: Product[];
}) => {
   const { flash } = usePage<PageProps>().props;
   const [tagInput, setTagInput] = useState("");
   const { data, setData, post, processing, errors, clearErrors, reset } =
      useForm({
         product_uuid: "",
         store_id: store_id,
         name: "",
         brand: "",
         description: "",
         stock_quantity: "",
         price: "",
         tags: [] as string[],
      });

   const [mode, setMode] = useState<"add" | "edit">("add");
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

   // Reinitialize FlyonUI when component mounts
   // Without this, the modal won't work when navigating to this page via Inertia links
   useEffect(() => {
      // Access the global FlyonUI/HSStaticMethods
      if (window.HSStaticMethods) {
         window.HSStaticMethods.autoInit();
      }
   }, []);

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

   const saveProduct = (e: React.SyntheticEvent) => {
      e.preventDefault();

      post(
         `/api/product/save/${mode === "edit" && selectedProduct ? selectedProduct.uuid : ""}`,
         {
            preserveScroll: true,
            only: ["products", "flash"], // reload only products and flash props
            // onStart: () => {}, // can be used to set a loading state if needed
            // onFinish: () => {}, // can be used to reset loading state
            onError: (errors) => {
               console.log("Validation Errors:", errors);
            },
            onSuccess: () => {
               reset();
               clearErrors();
               setMode("add");
               setSelectedProduct(null);

               // Close modal after showing success message
               setTimeout(() => {
                  const closeButton = document.querySelector(
                     '[data-overlay="#product-modal"]',
                  ) as HTMLElement;

                  closeButton?.click();
               }, 1300);
            },
         },
      );
   };

   const openAddProductModal = () => {
      reset(); // clear form
      setMode("add");
      setSelectedProduct(null);
      clearErrors(); // clear validation errors
   };

   const openEditProductModal = (product: Product) => {
      reset(); // clear form
      setMode("edit");
      setSelectedProduct(product);
      clearErrors(); // clear validation errors

      setData((prev) => ({
         ...prev,
         product_uuid: product.uuid,
         store_id,
         name: product.name,
         brand: product.brand || "",
         description: product.description || "",
         stock_quantity: String(product.stock_quantity),
         price: String(product.price),
         tags: product.tags || [],
      }));
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
                     aria-controls="product-modal"
                     data-overlay="#product-modal"
                     onClick={openAddProductModal}
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
                                    aria-controls="product-modal"
                                    data-overlay="#product-modal"
                                    onClick={() =>
                                       openEditProductModal(product)
                                    }
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

         {/* Save Product Modal (Add / Edit) */}
         <div
            id="product-modal"
            className="overlay modal overlay-open:opacity-100 overlay-open:duration-300 modal-middle hidden"
            role="dialog"
            tabIndex={-1}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h3 className="modal-title">{`${mode === "edit" ? "Edit" : "Add"} Product`}</h3>
                     <button
                        type="button"
                        className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                        aria-label="Close"
                        data-overlay="#product-modal"
                     >
                        <span className="icon-[tabler--x] size-4"></span>
                     </button>
                  </div>
                  <div className="modal-body">
                     {flash.success !== null && (
                        <div
                           data-theme="mintlify"
                           className="alert alert-primary mb-4"
                           role="alert"
                        >
                           <span>{flash.success}</span>
                        </div>
                     )}
                     {flash.error !== null && (
                        <div
                           data-theme="mintlify"
                           className="alert alert-error mb-4"
                           role="alert"
                        >
                           <span>{flash.error}</span>
                        </div>
                     )}
                     <form id="product-form" onSubmit={saveProduct}>
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
                        data-overlay="#product-modal"
                     >
                        Cancel
                     </button>

                     {/* Submit Button */}
                     <button
                        type="submit"
                        form="product-form"
                        data-theme="mintlify"
                        className="btn btn-primary px-7"
                        disabled={processing}
                     >
                        {mode === "add" ? "Add" : "Update"}
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
