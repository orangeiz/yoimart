import { useState } from "react";
import SidebarItem from "../sidebaritem";
import { Bot, CircleUserRound, Heart, IceCreamBowl, Notebook, Settings, ShoppingCart, Store } from "lucide-react";

const DashboardSidebar = ({ onSelectItem, selectedItem }: { onSelectItem: (item: number) => void, selectedItem: number }) => {  
    return (
        <div className="flex items-center p-5 m-5 flex-col  gap-y-8">
        <SidebarItem
            onClick={() => onSelectItem(1)}
            icon={<CircleUserRound/>}
            label="Profile"
            isSelected={selectedItem===1}
        />
        <SidebarItem
            onClick={() => onSelectItem(2)}
            icon={<Store/>}
            label="Store"
            isSelected={selectedItem===2}
        />
        <SidebarItem
            onClick={() => onSelectItem(3)}
            icon={<ShoppingCart/>}
            label="Shop"
            isSelected={selectedItem===3}
        />
        <SidebarItem
            onClick={() => onSelectItem(4)}
            icon={<IceCreamBowl/>}
            label="Food Delivery"
            isSelected={selectedItem===4}
        />
          <SidebarItem
            onClick={() => onSelectItem(5)}
            icon={<Heart/>}
            label="Wishlisted"
            isSelected={selectedItem===5}
        />
        <SidebarItem
            onClick={() => onSelectItem(6)}
            icon={<Notebook/>}
            label="Purchases"
            isSelected={selectedItem===6}
        />
        <SidebarItem
            onClick={() => onSelectItem(7)}
            icon={<Settings />}
            label="Settings"
            isSelected={selectedItem===7}
        />
         <SidebarItem
            onClick={() => onSelectItem(8)}
            icon={<Bot />}
            label="Ai Assistant"
            isSelected={selectedItem===8}
        />
    </div>
  );
};

export default DashboardSidebar;
