import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Montserrat({
    subsets: ["latin"],
    weight: ["600"]
});

interface FormHeadProps {
    label: string
}

const FormHead = ({ label }: FormHeadProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="relative "> {/* Adjust size as necessary */}
                <Image src="/images/fh1.png" className="object-contain fill" alt="form-head" width={200} height={200} />
            </div>
            <div className={cn("text-xl font-semibold text-black", font.className)}>
                {label}
            </div>
        </div>
    );
}

export default FormHead;
