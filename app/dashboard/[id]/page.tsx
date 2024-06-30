'use client';
import DashboardFood from '@/components/helper/dashboard/dashboard-food';
import DashboardProfile from '@/components/helper/dashboard/dashboard-profile';
import DashboardSettings from '@/components/helper/dashboard/dashboard-settings';
import DashboardShop from '@/components/helper/dashboard/dashboard-shop';
import DashboardSidebar from '@/components/helper/dashboard/dashboard-sidebar';
import DashboardStore from '@/components/helper/dashboard/dashboard-store';
import DashboardWishlist from '@/components/helper/dashboard/dashboard-wishlist';
import { Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
const ExampleComponent = () => {
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (!session) {
    return null;
  }
  const user = session.user;
  return (
    <div className='min-h-screen flex flex-row gap-x-5 bg-gradient-to-r from-white to-violet-100'>
      <DashboardSidebar onSelectItem={setSelectedItem} selectedItem={selectedItem} />
      <div className='flex flex-row '>
      <div className='bg-custom1 w-1 h-full'/>      
      {selectedItem==1&&(
        <div className='w-screen flex flex-col  gap-y-10'>
          <DashboardProfile username={user?.name} imgUrl={user?.image} backgroundimgUrl={user?.imageBackground}/>
          <div className='flex flex-row items-center justify-center'>
          <div className=' text-6xl font-bold text-custom2'>
            Welcome Back 
          </div>
          <div className='text-2xl font-semibold text-blue-600'>
              {session?.user?.name}
          </div>
           </div>
           <div className="border-4  p-5 m-5 items-center justify-center bg-sky-300 rounded-lg border-custom2 group flex gap-x-1" onClick={()=>{setSelectedItem(7)}}>
              <Edit className="h-10 w-10 text-black group-hover:text-custom1"/>
                <div className="text-xl font-bold text-black group-hover:text-custom1  "> 
                  Edit
                </div>
            </div> 
          </div>
      )}
      {selectedItem===2&&(
        <div>
          <DashboardStore/>
        </div>
      )}
      {selectedItem===3&&(
        <div>
          <DashboardShop/>
        </div>
      )}
        {selectedItem===4&&(
        <div>
          <DashboardFood/>
        </div>
      )}
        {selectedItem===5&&(
        <div>
          <DashboardWishlist/>
        </div>
      )}
        {selectedItem===6&&(
        <div>

        </div>
      )}
      {selectedItem===7&&(
        <div>
          <DashboardSettings/>
        </div>)}
        {selectedItem===8&&(
        <div>

        </div>
      )}
      </div>
    </div>
  );
};

export default ExampleComponent;
