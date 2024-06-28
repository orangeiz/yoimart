import React from "react";

interface SidebarItemProps{
    label:string;
    icon:React.ReactNode,
    onClick:()=>void
    isSelected: boolean
}
const SidebarItem= ({label,icon,onClick,isSelected}:SidebarItemProps) => {
    return ( 
        <div className="flex items-center justify-center flex-row group gap-x-1 " onClick={onClick}> 
            <div className={`text-l font-bold ${isSelected? 'text-purple-500':'text-purple-300  group-hover:text-purple-500'}`}>
                {label}
            </div>
            <div>
            {React.cloneElement(icon as React.ReactElement, { className: `h-8 w-8 ${isSelected ? 'text-purple-500':'text-purple-300  group-hover:text-purple-500'}` })}
            </div>

        </div> 
    );
}
 
export default SidebarItem;
