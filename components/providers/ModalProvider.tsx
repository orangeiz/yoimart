"use client"
import { useEffect, useState } from "react";
import { EditProfileModal } from "../modals/edit-profile-modal";
import { AddStoreModal } from "../modals/add-store-modal";
import { AddBillboardModel } from "../modals/add-billboard-modal";
const ModalProvider = () => {
    const [isMounted,setIsMounted]=useState(false)
    useEffect(()=>{setIsMounted(true)},[]);
    if(!isMounted)
        return true
    return ( 
            <>
            <AddBillboardModel/>
            <AddStoreModal/>
            <EditProfileModal/>
            </> 
    );
}
export default ModalProvider;