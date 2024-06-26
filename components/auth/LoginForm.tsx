'use client'
import React from 'react';
import CardWrapper from "../forms/CardWrapper";
import { Button } from "../ui/button";
import Link from 'next/link';

const LoginForm = () => {
    
   
    return (
        <CardWrapper
        headerlabel="Welcome Back"
        backbuttonlabel="Don't have an account?"
        changeoptionlabel=""
        forgotpasswordlabel=""
        backhref="/register"
        showSocials
        changeoptionhref=""
        forgotpasswordhref="/"
        >   <div className="flex flex-col gap-y-2">
                <Button variant="custom1" className="font-normal w-full text-blue-500"   size="sm"asChild>
                    <Link href={"/login/email"}>
                        Login With Email
                    </Link>
                </Button>
                <Button variant="custom1" className="font-normal w-full text-blue-500"  size="sm"asChild>
                    <Link href={"/login/username"}>
                        Login With Username
                    </Link>
                </Button>
                <Button variant="custom1" className="font-normal w-full  text-blue-500"  size="sm"asChild>
                    <Link href={"/login/phone"}>
                        Login With Phone
                    </Link>
                </Button>
            </div>
            
           
        </CardWrapper>
    );
}

export default LoginForm;
