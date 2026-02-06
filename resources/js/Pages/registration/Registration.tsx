import { PageProps } from "@/types/PageProp.type";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import React from "react";

const Registration = () => {
   const { flash } = usePage<PageProps>().props;
   const { data, setData, post, processing, errors, clearErrors, reset } =
      useForm({
         name: "",
         email: "",
         password: "",
         password_confirmation: "",
         store_name: "",
         location: "",
         description: "",
      });

   const submitRegistration = (e: React.SyntheticEvent) => {
      e.preventDefault();

      post("/api/register", {
         preserveScroll: true,
         onSuccess: () => {
            reset();
            clearErrors();

            // ⏳ Navigate after 2 seconds
            setTimeout(() => {
               router.visit("/login");
            }, 2000);
         },
      });
   };

   type FormFields = keyof typeof errors;
   const hasError = (field: FormFields) => Boolean(errors[field]);

   return (
      <>
         <div className="min-h-screen flex items-center justify-center">
            <div data-theme="mintlify" className="card sm:w-md my-5">
               <div className="card-header">
                  <h5 className="card-title text-center">
                     Register New Account
                  </h5>
               </div>
               <div className="card-body">
                  {flash.success && (
                     <div className="alert alert-primary" role="alert">
                        <span>{flash.success}</span>
                     </div>
                  )}
                  <form onSubmit={submitRegistration}>
                     <div className="w-full">
                        <label className="label-text" htmlFor="name">
                           Name
                        </label>
                        <input
                           id="name"
                           data-theme="mintlify"
                           type="text"
                           className={`input ${hasError("name") ? "is-invalid" : ""}`}
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

                     <div className="w-full mt-2">
                        <label className="label-text" htmlFor="email">
                           Email
                        </label>
                        <input
                           id="email"
                           data-theme="mintlify"
                           type="email"
                           className={`input ${hasError("email") ? "is-invalid" : ""}`}
                           value={data.email}
                           onChange={(e) => {
                              setData("email", e.target.value);
                              clearErrors("email");
                           }}
                        />
                        {hasError("email") && (
                           <p className="mt-1 text-sm text-red-500">
                              {errors.email}
                           </p>
                        )}
                     </div>

                     <div className="w-full mt-2">
                        <label className="label-text" htmlFor="password">
                           Password
                        </label>
                        <input
                           id="password"
                           data-theme="mintlify"
                           type="password"
                           className={`input ${hasError("password") ? "is-invalid" : ""}`}
                           value={data.password}
                           onChange={(e) => {
                              setData("password", e.target.value);
                              clearErrors("password");
                           }}
                        />
                        {hasError("password") && (
                           <p className="mt-1 text-sm text-red-500">
                              {errors.password}
                           </p>
                        )}
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="password_confirmation"
                        >
                           Confirm Password
                        </label>
                        <input
                           id="password_confirmation"
                           type="password"
                           className={`input ${hasError("password") ? "is-invalid" : ""}`}
                           name="password_confirmation"
                           value={data.password_confirmation}
                           onChange={(e) => {
                              setData("password_confirmation", e.target.value);
                              clearErrors("password");
                           }}
                        />
                        {hasError("password") && (
                           <p className="mt-1 text-sm text-red-500">
                              {errors.password}
                           </p>
                        )}
                     </div>

                     <div className="w-full mt-2">
                        <label className="label-text" htmlFor="store_name">
                           Store Name
                        </label>
                        <input
                           id="store_name"
                           data-theme="mintlify"
                           type="text"
                           className={`input ${hasError("store_name") ? "is-invalid" : ""}`}
                           value={data.store_name}
                           onChange={(e) => {
                              setData("store_name", e.target.value);
                              clearErrors("store_name");
                           }}
                        />
                        {hasError("store_name") && (
                           <p className="mt-1 text-sm text-red-500">
                              {errors.store_name}
                           </p>
                        )}
                     </div>

                     <div className="w-full mt-2">
                        <label className="label-text" htmlFor="location">
                           Location (optional)
                        </label>
                        <input
                           id="location"
                           data-theme="mintlify"
                           type="text"
                           className={`input`}
                           value={data.location}
                           onChange={(e) => setData("location", e.target.value)}
                        />
                     </div>

                     <div className="w-full mt-2">
                        <label className="label-text" htmlFor="description">
                           Description (optional)
                        </label>
                        <input
                           id="description"
                           data-theme="mintlify"
                           type="text"
                           className={`input`}
                           value={data.description}
                           onChange={(e) =>
                              setData("description", e.target.value)
                           }
                        />
                     </div>

                     <div className="w-full mt-10 mb-3">
                        <button
                           data-theme="mintlify"
                           type="submit"
                           className="btn btn-primary btn-block"
                           disabled={processing}
                        >
                           Register
                        </button>
                     </div>
                     <div className="w-full text-center mt-4">
                        <p className="text-sm text-gray-500">
                           Already have an account?{" "}
                           <Link
                              href="/login"
                              className="text-primary font-medium hover:underline"
                           >
                              Login
                           </Link>
                        </p>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default Registration;
