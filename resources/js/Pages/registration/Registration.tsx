import { useForm } from "@inertiajs/react";
import React from "react";

const Registration = () => {
   const { data, setData, post, processing, errors } = useForm({
      name: "",
      email: "",
      password: "",
      storeName: "",
      location: "",
      description: "",
   });

   const submitRegistration = (e: React.SubmitEvent) => {
      e.preventDefault();
      console.log("Submitting registration form with data:", data);
      // post("/posts", {
      //    preserveScroll: true,
      // });
   };

   return (
      <>
         <div className="min-h-screen flex items-center justify-center">
            <div data-theme="mintlify" className="card sm:w-md">
               <div className="card-header">
                  <h5 className="card-title text-center">
                     Register New Account
                  </h5>
               </div>
               <div className="card-body">
                  <form onSubmit={submitRegistration}>
                     <div className="w-full">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Name
                        </label>
                        <input
                           data-theme="mintlify"
                           type="text"
                           className="input"
                           value={data.name}
                           onChange={(e) => setData("name", e.target.value)}
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Email
                        </label>
                        <input
                           data-theme="mintlify"
                           type="email"
                           className="input"
                           value={data.email}
                           onChange={(e) => setData("email", e.target.value)}
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Password
                        </label>
                        <input
                           data-theme="mintlify"
                           type="password"
                           className="input"
                           value={data.password}
                           onChange={(e) => setData("password", e.target.value)}
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Store Name
                        </label>
                        <input
                           data-theme="mintlify"
                           type="text"
                           className="input"
                           value={data.storeName}
                           onChange={(e) =>
                              setData("storeName", e.target.value)
                           }
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Location (optional)
                        </label>
                        <input
                           data-theme="mintlify"
                           type="text"
                           className="input"
                           value={data.location}
                           onChange={(e) => setData("location", e.target.value)}
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-2">
                        <label
                           className="label-text"
                           htmlFor="labelAndHelperText"
                        >
                           Description (optional)
                        </label>
                        <input
                           data-theme="mintlify"
                           type="text"
                           className="input"
                           value={data.description}
                           onChange={(e) =>
                              setData("description", e.target.value)
                           }
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
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
                  </form>
               </div>
            </div>
         </div>
      </>
   );
};

export default Registration;
