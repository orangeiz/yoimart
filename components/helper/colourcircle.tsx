import React from 'react';

interface ColorCircleProps {
    color: string;
    selected: boolean;
    onClick: () => void;
}

const ColorCircle = ({ color, selected, onClick }:ColorCircleProps) => {
    return (
        <div
            onClick={onClick}
            className={`w-8 h-8 rounded-full border-2 ${selected ? 'border-black' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
        />
    );
};

export default ColorCircle;
