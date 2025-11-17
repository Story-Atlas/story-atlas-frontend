"use client";

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
  
  const selectedBorderColor = accentColor === 'pink'
    ? 'border-rose-400'
    : 'border-blue-400';

  const selectedRingColor = accentColor === 'pink'
    ? 'ring-rose-500'
    : 'ring-blue-500';

  const hoverBorder = accentColor === 'pink'
    ? 'hover:border-rose-300 hover:shadow-rose-100'
    : 'hover:border-blue-300 hover:shadow-blue-100';

  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 ${bgColor} ${
        isSelected 
          ? `border-2 ${selectedBorderColor} ring-2 ${selectedRingColor} ring-offset-0 shadow-xl` 
          : `border-2 border-gray-200 ${hoverBorder}`
      } cursor-pointer group`}
      onClick={onSelect}
    >
      {/* Icon */}
      <div className={`mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 ${
        isSelected 
          ? accentColor === 'pink' 
            ? 'shadow-lg ring-2 ring-rose-200' 
            : 'shadow-lg ring-2 ring-blue-200'
          : 'group-hover:shadow-md'
      }`}>
        {icon}
      </div>

      {/* Title - 더 크고 굵게, 고정 높이로 줄바꿈 일관성 유지 */}
      <h3 
        className={`text-2xl mb-3 text-gray-900 font-extrabold leading-tight break-keep min-h-[3rem] ${
          isSelected ? 'text-gray-900' : 'text-gray-800'
        }`}
        style={{ wordBreak: 'keep-all' }}
      >
        {title}
      </h3>

      {/* Description - 더 작고 가늘게, 텍스트 줄바꿈 개선, 고정 높이로 줄바꿈 일관성 유지 */}
      <p 
        className="text-base text-gray-600 leading-relaxed break-keep min-h-[5rem]"
        style={{ wordBreak: 'keep-all' }}
      >
        {description}
      </p>
    </div>
  );
}

