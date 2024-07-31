import Image from "next/image";
import StarRating from "../star-rating";

interface Color {
    id: string;
    name: string;
    hexValue: string | null;
}

interface FeaturedProductProps {
    name: string;
    images: string[];
    supplier: string;
    discountPer: number;
    originalprice: number;
    ratings: number;
    noofratings: number;
    colors: Color[];
}

const FeaturedProduct = ({ name, images, supplier, discountPer, originalprice, ratings, noofratings,colors }: FeaturedProductProps) => {
    const discountedPrice = originalprice - (originalprice * discountPer / 100);
    const firstimageUrl = images[0];

    return (
        <div className=" bg-white flex flex-col justify-center items-center border-4 border-black">
            <div>
                <div className="relative z-10 w-[300px] h-[300px]">
                    <Image src={firstimageUrl} alt={name} className="object-fit:cover" fill />
                </div>
            </div>
            <div className="text-xl font-bold">
                {name}
            </div>
            <div className="text-l font-semibold">
                {supplier}
            </div>
            <div className="flex flex-row gap-x-1">
                <div className="font-semibold text-xl text-red-600 line-through">
                    {originalprice}₹
                </div>
                <div className="font-semibold text-xl text-black">
                    {discountedPrice.toFixed(2)}₹
                </div>
                <span className="font-bold text-orange-500">
                    {discountPer}% off
                </span>
            </div>
            <div className="text-xl font-semibold flex flex-col gap-y-1 text-black">
                <StarRating rating={ratings} />
            </div>
            <div className="flex flex-row py-4 gap-x-4 mt-2">
                {colors.map(color => (
                    <div key={color.id} className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hexValue || "#000" }} title={color.name}></div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedProduct;
