import {create} from "zustand"
import { billboards, stores } from "@/lib/schema";
export type ModalType="editProfile"|"addStore"|"addBillboard"
interface ModalData{
    User?:{
        id: string;
        name: string;
        email: string;
        phone: string;
        image?: string | null;
        imageBackground?: string | null;
      };
      Store?:typeof stores.$inferSelect
      Billboard?:typeof billboards.$inferSelect
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