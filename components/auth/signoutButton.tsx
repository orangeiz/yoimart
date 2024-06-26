import { signOut } from 'next-auth/react';
import React from 'react';
import { Button } from "../ui/button";

const SignOutButton = () => {
    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <Button onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}

export default SignOutButton;