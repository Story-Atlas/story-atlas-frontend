"use client";

import { Button } from './ui/button';

export function BookBTIAnswerCard({
  icon,
  title,
  description,
  isSelected,
  onSelect,
  accentColor,
}) {
  const bgColor = accentColor === 'pink' 
    ? 'bg-gradient-to-br from-rose-50 to-orange-50' 
    : 'bg-gradient-to-br from-blue-50 to-indigo-50';
  
  const selectedBorder = accentColor === 'pink'
    ? 'border-rose-300'
    : 'border-blue-300';

  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 ${bgColor} ${
        isSelected ? `border-2 ${selectedBorder} shadow-lg` : 'border-2 border-transparent'
      } hover:scale-[1.02] cursor-pointer`}
      onClick={onSelect}
    >
      {/* Icon */}
      <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-white/70 backdrop-blur-sm">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl mb-2 text-gray-800 font-bold">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6 min-h-[3rem] flex items-center">
        {description}
      </p>

      {/* Select Button */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`w-full rounded-full transition-all duration-300 ${
          isSelected
            ? accentColor === 'pink'
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        선택
      </Button>
    </div>
  );
}

