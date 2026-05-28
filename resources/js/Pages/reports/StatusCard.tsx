import React from "react";

type StatCardProps = {
   label: string;
   isLoading: boolean;
   value: string;
   icon: string; // Tabler icon class
   colorClasses: string; // e.g. "bg-warning/20 text-warning"
   tooltip: string;
};

const StatusCard: React.FC<StatCardProps> = ({
   label,
   isLoading,
   value,
   icon,
   colorClasses,
   tooltip,
}) => {
   const cardStyle = (label: string) => {
      switch (label.toLowerCase()) {
         case "profit":
            return "bg-linear-to-br from-success/15 to-base-100 border-success/30";
         default:
            return "bg-base-100 border-base-200";
      }
   };

   const labelStyle = (label: string) => {
      switch (label.toLowerCase()) {
         case "profit":
            return "text-success/60";
         default:
            return "text-base-content/50";
      }
   };

   const toolTipStyle = (label: string) => {
      switch (label.toLowerCase()) {
         case "profit":
            return "text-success/60";
         default:
            return "text-base-content/40";
      }
   };

   const valueStyle = (label: string) => {
      switch (label.toLowerCase()) {
         case "profit":
            return "font-bold text-success";
         default:
            return "font-semibold text-base-content/85";
      }
   };

   return (
      <div
         className={`rounded-box border px-4 py-3 flex gap-4 shadow-md transition-shadow ${cardStyle(label)}`}
      >
         {/* Icon */}
         <div className="avatar avatar-placeholder">
            <div className={`rounded-field size-11.5 ${colorClasses}`}>
               <span className={`${icon} size-6`}></span>
            </div>
         </div>

         {/* Content */}
         <div className="flex flex-col">
            {/* Label + Info */}
            <div className="flex items-center gap-1 relative group">
               <p
                  className={`text-xs font-semibold uppercase tracking-wide ${labelStyle(label)}`}
               >
                  {label}
               </p>

               {/* Info icon */}
               <span
                  className={`icon-[tabler--info-circle] size-4 cursor-pointer ${toolTipStyle(label)}`}
               ></span>

               {/* Tooltip */}
               <div className="absolute left-0 top-5 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-md">
                  {tooltip}
               </div>
            </div>

            {/* Value */}
            {isLoading ? (
               <div className="skeleton h-8 w-30"></div>
            ) : (
               <h2 className={`text-2xl ${valueStyle(label)}`}>{value}</h2>
            )}
         </div>
      </div>
   );
};

export default StatusCard;
