import Video from "next-video";
import test from "@/videos/test.mp4"
const VideoTest = () => {
    return ( 
            <div className=" flex items-center justify-center relative aspect-video overflow-hidden">
            <Video src={test}/>
            </div>
      );
}
 
export default VideoTest;
