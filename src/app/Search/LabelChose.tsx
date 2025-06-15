"use client";
import React from "react";

interface ChoseProps {
  label?: string[];
  selected: string[]; // 已選中的選項
  onSelect: (type: string) => void; // 點擊選項時的回調
}

export default function Chose({
  label = [],
  selected,
  onSelect,
}: ChoseProps) {
  return (
    <div className="grid grid-cols-3 max-w-[343px] gap-4">
      {label.map((type, index) => {
        const isSelected = selected.includes(type); // 判斷是否被選中
        return (
          <div
            key={index}
            onClick={() => onSelect(type)} // 點擊觸發回調
            className={`w-[102px] h-8 border rounded-lg cursor-pointer flex items-center justify-center
              ${isSelected ? "bg-brown1 text-white border-brown1" : "bg-white border-gray3 hover:bg-brown2/20"}`}
          >
            {type}
          </div>
        );
      })}
    </div>
  );
}
