// components/DashboardButton.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';

const DashboardButton = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleSignOut = async () => {
    // Implement sign-out logic here
    console.log('Sign out clicked');
  };

  const handleClick = () => {
    if (session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    } else {
      router.push('/login');
    }
  };

  if (!session) return null;

  const user = session.user;

  return (
    <div className=" relative flex-row  gap-x-5 items-center">
      <div
        className="relative w-20 h-20 cursor-pointer rounded-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
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
  );
};

export default DashboardButton;
