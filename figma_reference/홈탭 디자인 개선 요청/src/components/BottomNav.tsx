"use client";

import { Home, Calendar, MapPin } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "events" | "places";
  onTabChange: (tab: "home" | "events" | "places") => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "home" as const, label: "탐색", icon: Home },
    { id: "events" as const, label: "행사", icon: Calendar },
    { id: "places" as const, label: "장소", icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center gap-1 py-3 px-6 transition-colors ${
                  isActive
                    ? "text-[hsl(var(--accent-brown))]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} />
                <span className={`text-xs ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
