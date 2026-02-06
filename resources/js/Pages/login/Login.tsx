import { PageProps } from "@/types/PageProp.type";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

const Login = () => {
   const { flash } = usePage<PageProps>().props;
   const { data, setData, post, processing, errors, clearErrors, reset } =
      useForm({
         email: "",
         password: "",
      });

   const login = (e: React.SyntheticEvent) => {
      e.preventDefault();
   };

   type FormFields = keyof typeof errors;
   const hasError = (field: FormFields) => Boolean(errors[field]);

   return (
      <>
         <div className="min-h-screen flex items-center justify-center">
            <div data-theme="mintlify" className="card sm:w-md my-5">
               <div className="card-header">
                  <h5 className="card-title text-center">
                     Login to Your Account
                  </h5>
               </div>
               <div className="card-body">
                  {flash.success && (
                     <div className="alert alert-primary" role="alert">
                        <span>{flash.success}</span>
                     </div>
                  )}
                  <form onSubmit={login}>
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
                           Don&apos;t have an account?{" "}
                           <Link
                              href="/"
                              className="text-primary font-medium hover:underline"
                           >
                              Register
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

export default Login;
