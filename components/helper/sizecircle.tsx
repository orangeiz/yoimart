import React from 'react';

interface SizeCircleProps {
    size: string;
    selected: boolean;
    onClick: () => void;
}

const SizeCircle = ({ size, selected, onClick }:SizeCircleProps) => {
    return (
        <div
            onClick={onClick}
            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${selected ? 'border-black' : 'border-transparent'} bg-gray-300 cursor-pointer`}
        >
            {size}
        </div>
    );
};

export default SizeCircle;
