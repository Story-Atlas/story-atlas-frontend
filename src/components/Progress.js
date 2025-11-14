"use client";

export function Progress({ value, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-full transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

