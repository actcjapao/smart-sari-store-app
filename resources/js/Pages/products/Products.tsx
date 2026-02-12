import MainPanelLayout from "@/components/MainPanelLayout";
import React from "react";

const Products = () => {
   return (
      <div className="card bg-base-100 shadow-sm">
         <div className="card-body">
            <h2 className="card-title">Welcome to the Products Page!</h2>
            <p>This is your products content.</p>
         </div>
      </div>
   );
};

Products.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Products">{page}</MainPanelLayout>
);

export default Products;
