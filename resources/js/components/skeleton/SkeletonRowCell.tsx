type SkeletonRowCell = {
   width: string;
   cellClassName?: string;
   skeletonClassName?: string;
};

const SkeletonRow = ({ cells }: { cells: SkeletonRowCell[] }) => {
   return (
      <tr>
         {cells.map((cell, idx) => (
            <td key={idx} className={`py-3 ${cell.cellClassName ?? ""}`}>
               <div
                  className={`skeleton h-4 ${cell.width} ${
                     cell.skeletonClassName ?? ""
                  }`}
               ></div>
            </td>
         ))}
      </tr>
   );
};

export default SkeletonRow;
