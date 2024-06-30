import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
    rating: number;
    totalStars?: number;
}

const StarRating=({ rating, totalStars = 5 }:StarRatingProps) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex">
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
            ))}
            {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
            {[...Array(emptyStars)].map((_, index) => (
                <FaRegStar key={index} className="text-yellow-500" />
            ))}
        </div>
    );
};

export default StarRating;
