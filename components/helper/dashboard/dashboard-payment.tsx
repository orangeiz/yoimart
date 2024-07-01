import { DataTableDemo } from "../tables/payment"; // Adjust the import path as necessary

const DashboardPayment = () => {
  return ( 
        <div className="flex flex-col gap-y-4">
            <div className="text-6xl p-5 m-5 font-black ">
            Purchases
            </div>    
            <div className="flex p-5 m-5 items-center justify-center">
              <DataTableDemo/>
            </div>
        </div>
   );
}
 
export default DashboardPayment;

