const Registration = () => {
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
                  <form action="">
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
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
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
                           type="text"
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
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
                           type="text"
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
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
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
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
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
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
                           placeholder=""
                           className="input"
                           id="labelAndHelperText"
                        />
                        <span className="helper-text hidden">
                           Please write your full name
                        </span>
                     </div>

                     <div className="w-full mt-10 mb-3">
                        <button
                           data-theme="mintlify"
                           className="btn btn-primary btn-block"
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
