'use client';
import SignOutButton from '@/components/auth/signoutButton';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ExampleComponent = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (!session) {
    return null;
  }
  const user = session.user;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <h1>Email: {user?.email}</h1>
      <h1>Phone: {user?.phone}</h1>
      <Image src={user?.image as string} alt="Orange" height={40} width={40}></Image>
      {user?.imageBackground&&(<Image src={user?.imageBackground as string} alt="Pikachu" height={100} width={200}></Image>)}
      <SignOutButton/>
    </div>
  );
};

export default ExampleComponent;
