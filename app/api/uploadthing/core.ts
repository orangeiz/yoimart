import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage:f({image:{maxFileSize:"8MB",maxFileCount:1 }}).onUploadComplete(()=>{}),
  multipleImage:f({image:{maxFileSize:"8MB"}}).onUploadComplete(()=>{}),
  messageFile:f(["image","pdf","video"]).onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;