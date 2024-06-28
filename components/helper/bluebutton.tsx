import { Edit } from "lucide-react";
import React from "react";

interface BlueButtonProps{
    onClick:()=>void
    label:string
    sublabel:string
    icon:React.ReactNode
}
const BlueButton = ({onClick,label,sublabel,icon}:BlueButtonProps) => {
    return (
        <div className="flex flex-row  items-center justify-center  gap-x-4" onClick={onClick}>
            <div className="text-4xl  font-bold text-custom1">
                {label}
            </div>
            <div className="border-4  p-5 m-5 bg-sky-300 rounded-lg border-custom2 group flex gap-x-1 ">
            {React.cloneElement(icon as React.ReactElement, { className:`h-10 w-10 text-black group-hover:text-custom1`})}
                <div className="text-xl font-bold text-black group-hover:text-custom1  "> 
                 {sublabel}
                </div>
            </div>
        </div> 
    )
}
 
export default BlueButton;