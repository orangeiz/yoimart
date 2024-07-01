"use client"
import { useEffect, useState } from "react";
import { EditProfileModal } from "../modals/edit-profile-modal";
const ModalProvider = () => {
    const [isMounted,setIsMounted]=useState(false)
    useEffect(()=>{setIsMounted(true)},[]);
    if(!isMounted)
        return true
    return ( 
            <>
            <EditProfileModal/>
            </> 
    );
}
export default ModalProvider;