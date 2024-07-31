'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Hahaha = () => {
    const { data: session } = useSession();

    if (!session) return null;

    const user = session.user;

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div>
            {user?.id}
            <Button onClick={handleSignOut} className="bg-primary-50" type="submit">
                Signout
            </Button>
        </div>
    );
};

export default Hahaha;
