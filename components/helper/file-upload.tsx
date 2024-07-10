"use client";
import { FileIcon, VideoIcon, X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/upload-thing";
import "@uploadthing/react/styles.css";

interface FileUploadProp {
    onChange: (urlOrUrls: string | string[]) => void;
    value?: string | string[];
    endpoint: "messageFile" | "serverImage" | "multipleImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProp) => {
    const handleRemove = (url: string) => {
        if (Array.isArray(value)) {
            onChange(value.filter(val => val !== url));
        } else {
            onChange("");
        }
    };

    const handleUploadComplete = (res: { url: string }[]) => {
        if (endpoint === "multipleImage") {
            if (Array.isArray(value)) {
                onChange([...value, ...res.map(file => file.url)]);
            } else {
                onChange(res.map(file => file.url));
            }
        } else {
            onChange(res[0].url);
        }
    };

    const renderFile = (fileUrl: string, index: number) => {
        const fileType = fileUrl.split(".").pop();
        if (fileType !== "pdf" && fileType !== "mp4") {
            return (
                <div key={index} className="relative h-20 w-20">
                    <Image fill src={fileUrl} alt="Upload" className="rounded-full" />
                    <button
                        onClick={() => handleRemove(fileUrl)}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            );
        } else if (fileType === "pdf") {
            return (
                <div key={index} className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                        {fileUrl}
                    </a>
                    <button
                        onClick={() => handleRemove(fileUrl)}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            );
        } else if (fileType === "mp4") {
            return (
                <div key={index} className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <VideoIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                        {fileUrl}
                    </a>
                    <button
                        onClick={() => handleRemove(fileUrl)}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            );
        }
    };

    return (
        <div>
            {Array.isArray(value) && endpoint === "multipleImage" ? (
                <div className="flex flex-wrap gap-4">
                    {value.map((fileUrl, index) => renderFile(fileUrl, index))}
                </div>
            ) : (
                value && renderFile(value as string, 0)
            )}

            {(!value || endpoint === "multipleImage") && (
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={handleUploadComplete}
                    onUploadError={(error: Error) => {
                        console.log(error);
                    }}
                />
            )}
        </div>
    );
};
