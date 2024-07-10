import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["utfs.io","githubusercontent.com", "lh3.googleusercontent.com","avatars.githubusercontent.com","www.youtube.com"]
    },  
}
export default withNextVideo(nextConfig);
