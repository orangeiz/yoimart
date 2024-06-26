import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
const Social = () => {
    return ( 
            <div className=" flex  gap-x-2 margin-auto   ">
                <Button className="w-full" variant="custom1" size="lg" onClick={() => signIn('google')}>
                    <FcGoogle className="h-5 w-5"/>
                </Button>
                <Button className="w-full" variant="custom1" size="lg" onClick={() => signIn('github')}>
                    <FaGithub className="h-5 w-5"/>
                </Button>
            </div>
      );
}
 
export default Social;