import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

type MainPanelLayoutProps = {
   children: React.ReactNode;
   title?: string;
};

const MainPanelLayout = ({ children, title }: MainPanelLayoutProps) => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const { url } = usePage(); // for active link detection

   const navLinkClass = (path: string) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
         url.startsWith(path) ? "bg-base-200 text-primary" : "hover:bg-base-200"
      }`;

   const applyMintlifyTheme = (path: string) => {
      return url.startsWith(path) ? "mintlify" : "";
   };

   return (
      <div className="min-h-screen bg-base-200">
         {/* Overlay */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 z-40 bg-black/40 lg:hidden"
               onClick={() => setSidebarOpen(false)}
            />
         )}

         <div className="flex">
            {/* Sidebar */}
            <aside
               className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-md transform transition-transform duration-300
               ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
               lg:static lg:translate-x-0`}
            >
               <div className="p-4 border-b border-b-gray-200 border-base-300">
                  <h2 className="text-xl font-semibold pb-1">
                     Smart Sari Store
                  </h2>
               </div>

               <nav className="p-4 space-y-2">
                  <Link
                     data-theme={`${applyMintlifyTheme("/dashboard")}`}
                     href="/dashboard"
                     className={navLinkClass("/dashboard")}
                  >
                     <span className="icon-[tabler--layout-dashboard-filled] w-5 h-5 shrink-0"></span>
                     Dashboard
                  </Link>

                  <Link
                     data-theme={`${applyMintlifyTheme("/products")}`}
                     href="/products"
                     className={navLinkClass("/products")}
                  >
                     <span className="icon-[tabler--box] w-5 h-5 shrink-0"></span>
                     Products
                  </Link>
                  <Link
                     data-theme={`${applyMintlifyTheme("/sales")}`}
                     href="/sales"
                     className={navLinkClass("/sales")}
                  >
                     <span className="icon-[tabler--device-desktop-dollar] w-5 h-5 shrink-0"></span>
                     <span>Sales</span>
                  </Link>
                  <Link
                     data-theme={`${applyMintlifyTheme("/debts")}`}
                     href="/debts"
                     className={navLinkClass("/debts")}
                  >
                     <span className="icon-[tabler--user-dollar] w-5 h-5 shrink-0"></span>
                     <span>Debts</span>
                  </Link>
               </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
               {/* Top Navbar */}
               <header className="bg-base-100 shadow-sm px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <button
                        className="lg:hidden btn btn-ghost btn-sm"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                     >
                        ☰
                     </button>
                     <h1 className="text-lg font-semibold">
                        {title ?? "Dashboard"}
                     </h1>
                  </div>

                  <div className="flex items-center gap-4">
                     <span className="text-sm">John Doe</span>
                     <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8">
                           <span>JD</span>
                        </div>
                     </div>
                  </div>
               </header>

               {/* Dynamic Page Content */}
               <main className="flex-1 p-6">{children}</main>
            </div>
         </div>
      </div>
   );
};

export default MainPanelLayout;
