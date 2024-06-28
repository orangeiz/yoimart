// components/DashboardButton.tsx
'use client'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const NavbarAvatar = () => {
  const { data: session } = useSession();
  const router = useRouter();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };
   const GoHome=()=>{
    router.push(`/`)
   } 
   const GoLogin=()=>{
    router.push(`/login`);
   }
  const handleClickDashboard = () => {
    if (session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    } else {
      router.push('/login');
    }
  };
  
  if (!session) return null;

  const user = session.user;

  return (
    <div className="fixed z-20 top-0 right-0 m-4">
    <DropdownMenu>
      <DropdownMenuTrigger>
    <div className=" relative flex-row  gap-x-5 items-center">
      <div
        className="relative w-20 h-20 cursor-pointer rounded-full overflow-hidden"
      >
        <Image
          src={user?.image as string}
          alt={user?.name as string}
          className="rounded-full"
          style={{ cursor: 'pointer' }}
          layout="fill"
          objectFit="cover"
        />
        </div>
      </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuItem><div className="text-l font-bold"onClick={GoHome}>Home</div></DropdownMenuItem>
      <DropdownMenuItem><div className="text-l font-bold"onClick={handleClickDashboard}>Dashboard</div></DropdownMenuItem>
      <DropdownMenuItem><div className="text-l font-bold"onClick={GoLogin}>Login</div></DropdownMenuItem>
      <DropdownMenuItem><div className="text-l font-bold"onClick={handleSignOut}>SignOut</div></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>

  );
};

export default NavbarAvatar;
