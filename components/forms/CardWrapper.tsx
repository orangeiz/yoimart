"use client"
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle 
} from "../ui/card"
import BackButton from "./BackButton";
import ChangeOption from "./ChangeOption";
import ForgotPassword from "./ForgotPassword";
import FormHead from "./FormHead";
import Social from "./Social";
interface CardWrapperProps{
    children:React.ReactNode,
    headerlabel:string,
    backbuttonlabel:string,
    backhref:string,
    showSocials?:boolean,
    changeoptionlabel:string,
    changeoptionhref:string,
    forgotpasswordlabel:string,
    forgotpasswordhref:string,

    
}
const CardWrapper= ({children,headerlabel,backbuttonlabel,backhref,showSocials,changeoptionlabel, changeoptionhref,forgotpasswordlabel,forgotpasswordhref}:CardWrapperProps) => {
    return ( 
        <Card className="w-[400px] shadow-md" >
            <CardHeader>
                <FormHead label={headerlabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocials&&(
                <CardFooter>
                    <div className=" ml-20 items-center justify-center text-center margin-auto">
                        <Social/>

                    </div>
                </CardFooter>
            )}
             <BackButton href={backhref} label={backbuttonlabel}/>
             {changeoptionlabel&&(<ChangeOption href={changeoptionhref} label={changeoptionlabel}/>)}
             {forgotpasswordlabel&&(<ForgotPassword href={forgotpasswordhref} label={forgotpasswordlabel}/>)}
             </Card>
    );
} 
export default CardWrapper;