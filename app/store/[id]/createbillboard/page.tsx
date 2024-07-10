"use client"
import BlueButton from "@/components/helper/bluebutton";
import { UseModal } from "@/components/hooks/use-modal-store";
import { Plus } from "lucide-react";

const CreateBillboardpage = () => {
    const {onOpen}=UseModal()
    return (
        <div>
      <BlueButton   icon={<Plus/>} sublabel="Add" onClick={()=>{onOpen("addBillboard")}} label="Create New Store"/>

        </div>
 );
}
 
export default CreateBillboardpage;