import { Avatar, BackgroundAvatar } from "./user-avatar";

interface PreviewProps{
    username:string,
    email?:string,
    phone?:string,
    imgUrl?:string,
    backgroundimgUrl?:string
}
const Preview = ({username,email,phone,imgUrl,backgroundimgUrl}:PreviewProps) => {
    if(!imgUrl)
        imgUrl="/images/defaultuser.png"
    if(!backgroundimgUrl)
        backgroundimgUrl="/images/default-background.avif"
    return ( 
        <div className="flex flex-col gap-y-1 bg-sky-300  ">
             <div className="relative w-full h-80">
                <BackgroundAvatar backgroundimgUrl={backgroundimgUrl} />
                <Avatar imgUrl={imgUrl} />
                <div className="absolute bottom-4 left-10 ml-10 flex items-center gap-x-4 z-10">
               <div className="pl-5 text-white font-bold text-xl">
            {username}
          </div>
        </div>
                
            </div>
           <div className=" flex flex-col items-center justify-center gap-y-2 text-custom2  font-bold text-xl ">
                <div>
                    Username:{username}
                </div>
                {email&&(
                    <div>
                        Email:{email}
                    </div>
                )}
                   {phone&&(
                    <div>
                        Phone:{phone}
                    </div>
                )}
            </div>
        </div> 
    );
}
 
export default Preview;
