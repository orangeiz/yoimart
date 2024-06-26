import Image from "next/image";

interface UserAvatarProps {
  imgUrl: string;
}

interface UserBackgroundAvatarProps {
  backgroundimgUrl: string;
}

export const Avatar = ({ imgUrl }: UserAvatarProps) => {
  return (
    <div className="absolute bottom-1  z-10 rounded-full ">
      <Image src={imgUrl} alt="Avatar" height={100} width={100} className="rounded-full " />
    </div>
  );
}

export const BackgroundAvatar = ({ backgroundimgUrl }: UserBackgroundAvatarProps) => {
  return (
    <div className="relative w-full h-80">
     <Image src={backgroundimgUrl} alt="AvatarBackground" fill  objectFit="cover" />
    </div>
  );
}
