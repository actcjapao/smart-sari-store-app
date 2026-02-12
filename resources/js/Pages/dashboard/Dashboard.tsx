import MainPanelLayout from "@/components/MainPanelLayout";
import React from "react";

const Dashboard = () => {
   return (
      <div className="card bg-base-100 shadow-sm">
         <div className="card-body">
            <h2 className="card-title">Welcome to the Dashboard!</h2>
            <p>This is your dashboard content.</p>
         </div>
      </div>
   );
};

Dashboard.layout = (page: React.ReactNode) => (
   <MainPanelLayout title="Dashboard">{page}</MainPanelLayout>
);

export default Dashboard;
