import {create} from "zustand"
export type ModalType="editProfile"
interface ModalData{
    User?:{
        id: string;
        name: string;
        email: string;
        phone: string;
        image?: string | null;
        imageBackground?: string | null;
      };
    }
interface ModalStore{
    type:ModalType|null
    data:ModalData
    isOpen:boolean
    onOpen:(type:ModalType,data?:ModalData)=>void
    OnClose:()=>void
}
export const UseModal=create<ModalStore>((set)=>({
    type:null,
    data:{},
    isOpen:false,
    onOpen:(type,data={})=>set({isOpen:true,type,data}),
    OnClose:()=>set({type:null,isOpen:false})
}))