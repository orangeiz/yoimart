import {create} from "zustand"
import { billboards, categories, deliveryfoods, restaurents, stores } from "@/lib/schema";
export type ModalType="editProfile"|"addStore"|"addBillboard"|"editStore"|"editBillboard"|"showFood"
type DeliveryFood= typeof deliveryfoods.$inferSelect
interface DeliveryFoodWithDetails extends DeliveryFood {
    restaurant: typeof restaurents.$inferSelect;
  }
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
      DeliveryFood?:DeliveryFoodWithDetails
      Category?: typeof categories.$inferSelect

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
    OnClose:()=>set({type:null,isOpen:false})}
))