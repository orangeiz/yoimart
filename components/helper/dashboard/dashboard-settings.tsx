import { Edit } from "lucide-react";
import BlueButton from "../bluebutton";

const DashboardSettings = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="text-6xl p-5 m-5 font-black ">
            Settings
            </div>
            <div className="flex  flex-col justify-center items-center gap-y-3">
            <div className="flex flex-row p-2 m-2 gap-x-2">
                <BlueButton  icon={<Edit/>} sublabel="Edit" onClick={()=>{}} label="Profile"/>
                <BlueButton   icon={<Edit/>} sublabel="Edit" onClick={()=>{}} label="Theme"/>
            </div>
            <div className="flex flex-row p-2 m-2 gap-x-2">
                <BlueButton  icon={<Edit/>} sublabel="Edit" onClick={()=>{}} label="Language"/>
                <BlueButton  icon={<Edit/>} sublabel="Edit" onClick={()=>{}} label="Adress"/>
            </div>   
            </div>         
        </div>
 
    );
}
 
export default DashboardSettings;