import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps{
    href:string,
    label:string
}
const BackButton = ({href,label}:BackButtonProps) => {
    return ( 
        <Button variant="link" className=" text-xs text-gray-500 font-normal w-full"  size="sm"asChild>
            <Link href={href}>
                {label}
            </Link>
        </Button>
     );
}
 
export default BackButton;