import MainPanelLayout from "@/components/MainPanelLayout";
import React, { useEffect } from "react";

const Sales = () => {
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
         <h1>Welcome in Sales Page</h1>
      </>
   );
};

Sales.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Sales">{page}</MainPanelLayout>
);

export default Sales;
