import { Plus } from "lucide-react";
import BlueButton from "../bluebutton";

const DashboardStore = () => {
    return ( 
    <div className="flex flex-col gap-y-4">
        <div className="text-6xl p-5 m-5 font-black ">
            Store
        </div>
        <div className="flex  flex-col justify-center p-2 m-2 items-center gap-y-3">
        <BlueButton   icon={<Plus/>} sublabel="Add" onClick={()=>{}} label="Create New Store"/>
        </div>
        <div className="flex flex-row">
            <div className="text-3xl p-2 m-2 font-bold">
                My Stores
            </div>
            <div className="">
                
            </div>
        </div>
 

    </div> );
}
 
export default DashboardStore;