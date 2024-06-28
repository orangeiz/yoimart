import { Avatar,BackgroundAvatar } from "../user-avatar";

interface DashboradProfileProps{
    username?:string,
    imgUrl?:string,
    backgroundimgUrl?:string
}
const DashboardProfile = ({username,imgUrl,backgroundimgUrl}:DashboradProfileProps) => {
    if(!imgUrl)
        imgUrl="/images/defaultuser.png"
    if(!backgroundimgUrl)
        backgroundimgUrl="/images/default-background.avif"
    return (

                <div className="relative  h-80">
                <BackgroundAvatar backgroundimgUrl={backgroundimgUrl} />
                <Avatar imgUrl={imgUrl} />
                <div className="absolute bottom-4 left-10 ml-10 flex items-center gap-x-4 z-10">
               <div className="pl-5 text-white font-bold text-xl">
            {username}
          </div>
        </div>
    </div>
  );
}

export default DashboardProfile;
