"use client";

import * as React from "react";
import { cn } from "./utils";

export function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm transition-colors outline-none",
        "focus:border-[hsl(var(--accent-brown))] focus:ring-2 focus:ring-[hsl(var(--accent-brown))]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "placeholder:text-gray-400",
        className
      )}
      {...props}
    />
  );
}

