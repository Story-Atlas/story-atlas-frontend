"use client";

import * as React from "react";
import { cn } from "./utils";

const ToggleGroupContext = React.createContext({
  value: null,
  onValueChange: () => {},
});

export function ToggleGroup({ value: controlledValue, onValueChange, type = "single", defaultValue, className, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || (type === "single" ? "" : []));
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
      <div className={cn("inline-flex items-center rounded-md border border-gray-300 bg-white p-1", className)}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupItem({ value, className, children, ...props }) {
  const { value: selectedValue, onValueChange, type } = React.useContext(ToggleGroupContext);
  const isSelected = type === "single" 
    ? selectedValue === value 
    : Array.isArray(selectedValue) && selectedValue.includes(value);

  const handleClick = () => {
    if (type === "single") {
      onValueChange(value);
    } else {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      const newArray = isSelected
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      onValueChange(newArray);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent-brown))] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-[hsl(var(--accent-brown))] text-white"
          : "bg-transparent text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

