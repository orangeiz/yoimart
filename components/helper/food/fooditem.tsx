import Image from "next/image";
import StarRating from "../star-rating";
import { useState } from "react";
import { Pizza, ShoppingCart } from "lucide-react";

interface FoodItemProps {
  name: string;
  restaurantName: string;
  deliveryTime: string;
  ingredients: string[];
  imageUrls: string[];
  price: number;
  discountPer: number;
  description: string;
  sidekicks: { name: string; imageUrl: string }[];
  ratings: number;
  noOfRatings: number;
  cashOnDelivery: boolean;
  category: string;
  onClick: () => void;
  onRestaurantClick: () => void;
}

const FoodItem = ({
  name,
  restaurantName,
  deliveryTime,
  ingredients,
  imageUrls,
  price,
  discountPer,
  description,
  sidekicks,
  ratings,
  noOfRatings,
  cashOnDelivery,
  category,
  onClick,
  onRestaurantClick,
}: FoodItemProps) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
  const discountedPrice = price - (price * discountPer) / 100;

  return (
    <div className="flex flex-row gap-x-2">
      <div className="flex flex-col gap-y-2">
        <div
          className="font-semibold text-xl text-black cursor-pointer"
          onClick={onRestaurantClick}
        >
          Restaurant: {restaurantName}
        </div>
        <div className="font-semibold text-xl text-black">
          Delivery Time: {deliveryTime}
        </div>
        <div className="font-semibold text-xl text-black">
          Category: {category}
        </div>
        <div className="font-semibold text-xl text-black">
          Cash on Delivery: {cashOnDelivery ? "Available" : "Not Available"}
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="font-bold text-xl text-black">Description</div>
          <div className="font-semibold text-l text-black">{description}</div>
        </div>
        <div className="font-semibold text-xl text-black">
          Ingredients:{" "}
          {ingredients.map((ingredient, index) => (
            <span key={index}>{ingredient}{index < ingredients.length - 1 ? ', ' : ''}</span>
          ))}
        </div>
        <div className="font-semibold text-xl text-black">
          Preferred Sidekicks:{" "}
          <div className="flex flex-row gap-x-2">
            {sidekicks.map((sidekick, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black cursor-pointer"
                  onClick={() => setSelectedImage(sidekick.imageUrl)}
                >
                  <Image
                    src={sidekick.imageUrl}
                    alt={sidekick.name}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="text-sm text-black">{sidekick.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-100 h-80 flex items-center justify-center rounded-lg border-black border-4 bg-gradient-to-r from-violet-200 to-pink-200">
        <div className="relative z-10 w-60 h-60">
          <Image src={selectedImage} alt="Food-Item" fill objectFit="contain" />
        </div>
      </div>

      <div className="flex flex-col p-2 m-2 gap-y-2">
        <div className="font-bold text-2xl flex flex-col gap-y-1 text-black">
          {name}
        </div>
        <div className="flex flex-row gap-x-1">
          <div className="font-semibold text-xl text-red-600 line-through">
            {price}₹
          </div>
          <div className="font-semibold text-xl text-black">
            {discountedPrice.toFixed(2)}₹
          </div>
          <span className="font-bold text-orange-500">{discountPer}% off</span>
        </div>
        <div className="text-xl font-semibold flex flex-col gap-y-1 text-black">
          Ratings: {ratings}
          <div className="font-bold text-sm text-orange-500">
            {noOfRatings} Rated
          </div>
          <StarRating rating={ratings} />
        </div>
        <div className="flex flex-row gap-x-2">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black cursor-pointer"
              onClick={() => setSelectedImage(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Thumbnail ${index}`}
                fill
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <div className="border-2  p-5 m-5 bg-orange-500 rounded-lg border-black group flex  items-center justify-center flex-row gap-x-1" onClick={onClick}>
         <Pizza className="text-black group-hover:text-blue-500" height={20} width={20}/>
         <div className="text-l font-bold text-black group-hover:text-blue-500  "> 
            Order Food
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
