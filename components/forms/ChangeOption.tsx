import Link from "next/link";
import { Button } from "../ui/button";

interface ChangeOptionProps{
    href:string,
    label:string
}
const ChangeOption = ({href,label}:ChangeOptionProps) => {
    return ( 
        <Button variant="link" className=" text-xs text-gray-500 font-normal w-full"  size="sm"asChild>
            <Link href={href}>
                {label}
            </Link>
        </Button>
     );
}
 
export default ChangeOption ;