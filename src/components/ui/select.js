"use client";

import * as React from "react";
import { cn } from "./utils";

function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const SelectContext = React.createContext({
  value: null,
  onValueChange: () => {},
  open: false,
  onOpenChange: () => {},
});

export function Select({ value: controlledValue, onValueChange, defaultValue, children }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [open, setOpen] = React.useState(false);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, onOpenChange: setOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children }) {
  const { value, open, onOpenChange } = React.useContext(SelectContext);
  
  return (
    <button
      type="button"
      onClick={() => onOpenChange(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent-brown))] focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="flex items-center gap-2">{children}</span>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder, children }) {
  const { value } = React.useContext(SelectContext);
  // children이 있으면 children을 표시하고, 없으면 value나 placeholder를 표시
  return <span>{children || value || placeholder}</span>;
}

export function SelectContent({ className, children }) {
  const { open, onOpenChange } = React.useContext(SelectContext);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 mt-1 max-h-[300px] min-w-[8rem] overflow-auto rounded-md border bg-white p-1 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, className, children }) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => onValueChange(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none",
        "hover:bg-gray-100 focus:bg-gray-100",
        isSelected && "bg-gray-50",
        className
      )}
    >
      {children}
    </div>
  );
}

